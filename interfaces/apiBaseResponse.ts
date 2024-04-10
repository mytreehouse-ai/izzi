export interface ApiBaseResponse<T> {
  success: boolean;
  after?: string | null;
  before?: string | null;
  data: T;
}
