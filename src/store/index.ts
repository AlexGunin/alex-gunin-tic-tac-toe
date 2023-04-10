import { boardReducer } from "./reducers";
import { createStore } from "redux";

// @ts-ignore
export const store = createStore(boardReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export * from "./hooks";
export * from "./selectors";
