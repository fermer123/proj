export interface IAdress {
  city_with_type: string;
  street_with_type: string;
  house_type?: string;
  house: number | string;
}
export interface Idata {
  map(arg: (e: Idata, idx: number) => JSX.Element): React.ReactNode;
  data: IAdress;
}
