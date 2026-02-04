import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import CitiesContent from '../../components/cities-content/cities-content';
import { useAppSelector } from '../../store';
import { selectOffersLoadingFailedStatus } from '../../store/main/reducer';


function MainPage() {
  const isOffersLoadingFailed = useAppSelector(selectOffersLoadingFailedStatus);


  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {!isOffersLoadingFailed ?
          <>
            <CitiesTabs />
            <CitiesContent />
          </>
          :
          <div className='container'><h2>Не удалось загрузить список предложений.</h2></div>}
      </main>
    </div>
  );
}

export default MainPage;
