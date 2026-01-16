import { AppRoute, CITIES } from '../../const';
import { Link } from 'react-router-dom';

function CitiesTabs() {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => (
              <li key={city} className="locations__item">
                <Link to={AppRoute.Main} className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item--active' : ''}`}>
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
