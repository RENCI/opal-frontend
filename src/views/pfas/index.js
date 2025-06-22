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
import { useProgress, useToggleState } from '@hooks';
import { fetchSampleData } from '@util';
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

export const PfasView = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [isPreparingTable, setIsPreparingTable] = useState(true)

  const progress = useProgress()
  const pfasData = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: fetchSampleData(progress.onProgress),
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
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
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

  return (
    <PfasContext.Provider value={{
      table,
      columnFilters, setColumnFilters, /*filterCount,*/
      sorting, setSorting,
      progress,
    }}>
      {
        pfasData.isPending || pfasData.isLoading
          ? <AppStatus message={ `Loading targeted primary data :: ${progress.percent}%` } />
          : isPreparingTable
            ? <AppStatus message={ `Preparing data` } />
            : <TargetedPrimaryLayout />
      }
    </PfasContext.Provider>
  )
}
