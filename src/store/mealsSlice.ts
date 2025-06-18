import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PAGE_LIMIT } from "@/pages/Menu/Menu.constants"

type Meal = {
  id: string
  meal: string
  price: number
  instructions: string
  img: string
}

type MealsState = {
  meals: Meal[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
  category: string
}

const initialState: MealsState = {
  meals: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
  category: "dessert",
}

export const fetchMeals = createAsyncThunk<
  Meal[],
  { category: string, page: number },
  { rejectValue: string }
>("meals/fetchMeals", async ({ category, page }, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/meals?category=${category}&page=${page}&limit=${PAGE_LIMIT}`
    )
    const data = await res.json()
    return data as Meal[]
  } catch (err) {
    return rejectWithValue(`Failed to fetch meals: ${err instanceof Error ? err.message : JSON.stringify(err)}`)
  }
})

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    resetMeals(state, action: PayloadAction<string>) {
      state.meals = []
      state.page = 1
      state.category = action.payload
      state.hasMore = true
      state.error = null
    },
    incrementPage(state) {
      state.page += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        const newMeals = action.payload.filter(
          (item) => !state.meals.some((m) => m.id === item.id)
        )
        state.meals.push(...newMeals)
        state.hasMore = newMeals.length >= PAGE_LIMIT
        state.loading = false
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Error loading meals"
      })
  },
})

export const { resetMeals, incrementPage } = mealsSlice.actions
export default mealsSlice.reducer
