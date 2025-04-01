import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    accountType: string;
    role: string;
    avatar?: string;
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
    companyId?: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("/api/users");
    return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (user: Omit<User, "id">) => {
    const response = await axios.post("/api/users", user);
    return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user: User) => {
    const response = await axios.put(`/api/users/${user.id}`, user);
    return response.data;
});

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
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
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

export default userSlice.reducer;