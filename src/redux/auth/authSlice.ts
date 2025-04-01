import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

interface User {
    id?: string
    username: string
    email: string
    password?: string
}

interface initialStateProps {
    currentUser: User | null
}

const initialState: initialStateProps = {
    currentUser: null
}

export const login = createAsyncThunk("auth/login", async (data: User) => {
    const response = await axios.post("/api/login", data)
    return response.data
})

export const signup = createAsyncThunk("auth/signup", async (data: User) => {
    const response = await axios.post("/api/signup", data)
    return response.data
})

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Error inconnue");
            }
            return rejectWithValue("Error inconnue");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export const selectCurrentUser = (state: RootState) => state.auth.currentUser

export default authSlice.reducer