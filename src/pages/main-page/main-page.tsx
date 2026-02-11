import Header from '../../components/header/header';
import OffersEmpty from '../../components/offers-empty/offers-empty';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import CitiesContent from '../../components/cities-content/cities-content';
import { CITIES } from '../../const';
import { useAppSelector } from '../../store';
import { selectFilteredOffers, selectOffersLoadingFailedStatus } from '../../store/main/slice';
import { useSearchParams } from 'react-router-dom';


function MainPage() {
  const [searchParams] = useSearchParams();
  const activeCity = searchParams.get('city') ?? CITIES[0];
  const offers = useAppSelector((state) => selectFilteredOffers(state, activeCity));
  const isLoadingFailed = useAppSelector(selectOffersLoadingFailedStatus);

  if (isLoadingFailed.offers) {
    return (
      <div className="page page--gray page--main">
        <Header />
        <div className='container'><h2>Не удалось загрузить список предложений.</h2></div>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      {!offers.length ?
        <OffersEmpty activeCity={activeCity}/>
        :
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesTabs activeCity={activeCity} />
          <CitiesContent activeCity={activeCity} />
        </main>}
    </div>
  );
}

export default MainPage;
