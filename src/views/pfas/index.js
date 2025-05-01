import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppStatus } from '@components/app-status'
import { podmColumns } from '@data'
import { useProgress } from '@hooks'
import { fetchSampleData } from '@util'
import { useQuery } from '@tanstack/react-query'
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

  return (
    <PfasContext.Provider value={{
      table,
      columnFilters, setColumnFilters,
      sorting, setSorting,
      progress,
    }}>
      {pfasData.isPending || pfasData.isLoading
      ? <AppStatus message={ `Loading targeted primary data :: ${progress.percent}%` } />
      : isPreparingTable
        ? <AppStatus message={ `Preparing table` } />
        : <Outlet />}
    </PfasContext.Provider>
  )
}
