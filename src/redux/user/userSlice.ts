import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    avatar?: Buffer;
    location?: string;
    residencyCountry?: string;
    nationality?: string;
    gender?: string;
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    bio?: string;
    skills?: string;
    languages?: string;
    available?: string;
    timezone?: string;
    annualpay?: string;
    hourlypay?: string;
}

interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("/api/users");
    return response.data;
});

export const getUser = createAsyncThunk("users/getUser", async (id: string) => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
});

export const updateUser = createAsyncThunk<User, { id: string; formData: FormData }>(
    "users/updateUser",
    async ({ id, formData }) => {
        const response = await axios.put(`/api/users/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
    await axios.delete(`/api/users/${id}`);
    return id;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    },
});

export const selectUsers = (state: RootState) => state.user.users
export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer;