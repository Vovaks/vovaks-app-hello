import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setAuth, setError, setIsLoading } from '../store/reducers/auth';

const actions = {
  setUser,
  setAuth,
  setError,
  setIsLoading,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};