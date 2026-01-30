import { AppRoute, CITIES } from '../../const';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeCity } from '../../store/main/reducer';

function CitiesTabs() {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.activeCity);

  const handleCityTabClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, city: string) => {
    if (city === activeCity) {
      evt.preventDefault();
    } else {
      dispatch(changeCity(city));
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => (
              <li key={city} className="locations__item">
                <Link
                  to={{pathname: AppRoute.Main, search: `?city=${city}`}}
                  className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                  onClick={(evt) => handleCityTabClick(evt, city)}
                >
                  <span>{city}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesTabs;
