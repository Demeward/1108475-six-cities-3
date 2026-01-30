import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import CitiesContent from '../../components/cities-content/cities-content';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store';

type MainPageProps = {
   authorizationStatus: AuthorizationStatus;
}


function MainPage({ authorizationStatus }: MainPageProps) {
  const isOffersLoadingFailed = useAppSelector((state) => state.isOffersLoadingFailed);


  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {!isOffersLoadingFailed ?
          <>
            <CitiesTabs />
            <CitiesContent authorizationStatus={authorizationStatus} />
          </>
          :
          <div className='container'><h2>Не удалось загрузить список предложений.</h2></div>}
      </main>
    </div>
  );
}

export default MainPage;
