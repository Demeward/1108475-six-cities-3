import { CITIES, Sorting } from '../../const';
import './cities-tabs.css';
import { useNavigate, useSearchParams } from 'react-router-dom';


function CitiesTabs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCity = searchParams.get('city') ?? CITIES[0];
  const activeSorting = searchParams.get('sorting') as Sorting ?? Sorting.Popular;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => (
              <li key={city} className="locations__item">
                <button
                  type='button'
                  className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                  onClick={() => {
                    if (city !== activeCity) {
                      navigate(`?city=${city}&sorting=${activeSorting}`);
                    }
                  }}
                >
                  <span>{city}</span>
                </button>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesTabs;
