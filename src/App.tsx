/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, useEffect, useState} from 'react';
import useInput from './components/input';
import style from './App.module.scss';
import useDebounce from './components/debounce';

const App: FC = () => {
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<Error>(null);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const input = useInput('');
  const debounce = useDebounce(input.value, 400);
  const url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  const token = 'bddca6686babb3986a5cf9471da70efe66fbc942';

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({query: debounce, count: 1}),
  };

  useEffect(() => {
    if (debounce.length > 3) {
      fetch(url, options)
        .then((response) => console.log(response.text()))
        // .then((result) => setAddress(JSON.parse(result)))
        // .then((result) => console.log(result))
        .then(() => setDropdown(true))
        .catch((e) => setError(e));
    } else {
      setDropdown(false);
    }
  }, [debounce]);
  console.log(JSON.parse(address));
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
