import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserActivity {
    id: string;
    type: string;
    year_start?: string;
    year_end?: string;
    title?: string;
    company?: string;
    url?: string;
    email?: string;
    description?: string;
    userId: string;
}

interface UserActivityState {
    activities: UserActivity[];
    loading: boolean;
    error: string | null;
}

const initialState: UserActivityState = {
    activities: [],
    loading: false,
    error: null,
};

export const fetchUserActivities = createAsyncThunk("userActivities/fetchUserActivities", async () => {
    const response = await axios.get("/api/userActivities");
    return response.data;
});

export const createUserActivity = createAsyncThunk("userActivities/createUserActivity", async (activity: Omit<UserActivity, "id">) => {
    const response = await axios.post("/api/userActivities", activity);
    return response.data;
});

export const updateUserActivity = createAsyncThunk("userActivities/updateUserActivity", async (activity: UserActivity) => {
    const response = await axios.put(`/api/userActivities/${activity.id}`, activity);
    return response.data;
});

export const deleteUserActivity = createAsyncThunk("userActivities/deleteUserActivity", async (id: string) => {
    await axios.delete(`/api/userActivities/${id}`);
    return id;
});

const userActivitySlice = createSlice({
    name: "userActivities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserActivities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserActivities.fulfilled, (state, action: PayloadAction<UserActivity[]>) => {
                state.loading = false;
                state.activities = action.payload;
            })
            .addCase(fetchUserActivities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user activities";
            })
            .addCase(createUserActivity.fulfilled, (state, action: PayloadAction<UserActivity>) => {
                state.activities.push(action.payload);
            })
            .addCase(updateUserActivity.fulfilled, (state, action: PayloadAction<UserActivity>) => {
                const index = state.activities.findIndex((activity) => activity.id === action.payload.id);
                if (index !== -1) {
                    state.activities[index] = action.payload;
                }
            })
            .addCase(deleteUserActivity.fulfilled, (state, action: PayloadAction<string>) => {
                state.activities = state.activities.filter((activity) => activity.id !== action.payload);
            });
    },
});

export default userActivitySlice.reducer;
