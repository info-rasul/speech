import { SelectChangeEvent } from '@mui/material/Select';
import { SortDirection } from '@mui/material/TableCell';
import React from 'react';

declare global {
  interface Window {
    editor: any;
  }
}
export interface ITableHeader {
  key: string;
  value: string;
  isNotSortable?: boolean;
  dataTest: string;
  align?: string;
}

export interface IStatsTableHeader {
  key: string;
  value: string;
}

export interface IFilterValue {
  code: string;
  label: string;
  isValueNeeded?: boolean;
  isValueInput?: boolean;
  isDate?: boolean;
}

export interface IObjectCommon {
  [key: string]: SortDirection;
}

export interface IObjectCommonString {
  [key: string]: string;
}

export interface IObjectCommonNumber {
  [key: string]: number;
}

export interface IFilterData {
  type: string;
  mark: string;
  value?: string;
  uuid?: string;
}

export interface IImage {
  url: string;
  extension: string;
  name: string;
}

export interface IImgData {
  background: IImage;
  icon: IImage;
}

export interface IPaginationPayload {
  page: number;
  perPage: number;
  sortData?: IObjectCommon;
}

export interface IPagination extends IPaginationPayload {
  pagesCount: number;
  totalItems: number;
}

export interface IPaginationActionPayload {
  perPage?: string;
}

export type IFilterCondition = 'or' | 'and';

export type ChangeEvent = React.ChangeEvent<{ value: unknown }>;
export type ChangeHTMLevent = React.ChangeEvent<HTMLInputElement>;
export type ChangeEventFunction = (T: ChangeEvent | SelectChangeEvent) => void;

export interface IFiltersGroupedItem {
  name: string;
  sort: number;
  list: IFilterType[];
}

export interface IFilterType extends IFilterValue {
  code: string;
}

export interface loginData {
  login: string;
  password: string;
}

export interface GetListDataPayload {
  page: number;
  perPage: number;
  sortData?: IObjectCommon;
  search?: string;
  fullSearch?: boolean;
  id?: string;
}

export type TProjectCode =
  | 'sol'
  | 'fresh'
  | 'jet'
  | 'volna'
  | 'rox'
  | 'izzi'
  | 'legzo'
  | 'starda'
  | 'drip';

export interface IRadioData {
  label: string;
  value: string | boolean;
}

export interface IFiltersData {
  segments: IFilterValue[];
  filterCollection: IFilterValue[];
  channels: IFilterValue[];
  langs: IFilterValue[];
  currencies: IFilterValue[];
  ttlHeaders: IFilterValue[];
}
