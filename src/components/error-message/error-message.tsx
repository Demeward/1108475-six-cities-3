import { useAppSelector } from '../../store';
import './error-message.css';
import { getError } from '../../store/main/reducer';

function ErrorMessage() {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
