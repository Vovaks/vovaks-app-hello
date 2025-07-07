export interface IUser {
  username: string
  id: string
  name: string
  password: string
}

export interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
}


