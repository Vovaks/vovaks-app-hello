import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from './auth.types'

interface AuthState {
  isAuthenticated: boolean
  error: string
  isLoading: boolean
  user: IUser
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: '',
  isLoading: false,
  user: {} as IUser,
}

//LOGIN
export const login = createAsyncThunk<
  IUser,
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await fakeLoginApi(credentials)
    return response.user
  } catch (error) {
    if (error instanceof Error) {
      console.error('Message:', error.message)
      return thunkAPI.rejectWithValue(error.message)
    } else {
      console.error('Unknown error', error)
      return thunkAPI.rejectWithValue('Unknown error')
    }
  }
})

async function fakeLoginApi(credentials: { username: string; password: string }) {
  return new Promise<{ user: IUser }>((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'password') {
        resolve({ user: { id: 1, username: 'admin' } as unknown as IUser })
        localStorage.setItem('username', 'admin')
        localStorage.setItem('auth', 'true')
      } else {
        reject(new Error('Invalid credentials! admin/password'))
      }
    }, 1000)
  })
}

//LOGOUT
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    return
  } catch (error) {
    if (error instanceof Error) {
      console.error('Message:', error.message)
      return thunkAPI.rejectWithValue(error.message)
    } else {
      console.error('Unknown error', error)
    }
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
      state.isLoading = false
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      //LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = {} as IUser
        state.isAuthenticated = false
        state.isLoading = false
        state.error = ''
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setAuth, setUser, setIsLoading, setError } = authSlice.actions
export default authSlice.reducer
