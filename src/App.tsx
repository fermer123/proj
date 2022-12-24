/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, useEffect, useState} from 'react';
import useInput from './components/input';
import style from './App.module.scss';
import useDebounce from './components/debounce';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const token = '48f272b426d7267c92ceef852fed9aad1f8d4047';

const App: FC = () => {
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<Error>(null);
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
    body: JSON.stringify({query: debounce, count: 1}),
  };
  console.log(address);
  useEffect(() => {
    if (debounce.length > 3) {
      fetch(url, options)
        .then((response) => response.text())
        .then((result) => setAddress(result))
        .then(() => setDropdown(true))
        .catch((e) => setError(e));
    } else {
      setDropdown(false);
    }
  }, [debounce]);

  return (
    <div className={style.app_container}>
      <div>
        Адрес
        <span>*</span>
      </div>
      <input {...input} />
      {/* {dropdown && (
        <ul>
          {address.map((e) => (
            <li>asd</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};
export default App;
