import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Job {
    id?: string;
    position: string;
    companyName: string;
    description: string;
    jobCategoryId: string;
    employementTypeId: string;
    primaryTag: string;
    tags: string;
    jobRestricted: string;
    remote: string;
    companyLogo?: Buffer;
    howToApply?: string;
    salaryRange?: string;
    createdAt?: string;
    website: string;
    userId?: string
    View?: any[];
    Applied?: any[];
}

export interface JobSubscription {
    email: string
    tag: string
}

interface JobState {
    jobs: Job[];
    job: Job | null;
    jobSubscription: JobSubscription | null;
    page: number;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    jobs: [],
    job: null,
    jobSubscription: null,
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
};

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async ({ page = 1, limit = 10 }: { page: number; limit?: number }) => {
        const response = await axios.get(`/api/jobs?page=${page}&limit=${limit}`);
        return response.data;
    }
);

export const getJob = createAsyncThunk("jobs/getJob", async (id: any) => {
    const response = await axios.get(`/api/jobs/${id}`);
    return response.data;
})

export const createJob = createAsyncThunk<Job, FormData>(
    "jobs/createJob",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/jobs", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateJob = createAsyncThunk("jobs/updateJob", async (job: Job) => {
    const response = await axios.put(`/api/jobs/${job.id}`, job);
    return response.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id: string) => {
    await axios.delete(`/api/jobs/${id}`);
    return id;
});

export const getJobSubscriptions = createAsyncThunk("", async ({email, tag}: {email: string, tag: string}) => {
    const response = await axios.get(`/api/jobSubscriptions?email=${email}&tag=${tag}`)
    return response.data
})

export const jobSubscription = createAsyncThunk("jobs/jobSubscription", async (data: { email: string; jobTag: string }) => {
    const { email, jobTag } = data;

    if (!email || !jobTag) {
        throw new Error("Email and jobTag are required");
    }

    try {
        const exists = await axios.post("/api/jobSubscriptions", { email, jobTag });

        if (exists) {
            return { message: "Already subscribed" };
        }

        const sub = await axios.post("/api/job-subscriptions", { email, jobTag });

        return sub;
    } catch (err) {
        throw new Error("Failed to subscribe");
    }
})

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        resetJobs: (state) => {
            state.jobs = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                const newJobs = action.payload.filter(
                    (job) => !state.jobs.some((existingJob) => existingJob.id === job.id)
                );

                state.page += 1;
                state.hasMore = newJobs.length > 0;
                state.loading = false;
                state.jobs.push(...newJobs);
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch jobs";
            })
            .addCase(getJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJob.fulfilled, (state, action: PayloadAction<Job>) => {
                state.loading = false;
                state.job = action.payload;
            })
            .addCase(getJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch job";
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
            })

            .addCase(getJobSubscriptions.fulfilled, (state, action: PayloadAction<JobSubscription>) => {
                state.jobSubscription = action.payload
            });
    },
});

export const selectJobs = (state: RootState) => state.job.jobs
export const selectJob = (state: RootState) => state.job.job
export const selectJobSubscription = (state: RootState) => state.job.jobSubscription

export const { resetJobs } = jobSlice.actions;

export default jobSlice.reducer;