export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
