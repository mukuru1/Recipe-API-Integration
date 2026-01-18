export interface PaginatedResponse<T> {
  recipes: T[];
  total: number;
  skip: number;
  limit: number;
}
