import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/plugins/firebase'

type AuthState = {
  user: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

type FirebaseAuthError = {
  code: string
  message: string
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user.email
    } catch (err) {
      const { code } = err as FirebaseAuthError
      return rejectWithValue(code)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
      return true
    } catch (err) {
      const { code } = err as FirebaseAuthError
      return rejectWithValue(code)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { clearUser, setUser } = authSlice.actions
export default authSlice.reducer
