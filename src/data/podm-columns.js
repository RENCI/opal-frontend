import {
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

//

export const podmColumns = [
  columnHelper.group({
    id: 'sample',
    header: 'Sample',
    footer: 'Sample',
    columns: [
      columnHelper.accessor('id', {                            header: 'ID',             footer: 'ID',              enableColumnFilter: false }),
      columnHelper.accessor('sample_id', {                     header: 'Sample',         footer: 'Sample',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('group_id', {                      header: 'Group',          footer: 'Group',           meta: { filterVariant: 'range' } }),
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
      columnHelper.accessor('city', {                                          header: 'City',             footer: 'City',             meta: { filterVariant: 'text' } }),
      columnHelper.accessor('state', {                                         header: 'State',            footer: 'State',            meta: { filterVariant: 'text' } }),
      columnHelper.accessor('zipcode', {                                       header: 'ZIP',              footer: 'ZIP',              meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_id', {                                       header: 'Site ID',          footer: 'Site ID',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_type', {                                     header: 'Site Type',        footer: 'Site Type',        meta: { filterVariant: 'select' } }),
      columnHelper.accessor(row => row.latitude ?? 0, {                        header: 'Latitude',         footer: 'Latitude',         meta: { filterVariant: 'text' } }),
      columnHelper.accessor(row => row.longitude ?? 0, {                       header: 'Longitude',        footer: 'Longitude',        meta: { filterVariant: 'text' } }),
      columnHelper.accessor(
        row => row.miles_to_closest_superfund_site ?? 0,
        {
          id: 'distance_to_npl',
          header: 'NPL Site Distance',
          footer: 'NPL Site Distance',
          filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true;
            const rowValue = row.getValue(columnId);
            return rowValue <= filterValue;
          },
          meta: { filterVariant: 'max' },
        }),
    ],
  }),
  columnHelper.group({
    id: 'pfba',
    header: 'PFBA',
    footer: 'PFBA',
    columns: [
      columnHelper.accessor(r => r.pfba_concentration ?? 0, { id: 'pfba_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfba_mrl ?? 0, {           id: 'pfba_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfba_dl ?? 0, {            id: 'pfba_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfbs',
    header: 'PFBS',
    footer: 'PFBS',
    columns: [
      columnHelper.accessor(r => r.pfbs_concentration ?? 0, { id: 'pfbs_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfbs_mrl ?? 0, {           id: 'pfbs_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfbs_dl ?? 0, {            id: 'pfbs_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfda',
    header: 'PFDA',
    footer: 'PFDA',
    columns: [
      columnHelper.accessor(r => r.pfda_concentration ?? 0, { id: 'pfda_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfda_mrl ?? 0, {           id: 'pfda_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfda_dl ?? 0, {            id: 'pfda_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfdoa',
    header: 'PFDOA',
    footer: 'PFDOA',
    columns: [
      columnHelper.accessor(r => r.pfdoa_concentration ?? 0, { id: 'pfdoa_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfdoa_mrl ?? 0, {           id: 'pfdoa_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfdoa_dl ?? 0, {            id: 'pfdoa_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfds',
    header: 'PFDS',
    footer: 'PFDS',
    columns: [
      columnHelper.accessor(r => r.pfds_concentration ?? 0, { id: 'pfds_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfds_mrl ?? 0, {           id: 'pfds_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfds_dl ?? 0, {            id: 'pfds_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhpa',
    header: 'PFHPA',
    footer: 'PFHPA',
    columns: [
      columnHelper.accessor(r => r.pfhpa_concentration ?? 0, { id: 'pfhpa_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhpa_mrl ?? 0, {           id: 'pfhpa_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhpa_dl ?? 0, {            id: 'pfhpa_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhps',
    header: 'PFHPS',
    footer: 'PFHPS',
    columns: [
      columnHelper.accessor(r => r.pfhps_concentration ?? 0, { id: 'pfhps_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhps_mrl ?? 0, {           id: 'pfhps_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhps_dl ?? 0, {            id: 'pfhps_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxa',
    header: 'PFHxA',
    footer: 'PFHxA',
    columns: [
      columnHelper.accessor(r => r.pfhxa_concentration ?? 0, { id: 'pfhxa_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhxa_mrl ?? 0, {           id: 'pfhxa_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhxa_dl ?? 0, {            id: 'pfhxa_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxs',
    header: 'PFHxS',
    footer: 'PFHxS',
    columns: [
      columnHelper.accessor(r => r.pfhxs_concentration ?? 0, { id: 'pfhxs_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhxs_mrl ?? 0, {           id: 'pfhxs_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfhxs_dl ?? 0, {            id: 'pfhxs_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfna',
    header: 'PFNA',
    footer: 'PFNA',
    columns: [
      columnHelper.accessor(r => r.pfna_concentration ?? 0, { id: 'pfna_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfna_mrl ?? 0, {           id: 'pfna_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfna_dl ?? 0, {            id: 'pfna_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfns',
    header: 'PFNS',
    footer: 'PFNS',
    columns: [
      columnHelper.accessor(r => r.pfns_concentration ?? 0, { id: 'pfns_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfns_mrl ?? 0, {           id: 'pfns_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfns_dl ?? 0, {            id: 'pfns_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfoa',
    header: 'PFOA',
    footer: 'PFOA',
    columns: [
      columnHelper.accessor(r => r.pfoa_concentration ?? 0, { id: 'pfoa_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfoa_mrl ?? 0, {           id: 'pfoa_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfoa_dl ?? 0, {            id: 'pfoa_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfos',
    header: 'PFOS',
    footer: 'PFOS',
    columns: [
      columnHelper.accessor(r => r.pfos_concentration ?? 0, { id: 'pfos_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfos_mrl ?? 0, {           id: 'pfos_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfos_dl ?? 0, {            id: 'pfos_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_flags', {                                             header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfpea',
    header: 'PFPeA',
    footer: 'PFPeA',
    columns: [
      columnHelper.accessor(r => r.pfpea_concentration ?? 0, { id: 'pfpea_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfpea_mrl ?? 0, {           id: 'pfpea_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfpea_dl ?? 0, {            id: 'pfpea_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfpes',
    header: 'PFPeS',
    footer: 'PFPeS',
    columns: [
      columnHelper.accessor(r => r.pfpes_concentration ?? 0, { id: 'pfpes_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfpes_mrl ?? 0, {           id: 'pfpes_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfpes_dl ?? 0, {            id: 'pfpes_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_flags', {                                              header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfunda',
    header: 'PFUnDA',
    footer: 'PFUnDA',
    columns: [
      columnHelper.accessor(r => r.pfunda_concentration ?? 0, { id: 'pfunda_concentration', header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfunda_mrl ?? 0, {           id: 'pfunda_mrl',           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor(r => r.pfunda_dl ?? 0, {            id: 'pfunda_dl',            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_flags', {                                               header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
]

