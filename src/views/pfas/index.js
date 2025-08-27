import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import { AppStatus } from '@components/app-status';
import { FiltersDrawer } from '@components/filter';
import { podmColumns } from '@data';
import { useLocalStorage, useProgress, useToggleState } from '@hooks';
import { fetchSampleData, fetchSuperfundSites } from '@util';
import { useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/joy';
import {
  Tune as FiltersIcon,
} from '@mui/icons-material';
import {
  SecondaryToolbar,
  TargetedPrimaryMenu,
} from '@components/layout';

const TargetedPrimaryLayout = () => {
  const filtersDrawerVisibility = useToggleState();
  const { table } = usePfas();

  const SampleCount = useCallback(() => (
    <div style={{
      display: 'grid',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      padding: 'var(--joy-spacing)',
    }}>{ table.getPrePaginationRowModel().rows.length.toLocaleString() } samples</div>
  ), [table.getPrePaginationRowModel().rows.length])

  const handleClickFiltersButton = useCallback(() => {
    if (filtersDrawerVisibility.enabled) {
      setTimeout(() => filtersDrawerVisibility.unset(), 3000);
    } else {
      filtersDrawerVisibility.set();
    }
  }, [filtersDrawerVisibility.enabled]);

  const margin = useMemo(
    () => filtersDrawerVisibility.enabled ? '360px' : 0,
    [filtersDrawerVisibility.enabled]
  );

  const MemoizedFiltersButton = useCallback(() => {
    if (filtersDrawerVisibility.enabled) {
      return (
        <Tooltip title="Close Filters Drawer">
          <IconButton onClick={ filtersDrawerVisibility.unset }>
            <FiltersIcon color="primary" />
          </IconButton>
        </Tooltip>
      )
    }
    return (
      <Tooltip title="Open Filters Drawer">
        <IconButton onClick={ filtersDrawerVisibility.set }>
          <FiltersIcon color="neutral" />
        </IconButton>
      </Tooltip>
    )
  }, [filtersDrawerVisibility.enabled]);

  return (
    <Stack direction="column" sx={{ marginLeft: margin, flex: 1 }}>
      <SecondaryToolbar>
        <MemoizedFiltersButton />
        <Divider orientation="vertical" />
        <SampleCount />
        <div style={{ flex: 1 }} />
        <TargetedPrimaryMenu />
      </SecondaryToolbar>
      <Outlet />
      <FiltersDrawer
        open={ filtersDrawerVisibility.enabled }
        onClose={ handleClickFiltersButton }
      />
    </Stack>
  );
};

const PfasContext = createContext({ })
export const usePfas = () => useContext(PfasContext)

const defaultHiddenColumns = Object.fromEntries(
  podmColumns.flatMap(group => group.columns)
    .filter(c => c.id || c.accessorKey)
    .map(c => {
      const colId = c.id ?? c.accessorKey;
      return [colId, !(colId.endsWith('_mrl') || colId.endsWith('_flags'))];
    })
);

export const PfasView = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [columnVisibility, setColumnVisibility] = useLocalStorage('column-visibility', { ...defaultHiddenColumns });
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [isPreparingTable, setIsPreparingTable] = useState(true)
  const superfundSiteFilterActivity = useToggleState(false);
  const [superfundSiteSelectionRadius, setSuperfundSiteSelectionRadius] = useState(5);

  const pfasProgress = useProgress()
  const pfasData = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: fetchSampleData(pfasProgress.onProgress),
  })

  const superfundSitesProgress = useProgress()
  const superfundSites = useQuery({
    queryKey: ['superfund_sites_'],
    queryFn: fetchSuperfundSites(superfundSitesProgress.onProgress),
  })
  
  // table for displaying PFAS data
  const table = useReactTable({
    data: pfasData.data ?? [],
    columns: podmColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      sorting,
    },
    debugAll: false,
  })

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (pfasData.isSuccess && table.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [pfasData.isSuccess, table.getRowModel().rows.length])

  // const filterCount = table.getAllLeafColumns().filter(col => col.getIsFiltered()).length 

  // convert Superfund response into GeoJSON FeatureCollection
  const superfundGeoJSON = useMemo(() => {
    if (!superfundSites?.data) return null;

    return {
      type: "FeatureCollection",
      features: superfundSites.data
        .filter(site => site.longitude && site.latitude)
        .map(site => {
          let pinIcon = "site-pin-grey"; // default / fallback
          if (site.pfas === true) {
            pinIcon = "site-pin-red";
          } else if (site.pfas === false) {
            pinIcon = "site-pin-blue";
          }

          return {
            type: "Feature",
            id: site.sems_id ?? site.ogc_fid,
            geometry: {
              type: "Point",
              coordinates: [site.longitude, site.latitude],
            },
            properties: {
              ...site,
              pfasDetected: site.pfas,
              pinIcon, // 👈 custom property just for Mapbox
            },
          };
        })
    };
  }, [superfundSites?.data]);

  const contextValue = useMemo(() => ({
    table,
    columnFilters, setColumnFilters,
    sorting, setSorting,
    progress: pfasProgress,
    superfundSites: {
      data: superfundSites?.data ?? [],
      geojson: superfundGeoJSON,
      filtering: superfundSiteFilterActivity,
      selectionRadius: {
        current: superfundSiteSelectionRadius,
        set: setSuperfundSiteSelectionRadius,
      },
    },
  }), [
    table,
    columnFilters, sorting,
    pfasProgress,
    superfundSites?.data,
    superfundSiteFilterActivity.enabled,
    superfundSiteSelectionRadius
  ]);

  return (
    <PfasContext.Provider value={ contextValue }>
      {
        pfasData.isPending || pfasData.isLoading
          ? <AppStatus message={ `Loading targeted primary data :: ${ pfasProgress.percent}%` } />
          : isPreparingTable
            ? <AppStatus message={ `Preparing data` } />
            : <TargetedPrimaryLayout />
      }
    </PfasContext.Provider>
  )
}
