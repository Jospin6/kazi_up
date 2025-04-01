import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Company {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    location?: string;
    industry?: string;
    foundedYear?: number;
    employees?: number;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}

interface CompanyState {
    companies: Company[];
    company: Company | null
    loading: boolean;
    error: string | null;
}

const initialState: CompanyState = {
    companies: [],
    company: null,
    loading: false,
    error: null,
};

export const fetchCompanies = createAsyncThunk("companies/fetchCompanies", async () => {
    const response = await axios.get("/api/companies");
    return response.data;
});

export const getCompany = createAsyncThunk("companies/getCompany", async (id: string) => {
    const response = await axios.get(`/api/companies/${id}`);
    return response.data;
});

export const createCompany = createAsyncThunk("companies/createCompany", async (company: Omit<Company, "id">) => {
    const response = await axios.post("/api/companies", company);
    return response.data;
});

export const updateCompany = createAsyncThunk("companies/updateCompany", async (company: Company) => {
    const response = await axios.put(`/api/companies/${company.id}`, company);
    return response.data;
});

export const deleteCompany = createAsyncThunk("companies/deleteCompany", async (id: string) => {
    await axios.delete(`/api/companies/${id}`);
    return id;
});

const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
                state.loading = false;
                state.companies = action.payload;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch companies";
            })

            .addCase(getCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompany.fulfilled, (state, action: PayloadAction<Company>) => {
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch company";
            })

            .addCase(createCompany.fulfilled, (state, action: PayloadAction<Company>) => {
                state.companies.push(action.payload);
            })
            .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
                const index = state.companies.findIndex((company) => company.id === action.payload.id);
                if (index !== -1) {
                    state.companies[index] = action.payload;
                }
            })
            .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<string>) => {
                state.companies = state.companies.filter((company) => company.id !== action.payload);
            });
    },
});

export const selectCompanies = (state: RootState) => state.company.companies
export const selectCompany = (state: RootState) => state.company.company

export default companySlice.reducer;
