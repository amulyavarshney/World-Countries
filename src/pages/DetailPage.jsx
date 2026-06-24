import { useParams } from 'react-router-dom';
import CountryDetail from '../components/country/CountryDetail';
import PageWrapper from '../components/layout/PageWrapper';

export default function DetailPage() {
  const { cca3 } = useParams();
  return (
    <PageWrapper>
      <CountryDetail cca3={cca3} />
    </PageWrapper>
  );
}
