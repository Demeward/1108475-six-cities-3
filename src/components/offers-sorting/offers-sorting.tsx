import { Sorting } from '../../const';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeSorting } from '../../store/main/reducer';

function OffersSorting() {
  const dispatch = useAppDispatch();
  const [isToggled, setToggle] = useState<boolean>(false);
  const activeSorting = useAppSelector((state) => state.activeSorting);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setToggle(!isToggled)}>
        &nbsp;{activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isToggled ? 'places__options--opened' : ''}`}>
        {
          Object.values(Sorting).map((sorting) => (
            <li key={sorting} className={`places__option ${sorting === activeSorting ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => dispatch(changeSorting(sorting))}>{sorting}</li>
          ))
        }
      </ul>
    </form>
  );
}

export default OffersSorting;
