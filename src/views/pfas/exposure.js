import { ContentPage } from '@components/layout';
import { usePfas } from '@views/pfas';
import { ExposureForm } from '@components/exposure';

//

export const ExposureView = () => {
  const { table } = usePfas();

  return (
    <ContentPage maxWidth="lg">
      <ExposureForm data={ table.getFilteredRowModel(r => r.original).rows } />
    </ContentPage>
  )
}

