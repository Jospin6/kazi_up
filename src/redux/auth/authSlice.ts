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
    loading: boolean
    currentUser: User | null
    error: string
}

const initialState: initialStateProps = {
    loading: false,
    currentUser: null,
    error: ""
}

export const fetchcurrentUser = createAsyncThunk(
    "auth/fetchcurrentUser",
    async () => {
        try {
            const response = await axios.get("/api/me");
            return response.data;
        } catch (error: any) {
            throw new Error("Error", error)
        }
    }
);

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/login",
            {
                email: email,
                password: password,
            }
            , {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return response.data;
    } catch (error: any) {
        console.log("Erreur Axios :", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
})

export const signup = createAsyncThunk(
    "auth/signup",
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/signup",
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
                , {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return response.data;
        } catch (error: any) {
            console.log("Erreur Axios :", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchcurrentUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchcurrentUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload
            })
            .addCase(fetchcurrentUser.rejected, (state) => {
                state.loading = false
                state.error = "An error occured"
            })
    },
})

export const selectCurrentUser = (state: RootState) => state.auth.currentUser

export default authSlice.reducer