import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface EmployementType {
    id?: string;
    title: string;
}

interface EmployementTypeState {
    loading: boolean;
    employementTypes: EmployementType[];
    employementType: EmployementType | null;
    error: string | null;
}

const initialState: EmployementTypeState = {
    employementTypes: [],
    employementType: null,
    loading: false,
    error: null,
};

export const fetchEmployementTypes = createAsyncThunk("employementType/fetchEmployementTypes", async () => {
    const response = await axios.get("/api/employementType");
    return response.data;
});

export const getEmployementType = createAsyncThunk("employementType/getEmployementTypes", async (id: string) => {
    const response = await axios.get(`/api/employementType/${id}`);
    return response.data;
});

export const createEmployementTypes = createAsyncThunk("employementType/createEmployementTypes", async (data: EmployementType) => {
    const response = await axios.post("/api/employementType", data);
    return response.data;
});


const employementTypeSlice = createSlice({
    name: "employementType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployementTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployementTypes.fulfilled, (state, action: PayloadAction<EmployementType[]>) => {
                state.loading = false;
                state.employementTypes = action.payload;
            })
            .addCase(fetchEmployementTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch job employementType";
            })

            .addCase(getEmployementType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployementType.fulfilled, (state, action: PayloadAction<EmployementType>) => {
                state.loading = false;
                state.employementType = action.payload;
            })
            .addCase(getEmployementType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch job employementType";
            })
    },
})

export const selectEmployementTypes = (state: RootState) => state.employementType.employementTypes
export const selectEmployementType = (state: RootState) => state.employementType.employementType

export default employementTypeSlice.reducer;