export type ResponseType<T> = {
  data: T;
};

export type PaginatedResponseType<T> = {
  data: T[];
  meta: {
    page: number;
    totalData: number;
    totalPage: number;
  };
};

export type ParamValueType = string | number | boolean | string[] | number[];

export type ParamsType = Record<string, ParamValueType>;
