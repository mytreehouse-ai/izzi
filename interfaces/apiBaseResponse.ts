export interface ApiBaseResponse<T> {
  success: boolean;
  after?: string | null;
  before?: string | null;
  count?: number;
  data: T;
}
