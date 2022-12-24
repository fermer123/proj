/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, useEffect, useState} from 'react';
import useInput from './components/input';
import style from './App.module.scss';
import useDebounce from './components/debounce';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const token = '48f272b426d7267c92ceef852fed9aad1f8d4047';
interface IAdress {
  city_with_type: string;
  street_with_type: string;
  house_type: number;
}
const App: FC = () => {
  const [address, setAddress] = useState<IAdress[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | string>('');
  const [dropdown, setDropdown] = useState<boolean>(false);
  const input = useInput('');
  const debounce = useDebounce(input.value, 600);

  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({query: debounce, count: 2}),
  };

  useEffect(() => {
    if (debounce.length > 3) {
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => setAddress(result.suggestions))
        .then(() => setDropdown(true))
        .catch((e) => setError(e));
    } else {
      setDropdown(false);
    }
  }, [debounce]);
  console.log(address);
  return (
    <div className={style.app_container}>
      <div>
        Адрес
        <span>*</span>
      </div>
      <input {...input} />
      {dropdown && (
        <ul>
          {address.map((e, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={idx}>
              <div>{e.city_with_type}</div>
              <div>{e.street_with_type}</div>
              <div>{e.house_type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default App;
