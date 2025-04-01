import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Job {
    id: string;
    title: string;
    description: string;
    salary?: string;
    location?: string;
    remote: boolean;
    employement_TypeId: string;
    tags: string;
    keywords: string;
    companyId: string;
    postedById: string;
    job_categoryId: string;
    createdAt: string;
    updatedAt: string;
}

interface JobState {
    jobs: Job[];
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    jobs: [],
    loading: false,
    error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const response = await axios.get("/api/jobs");
    return response.data;
});

export const createJob = createAsyncThunk("jobs/createJob", async (job: Omit<Job, "id">) => {
    const response = await axios.post("/api/jobs", job);
    return response.data;
});

export const updateJob = createAsyncThunk("jobs/updateJob", async (job: Job) => {
    const response = await axios.put(`/api/jobs/${job.id}`, job);
    return response.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id: string) => {
    await axios.delete(`/api/jobs/${id}`);
    return id;
});

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch jobs";
            })
            .addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
                state.jobs.push(action.payload);
            })
            .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
                const index = state.jobs.findIndex((job) => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
            })
            .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
                state.jobs = state.jobs.filter((job) => job.id !== action.payload);
            });
    },
});

export default jobSlice.reducer;