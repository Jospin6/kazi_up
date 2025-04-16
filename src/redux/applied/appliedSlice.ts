import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Applied {
    id: string
    jobId?: string
    userId?: string
}

interface AppliedState {
    appliedList: Applied[]
    loading: boolean
    error: string | null
}

const initialState: AppliedState = {
    appliedList: [],
    loading: false,
    error: null,
}

// 🔄 GET: toutes les candidatures ou avec filtre
export const fetchApplied = createAsyncThunk(
    'applied/fetchApplied',
    async (params?: { userId?: string; jobId?: string }) => {
        const query = new URLSearchParams(params || {}).toString()
        const response = await axios.get<Applied[]>(`/api/applied${query ? `?${query}` : ''}`)
        return response.data
    }
)

// ➕ POST: créer une candidature
export const createApplied = createAsyncThunk(
    'applied/createApplied',
    async (data: { userId?: string; jobId?: string }) => {
        const response = await axios.post<Applied>('/api/applied', data)
        return response.data
    }
)

const appliedSlice = createSlice({
    name: 'applied',
    initialState,
    reducers: {
        resetApplied(state) {
            state.appliedList = []
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchApplied
            .addCase(fetchApplied.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchApplied.fulfilled, (state, action: PayloadAction<Applied[]>) => {
                state.loading = false
                state.appliedList = action.payload
            })
            .addCase(fetchApplied.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch applications'
            })

            // createApplied
            .addCase(createApplied.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createApplied.fulfilled, (state, action: PayloadAction<Applied>) => {
                state.loading = false
                state.appliedList.push(action.payload)
            })
            .addCase(createApplied.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to apply'
            })
    },
})

export const { resetApplied } = appliedSlice.actions

export default appliedSlice.reducer
