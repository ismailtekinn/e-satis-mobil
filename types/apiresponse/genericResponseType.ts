export type BackendResponse = {
  ResultCode: string;
  ErrorMessage: string | null;
  ServisVersiyon: string;
  SQL_Data?: string | null;
};
export type SqlData<T> = {
  RECORD_COUNT: string;
  DATA: T[];
};
