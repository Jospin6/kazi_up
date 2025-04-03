import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import jobReducer from './job/jobSlice'
import jobCategoryReducer from './jobCategory/jobCategorySlice'
import userReducer from './user/userSlice'
import userActivityReducer from './userActivity/userActivitySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        jobCategory: jobCategoryReducer,
        user: userReducer,
        userActivity: userActivityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch