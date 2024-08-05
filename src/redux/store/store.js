import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import textReducer from "./textSlice";

const store = configureStore({
    reducer: {
        testSlice: testReducer,
        textSlice: textReducer,
    },
});

export default store;