import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import jobReducer from './job/jobSlice'
import jobCategoryReducer from './jobCategory/jobCategorySlice'
import userReducer from './user/userSlice'
import userActivityReducer from './userActivity/userActivitySlice'
import employementTypeReducer from './employementType/employementTypeSlice'
import viewReducer from './views/viewSlice'
import appliedReducer from './applied/appliedSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        jobCategory: jobCategoryReducer,
        user: userReducer,
        userActivity: userActivityReducer,
        employementType: employementTypeReducer,
        view: viewReducer,
        applied: appliedReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch