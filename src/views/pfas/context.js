import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
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

const PfasProvider = ({ children }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

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

/*  const filterCount = table.getAllLeafColumns().filter(col => col.getIsFiltered()).length */
  return (
    <PfasContext.Provider value={{
      table,
      columnFilters, setColumnFilters,
      sorting, setSorting,
      progress,
    }}>
      { children }
    </PfasContext.Provider>
  )
}

PfasProvider.propTypes = {
  children: PropTypes.node,
}
