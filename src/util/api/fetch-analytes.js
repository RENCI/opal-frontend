import api from './api'
import { chemicalFormulaLaTeX } from '@util'

const API_URL = `${ process.env.API_HOST }/podm/api`

export const fetchAnalytes = async () => await api.get(
    `${ API_URL }/pfas_name_classification_info/?`
      + `fields=abbreviation,chemical_name,dtxsid,formula`
      + `&abbreviation__istartswith=PF`
      + `&psize=100`
      + `&format=json`
  ).then(response => response.data.results
    .map(analyte => ({
      ...analyte,
      id: analyte.abbreviation.toLowerCase(),
      formula_latex: String(chemicalFormulaLaTeX(analyte.formula)),
    }))
  ).catch(error => {
    console.error(error.message)
    return []
  })