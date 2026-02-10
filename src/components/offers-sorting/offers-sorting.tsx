import { useNavigate } from 'react-router-dom';
import { Sorting } from '../../const';
import { memo, useCallback, useState } from 'react';


type OffersSortingProps = {
  activeCity: string;
  activeSorting: Sorting;
};

const OffersSorting = memo(({ activeCity, activeSorting }: OffersSortingProps) => {
  const [isToggled, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSortingChange = useCallback((sorting: Sorting) => {
    if (sorting !== activeSorting) {
      navigate(`?city=${activeCity}&sorting=${sorting}`);
      setToggle(false);
    }
  }, [activeCity, activeSorting, navigate]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setToggle(!isToggled)} >
        &nbsp;{activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isToggled ? 'places__options--opened' : ''}`}>
        {
          Object.values(Sorting).map((sorting) => (
            <li key={sorting} className={`places__option ${sorting === activeSorting ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => handleSortingChange(sorting)}>{sorting}</li>
          ))
        }
      </ul>
    </form>
  );
});

OffersSorting.displayName = 'OffersSorting';

export default OffersSorting;
