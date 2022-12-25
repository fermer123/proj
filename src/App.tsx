/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, FocusEvent, useEffect, useState} from 'react';
import useInput from './components/input';
import style from './App.module.scss';
import useDebounce from './components/debounce';
import {IAdress, Idata} from './components/types';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const token = '48f272b426d7267c92ceef852fed9aad1f8d4047';

const App: FC = () => {
  const [address, setAddress] = useState<Idata>(null);
  const [inputDirty, setInputDirty] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | string>('');
  const [dropdown, setDropdown] = useState<boolean>(false);
  const input = useInput('');
  const debounce = useDebounce(input.value, 600);

  const AddressHandler = (data: IAdress | null) => {
    input.setValue(
      `${data.city_with_type ? data.city_with_type : ''}, ${
        data.street_with_type ? data.street_with_type : ''
      },  ${data.house ? `${data.house_type} ${data.house}` : ''}`,
    );
  };
  console.log(address);

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setDropdown(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.currentTarget === e.target
      ? address?.map(({data}) => {
          if (
            address !== null &&
            (data.city_with_type !== null || undefined) &&
            (data.street_with_type !== null || undefined) &&
            (data.house !== null || undefined)
          ) {
            setInputDirty(true);
          } else setInputDirty(false);
        })
      : setDropdown(false);
  };

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
  useEffect(() => {
    if (debounce.length >= 1) {
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => setAddress(result.suggestions))
        // .then(() => setDropdown(true))
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
      <div className={style.app_container_input}>
        <input
          value={input.value}
          onChange={input.onChange}
          onBlur={(e) => blurHandler(e)}
          type='text'
          style={
            inputDirty
              ? {border: '3px solid rgba(17, 129, 160, 0.46)'}
              : {border: '3px solid rgba(160, 17, 17, 0.46)'}
          }
        />
        {dropdown && (
          <ul>
            {address?.map(({data}: Idata, idx) => (
              // eslint-disable-next-line react/no-array-index-key, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <li
                onClick={() => AddressHandler(data)}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}>
                <p>{data.city_with_type ? data.city_with_type : ''}</p>
                <p>{data.street_with_type ? data.street_with_type : ''}</p>
                <p>{data.house ? `${data.house_type} ${data.house}` : ''}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default App;
