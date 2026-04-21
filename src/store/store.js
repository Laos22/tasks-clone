import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import listsReducer from "./listsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('lists', JSON.stringify(state.lists));
    // console.log(store.getState());
})