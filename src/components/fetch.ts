import {IuseOption} from './types';

const useOption = ({debounce}: IuseOption) => {
  const token = '48f272b426d7267c92ceef852fed9aad1f8d4047';
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({query: debounce, count: 3}),
  };
  return options;
};
export default useOption;
