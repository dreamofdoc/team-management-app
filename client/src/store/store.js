import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import userReducer from '../slices/userSlice';
import teamReducer from '../slices/teamSlice';

// const persistConfig = {
//     key: "root",
//     storage,
// };

export const store = configureStore({
    reducer: {
        user: userReducer,
        team: teamReducer
    },
})

// export const persistor = persistStore(store);