export interface IAdress {
  city: string;
  city_type?: 'ул';
  street: string;
  street_type: string;
  house_type?: string;
  house: string;
}
export interface Idata {
  map(arg: (e: Idata, idx?: number) => JSX.Element | void): React.ReactNode;
  data: IAdress;
}
export type IuseOption = {
  debounce: string;
};
export const url: string = process.env.REACT_APP_BASE_URLREACT_APP_BASE_URL;
