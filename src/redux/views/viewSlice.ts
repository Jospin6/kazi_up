import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface View {
    id?: string
    jobId?: string
    userId?: string
    // Si tu veux inclure les relations plus tard :
    // User?: User
    // Job?: Job
}

interface ViewState {
    views: View[]
    loading: boolean
    error: string | null
}

const initialState: ViewState = {
    views: [],
    loading: false,
    error: null,
}

// 🔄 Récupérer les vues
export const fetchViews = createAsyncThunk('views/fetchViews', async () => {
    const response = await axios.get<View[]>('/api/views')
    return response.data
})

// ➕ Créer une vue
export const createView = createAsyncThunk('views/createView', async (data: { userId?: string; jobId?: string }) => {
    const response = await axios.post<View>('/api/views', data)
    return response.data
})

// 🧩 Slice
const viewSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        resetViews(state) {
            state.views = []
            state.error = null
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchViews
            .addCase(fetchViews.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchViews.fulfilled, (state, action: PayloadAction<View[]>) => {
                state.loading = false
                state.views = action.payload
            })
            .addCase(fetchViews.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch views'
            })

            // createView
            .addCase(createView.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createView.fulfilled, (state, action: PayloadAction<View>) => {
                state.loading = false
                state.views.push(action.payload)
            })
            .addCase(createView.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to create view'
            })
    },
})

export const { resetViews } = viewSlice.actions

export default viewSlice.reducer
