import { useAppSelector } from '../../store';
import './error-message.css';
import { selectError } from '../../store/main/reducer';

function ErrorMessage() {
  const error = useAppSelector(selectError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
