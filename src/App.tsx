/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import useInput from './components/input';
import style from './App.module.scss';

const App: FC = () => {
  const input = useInput('');
  return (
    <div className={style.app_container}>
      <div>
        Адрес
        <span>*</span>
      </div>
      <input {...input} />
    </div>
  );
};
export default App;
