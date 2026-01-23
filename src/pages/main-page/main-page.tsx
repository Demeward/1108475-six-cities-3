import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import CitiesContent from '../../components/cities-content/cities-content';
import { AuthorizationStatus } from '../../const';

type MainPageProps = {
   authorizationStatus: AuthorizationStatus;
}


function MainPage({ authorizationStatus }: MainPageProps) {
  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />
        <CitiesContent authorizationStatus={authorizationStatus}/>
      </main>
    </div>
  );
}

export default MainPage;
