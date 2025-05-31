import { configureStore } from "@reduxjs/toolkit";
import TopicsSlice from "@/features/TopicsSlice";
import UserSlice from "@/features/UserSlice";

export const store = configureStore({
    reducer: {
        trendingTopics: TopicsSlice,
        users: UserSlice,
    }
})