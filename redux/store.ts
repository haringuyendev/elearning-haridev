// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import CartSlices from "./reducer/CartSlices";
import UserSlices from "./reducer/UserSlices";
import QuizSlices from "./reducer/QuizSlices";
import CourseSlices from "./reducer/CourceSlices";
import LessonSlices from "./reducer/LessonSlices";
import ClassSlices from "./reducer/ClassSlices";
import CategorySlices from "./reducer/CategorySlices";
import ModalSlices from "./reducer/ModalSlices";
import UiSlices from "./reducer/UiSlices";

// ✅ Step 1: Combine all slices
const rootReducer = combineReducers({
  cart: CartSlices,
  user: UserSlices,
  quiz: QuizSlices,
  course: CourseSlices,
  lesson: LessonSlices,
  class: ClassSlices,
  category: CategorySlices,
  modal: ModalSlices,
  ui: UiSlices,
});

// ✅ Step 2: persistReducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "ui"], // chỉ lưu 3 slice này
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Step 3: Configure store
const store = configureStore({
  reducer: persistedReducer, // Dùng persistedReducer ở đây
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
