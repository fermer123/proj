/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, FocusEvent, useCallback, useEffect, useState} from 'react';
import useInput from './components/input';
import style from './App.module.scss';
import useDebounce from './components/debounce';
import {IAdress, Idata, url} from './components/types';
import useOption from './components/fetch';

const App: FC = () => {
  const [address, setAddress] = useState<Idata>(null);
  const [inputDirty, setInputDirty] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | string>('');
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownUl = useCallback(
    (arg: boolean) => {
      setDropdown(arg);
    },
    [dropdown],
  );
  const input = useInput('');
  const debounce = useDebounce(input.value, 600);
  const getOption = useOption({debounce});
  const AddressHandler = (data: IAdress | null) => {
    input.setValue(
      `${data.city ? `${data.city_type}.${data.city}` : ''}, ${
        data.street ? `${data.street_type}.${data.street}` : ''
      }, ${data.house ? `${data.house_type}.${data.house}` : ''}`,
    );
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const inputChek = input.value.replace(/[,]/g, '').split(' ');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (e.currentTarget === e.target) {
      // eslint-disable-next-line array-callback-return
      address?.map(({data}) => {
        if (
          !!input.value.length &&
          !!address &&
          data.city !== null &&
          `${data.city_type}.${data.city}` === inputChek[0] &&
          data.street !== null &&
          `${data.street_type}.${data.street}` === inputChek[1] &&
          data.house !== null &&
          inputChek[2] !== ''
        ) {
          setInputDirty(false);
        } else {
          setInputDirty(true);
          dropdownUl(true);
        }
      });
    } else dropdownUl(false);
  };

  useEffect(() => {
    if (debounce.length >= 1) {
      fetch(url, getOption)
        .then((response) => response.json())
        .then((result) => setAddress(result.suggestions))
        .then(() => dropdownUl(true))
        .catch((e) => setError(e));
    } else {
      dropdownUl(false);
    }
  }, [debounce]);
  const postData = (e: React.KeyboardEvent<HTMLInputElement>, data) => {
    if (e.key === 'Enter' && !inputDirty) {
      // имитация запроса | fetch('url' useOption(param))
      const promise: Promise<void> = Promise.resolve(data);
      promise.then((value) => {
        console.log(value);
      });
    }
  };
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
          onBlur={blurHandler}
          type='text'
          style={
            inputDirty
              ? {border: '3px solid rgba(160, 17, 17, 0.46)'}
              : {border: '3px solid rgba(17, 129, 160, 0.46)'}
          }
          onKeyDown={(e) => postData(e, input.value)}
          tabIndex={0}
        />
        {dropdown && (
          <ul className={style.app_container_ul_dropdown}>
            {address?.map(({data}: Idata, idx) => (
              // eslint-disable-next-line react/no-array-index-key, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <li
                className={style.app_container_li_dropdown}
                onClick={() => AddressHandler(data)}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}>
                <p>{data.city ? `${data.city_type}.${data.city}` : ''}</p>
                <p>{data.street ? `${data.street_type}.${data.street}` : ''}</p>
                <p>{data.house ? `${data.house_type}.${data.house}` : ''}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default App;
