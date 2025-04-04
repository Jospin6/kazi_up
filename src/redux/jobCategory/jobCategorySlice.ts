import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface JobCategory {
    id?: string;
    title: string;
    tags: string;
}

interface JobCategoryState {
    jobCategories: JobCategory[];
    jobCategory: JobCategory | null
    loading: boolean;
    error: string | null;
}

const initialState: JobCategoryState = {
    jobCategories: [],
    jobCategory: null,
    loading: false,
    error: null,
};

export const fetchJobCategories = createAsyncThunk("jobCategories/fetchJobCategories", async () => {
    const response = await axios.get("/api/jobCategories");
    return response.data;
});

export const getJobCategory = createAsyncThunk("jobCategories/getJobCategory", async (id: string) => {
    const response = await axios.get(`/api/jobCategories/${id}`);
    return response.data;
});

export const createJobCategory = createAsyncThunk("jobCategories/createJobCategory", async (jobCategory: JobCategory) => {
    const response = await axios.post("/api/jobCategories", jobCategory);
    return response.data;
});

export const updateJobCategory = createAsyncThunk("jobCategories/updateJobCategory", async (jobCategory: JobCategory) => {
    const response = await axios.put(`/api/jobCategories/${jobCategory.id}`, jobCategory);
    return response.data;
});

export const deleteJobCategory = createAsyncThunk("jobCategories/deleteJobCategory", async (id: string) => {
    await axios.delete(`/api/jobCategories/${id}`);
    return id;
});

const jobCategorySlice = createSlice({
    name: "jobCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobCategories.fulfilled, (state, action: PayloadAction<JobCategory[]>) => {
                state.loading = false;
                state.jobCategories = action.payload;
            })
            .addCase(fetchJobCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch job categories";
            })

            .addCase(getJobCategory.fulfilled, (state, action: PayloadAction<JobCategory>) => {
                state.loading = false;
                state.jobCategory = action.payload;
            })


            .addCase(createJobCategory.fulfilled, (state, action: PayloadAction<JobCategory>) => {
                state.jobCategories.push(action.payload);
            })
            .addCase(updateJobCategory.fulfilled, (state, action: PayloadAction<JobCategory>) => {
                const index = state.jobCategories.findIndex((category) => category.id === action.payload.id);
                if (index !== -1) {
                    state.jobCategories[index] = action.payload;
                }
            })
            .addCase(deleteJobCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.jobCategories = state.jobCategories.filter((category) => category.id !== action.payload);
            });
    },
});

export const selectJobCategories = (state: RootState) => state.jobCategory.jobCategories
export const selectJobCategory = (state: RootState) => state.jobCategory.jobCategory

export default jobCategorySlice.reducer;
