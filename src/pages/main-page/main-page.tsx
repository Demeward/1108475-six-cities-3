import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import CitiesContent from '../../components/cities-content/cities-content';
import { AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';

type MainPageProps = {
   offers: Offer[];
   authorizationStatus: AuthorizationStatus;
}


function MainPage({ offers, authorizationStatus }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />
        <CitiesContent offers={offers} authorizationStatus={authorizationStatus}/>
      </main>
    </div>
  );
}

export default MainPage;
