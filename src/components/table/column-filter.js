import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DebouncedInput } from '@components/debounced-input'

export const ColumnFilter = ({ column }) => {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue() || '';
  
  const sortedUniqueValues = useMemo(() => filterVariant === 'range'
    ? []
    : Array.from(column.getFacetedUniqueValues().keys())
      .sort()
      .slice(0, 5_000),
  [column.getFacetedUniqueValues(), filterVariant])

  return filterVariant === 'range' ? (
    <Fragment>
      <DebouncedInput
        type="number"
        aria-label={ `${ column.id } minimum filter` }
        min={ Number(column.getFacetedMinMaxValues()?.[0] ?? '') }
        max={ Number(column.getFacetedMinMaxValues()?.[1] ?? '') }
        value={ columnFilterValue?.[0] ?? '' }
        onChange={ value => column.setFilterValue(old => [value, old?.[1]]) }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0] !== undefined
            ? `(${ column.getFacetedMinMaxValues()?.[0] })`
            : ''
        }`}
        style={{ backgroundColor: 'inherit', color: 'inherit', width: '100%' }}
      />
      <DebouncedInput
        type="number"
        aria-label={ `${ column.id } maximum filter` }
        min={ Number(column.getFacetedMinMaxValues()?.[0] ?? '') }
        max={ Number(column.getFacetedMinMaxValues()?.[1] ?? '') }
        value={ columnFilterValue?.[1] ?? '' }
        onChange={ value => column.setFilterValue(old => [old?.[0], value]) }
        placeholder={ `Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${ column.getFacetedMinMaxValues()?.[1] })`
            : ''
        }` }
        style={{ backgroundColor: 'inherit', color: 'inherit', width: '100%' }}
      />
    </Fragment>
  ) : filterVariant === 'select' ? (
    <select
      onChange={ e => column.setFilterValue(e.target.value) }
      value={ columnFilterValue }
      style={{ backgroundColor: 'inherit', color: 'inherit' }}
      aria-label={ `${ column.id } select filter` }
    >
      <option value="">All</option>
      {
        sortedUniqueValues.map(value => (
          <option
            value={ value }
            key={ `select-data-list-${ value }` }
            style={{ width: '100%' }}
          >{ value }</option>
        ))
      }
    </select>
  ) : filterVariant === 'text' ? (
    <Fragment>
      {/* autocomplete suggestions from faceted selections */}
      <datalist id={ column.id + 'list' }>
        { sortedUniqueValues.map(value => <option value={ value } key={ `text-data-list-${ value }` } />) }
      </datalist>
      <DebouncedInput
        aria-label={ `${ column.id } text filter` }
        type="text"
        value={ columnFilterValue ?? '' }
        onChange={ value => column.setFilterValue(value) }
        placeholder={ `Search... (${ column.getFacetedUniqueValues().size })` }
        list={ column.id + 'list' }
        style={{ backgroundColor: 'inherit', color: 'inherit', width: '100%' }}
      />
    </Fragment>
  ) : filterVariant === 'max' ? (
    <DebouncedInput
      type="number"
      aria-label={ `${ column.id } maximum filter` }
      min={ 0 }
      value={ columnFilterValue ?? '' }   // just a number, not an array
      onChange={ value => column.setFilterValue(value) } 
      placeholder="Enter maximum"
      style={{ backgroundColor: 'inherit', color: 'inherit', width: '100%' }}
    />
  ) : (
    <div className="no-filtering" />
  )
}

ColumnFilter.propTypes = {
  column: PropTypes.object.isRequired,
}
