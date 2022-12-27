export interface IAdress {
  city: string;
  city_type?: string;
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
export const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
