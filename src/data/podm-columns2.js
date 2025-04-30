import {
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

//

export const ucmr5Columns = [
  columnHelper.group({
    id: 'sample',
    header: 'Sample',
    footer: 'Sample',
    columns: [
      columnHelper.accessor('id', {                            header: 'ID',             footer: 'ID',              enableColumnFilter: false }),
      columnHelper.accessor('sample_id', {                     header: 'Sample',         footer: 'Sample',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('study', {                         header: 'Study',          footer: 'Study',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('pi', {                            header: 'PI',             footer: 'PI',              meta: { filterVariant: 'select' } }),
      columnHelper.accessor('units', {                         header: 'Units',          footer: 'Units',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('medium', {                        header: 'Medium',         footer: 'Medium',          meta: { filterVariant: 'select' } }),
      columnHelper.accessor('date', {                          header: 'Date',           footer: 'Date',            meta: { filterVariant: 'text' } }),
      columnHelper.accessor(row => row.sample_detects ?? -1, { header: 'Sample Detects', footer: 'Sample Detects',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(row => row.sample_sum ?? -1, {     header: 'Sample Sum',     footer: 'Sample Sum',      meta: { filterVariant: 'range' } }),
    ],
  }),
  columnHelper.group({
    id: 'location',
    header: 'Location',
    footer: 'Location',
    columns: [
      columnHelper.accessor('city', {                    header: 'City',          footer: 'City',             meta: { filterVariant: 'text' } }),
      columnHelper.accessor('state', {                   header: 'State',         footer: 'State',            meta: { filterVariant: 'text' } }),
      columnHelper.accessor('zipcode', {                 header: 'ZIP',           footer: 'ZIP',              meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_id', {                 header: 'Site ID',       footer: 'Site ID',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_type', {               header: 'Site Type',     footer: 'Site Type',        meta: { filterVariant: 'select' } }),
      columnHelper.accessor(row => row.latitude ?? 0, {  header: 'Latitude',      footer: 'Latitude',         meta: { filterVariant: 'text' } }),
      columnHelper.accessor(row => row.longitude ?? 0, { header: 'Longitude',     footer: 'Longitude',        meta: { filterVariant: 'text' } }),
    ],
  }),
  // pfmpa_concentration
  columnHelper.group({
    id: 'pfmpa',
    header: 'pfmpa',
    footer: 'pfmpa',
    columns: [
      columnHelper.accessor(r => r.pfmpa_concentration ?? 0, { id: 'pfmpa_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfmpa_mrl ?? 0, { id: 'pfmpa_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // pfmba_concentration
  columnHelper.group({
    id: 'pfmba',
    header: 'pfmba',
    footer: 'pfmba',
    columns: [
      columnHelper.accessor(r => r.pfmba_concentration ?? 0, { id: 'pfmba_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfmba_mrl ?? 0, { id: 'pfmba_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // pfta_concentration
  columnHelper.group({
    id: 'pfta',
    header: 'pfta',
    footer: 'pfta',
    columns: [
      columnHelper.accessor(r => r.pfta_concentration ?? 0, { id: 'pfta_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfta_mrl ?? 0, { id: 'pfta_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // netfosaa_concentration
  columnHelper.group({
    id: 'netfosaa',
    header: 'netfosaa',
    footer: 'netfosaa',
    columns: [
      columnHelper.accessor(r => r.netfosaa_concentration ?? 0, { id: 'netfosaa_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.netfosaa_mrl ?? 0, { id: 'netfosaa_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // x82fts_concentration
  columnHelper.group({
    id: 'x82fts',
    header: 'x82fts',
    footer: 'x82fts',
    columns: [
      columnHelper.accessor(r => r.x82fts_concentration ?? 0, { id: 'x82fts_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.x82fts_mrl ?? 0, { id: 'x82fts_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // hfpoda_concentration
  columnHelper.group({
    id: 'hfpoda',
    header: 'hfpoda',
    footer: 'hfpoda',
    columns: [
      columnHelper.accessor(r => r.hfpoda_concentration ?? 0, { id: 'hfpoda_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.hfpoda_mrl ?? 0, { id: 'hfpoda_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // x62fts_concentration
  columnHelper.group({
    id: 'x62fts',
    header: 'x62fts',
    footer: 'x62fts',
    columns: [
      columnHelper.accessor(r => r.x62fts_concentration ?? 0, { id: 'x62fts_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.x62fts_mrl ?? 0, { id: 'x62fts_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // nfdha_concentration
  columnHelper.group({
    id: 'nfdha',
    header: 'nfdha',
    footer: 'nfdha',
    columns: [
      columnHelper.accessor(r => r.nfdha_concentration ?? 0, { id: 'nfdha_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.nfdha_mrl ?? 0, { id: 'nfdha_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // pfuna_concentration
  columnHelper.group({
    id: 'pfuna',
    header: 'pfuna',
    footer: 'pfuna',
    columns: [
      columnHelper.accessor(r => r.pfuna_concentration ?? 0, { id: 'pfuna_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfuna_mrl ?? 0, { id: 'pfuna_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // pfeesa_concentration
  columnHelper.group({
    id: 'pfeesa',
    header: 'pfeesa',
    footer: 'pfeesa',
    columns: [
      columnHelper.accessor(r => r.pfeesa_concentration ?? 0, { id: 'pfeesa_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfeesa_mrl ?? 0, { id: 'pfeesa_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // nmefosaa_concentration
  columnHelper.group({
    id: 'nmefosaa',
    header: 'nmefosaa',
    footer: 'nmefosaa',
    columns: [
      columnHelper.accessor(r => r.nmefosaa_concentration ?? 0, { id: 'nmefosaa_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.nmefosaa_mrl ?? 0, { id: 'nmefosaa_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // x9clpf3ons_concentration
  columnHelper.group({
    id: 'x9clpf3ons',
    header: 'x9clpf3ons',
    footer: 'x9clpf3ons',
    columns: [
      columnHelper.accessor(r => r.x9clpf3ons_concentration ?? 0, { id: 'x9clpf3ons_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.x9clpf3ons_mrl ?? 0, { id: 'x9clpf3ons_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // x11clpf3ouds_concentration
  columnHelper.group({
    id: 'x11clpf3ouds',
    header: 'x11clpf3ouds',
    footer: 'x11clpf3ouds',
    columns: [
      columnHelper.accessor(r => r.x11clpf3ouds_concentration ?? 0, { id: 'x11clpf3ouds_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.x11clpf3ouds_mrl ?? 0, { id: 'x11clpf3ouds_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // adona_concentration
  columnHelper.group({
    id: 'adona',
    header: 'adona',
    footer: 'adona',
    columns: [
      columnHelper.accessor(r => r.adona_concentration ?? 0, { id: 'adona_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.adona_mrl ?? 0, { id: 'adona_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // x42fts_concentration
  columnHelper.group({
    id: 'x42fts',
    header: 'x42fts',
    footer: 'x42fts',
    columns: [
      columnHelper.accessor(r => r.x42fts_concentration ?? 0, { id: 'x42fts_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.x42fts_mrl ?? 0, { id: 'x42fts_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // pftrda_concentration
  columnHelper.group({
    id: 'pftrda',
    header: 'pftrda',
    footer: 'pftrda',
    columns: [
      columnHelper.accessor(r => r.pftrda_concentration ?? 0, { id: 'pftrda_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pftrda_mrl ?? 0, { id: 'pftrda_mrl', header: 'MRL', footer: 'MRL', meta: { filterVariant: 'range' } }),
    ],
  }),
    
  // genx_concentration         | numeric
  columnHelper.group({
    id: 'genx',
    header: 'genx',
    footer: 'genx',
    columns: [
      columnHelper.accessor(r => r.genx_concentration ?? 0, { id: 'genx_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } })
    ],
  }),
    
  // fosa_concentration         | numeric
  columnHelper.group({
    id: 'fosa',
    header: 'fosa',
    footer: 'fosa',
    columns: [
      columnHelper.accessor(r => r.fosa_concentration ?? 0, { id: 'fosa_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } })
    ],
  }),
    
  // f6_2fts_concentration      | numeric
  columnHelper.group({
    id: 'f6_2fts',
    header: 'f6_2fts',
    footer: 'f6_2fts',
    columns: [
      columnHelper.accessor(r => r.f6_2fts_concentration ?? 0, { id: 'f6_2fts_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } })
    ],
  }),
    
  // pfprs_concentration        | numeric
  columnHelper.group({
    id: 'pfprs',
    header: 'pfprs',
    footer: 'pfprs',
    columns: [
      columnHelper.accessor(r => r.pfprs_concentration ?? 0, { id: 'pfprs_concentration', header: 'Concentration', footer: 'Concentration', meta: { filterVariant: 'range' } })
    ],
  }),
]
