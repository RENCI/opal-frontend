import { useCallback } from 'react'
import { Button, FormControl, FormLabel, Option, Select, Stack } from '@mui/joy'
import {
  Close as ClearIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import { useCompare } from '@views/dashboard/compare'
import { Latex } from '@components/latex'

export const AnalyteSelect = () => {
  const { analytes, abbreviate } = useData()
  const { clearAnalytes, selectedAnalytes, setSelectedAnalytes } = useCompare()

  const handleChangeAnalyte = useCallback(index => (event, newAnalyte) => {
    const newAnalytes = [...selectedAnalytes]
    newAnalytes[index] = newAnalyte
    setSelectedAnalytes(newAnalytes)
  }, [selectedAnalytes[0], selectedAnalytes[1]])

  return (
    <Stack direction="row" gap={ 2 } alignItems="center">
      <FormControl orientation="horizontal" size="sm">
        <FormLabel><Latex>x</Latex>-axis:</FormLabel>
        <Select
          size="sm"
          value={ selectedAnalytes[0] ?? '' }
          variant="outlined"
          color={ selectedAnalytes[0] ? 'primary' : 'neutral' }
          onChange={ handleChangeAnalyte(0) }
        >
          <Option key="select-null" value="">Select analyte</Option>
          {
            analytes.map(({ id }) => (
              <Option key={ `select-0-${ id }` } value={ id }>{ abbreviate(id) }</Option>
            ))
          }
        </Select>
      </FormControl>
      <Latex>\times</Latex>
      <FormControl orientation="horizontal" size="sm">
        <FormLabel><Latex>y</Latex>-axis:</FormLabel>
        <Select
          size="sm"
          value={ selectedAnalytes[1] ?? '' }
          variant="outlined"
          color={ selectedAnalytes[1] ? 'primary' : 'neutral' }
          onChange={ handleChangeAnalyte(1) }
        >
          <Option key="select-null" value="">Select analyte</Option>
          {
            analytes.map(({ id }) => (
              <Option key={ `select-1-${ id }` } value={ id }>{ abbreviate(id) }</Option>
            ))
          }
        </Select>
      </FormControl>
      <Button
        key="clear-selections"
        variant="outlined"
        size="sm"
        color="neutral"
        onClick={ clearAnalytes }
        startDecorator={ <ClearIcon fontSize="sm" /> }
        disabled={ selectedAnalytes.every(a => !a) }
      >Clear</Button>
    </Stack>
  )
}
