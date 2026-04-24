import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import listsReducer from "./listsSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
        ui: uiReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('lists', JSON.stringify(state.lists));
    localStorage.setItem('ui', JSON.stringify(state.ui));
    // console.log(store.getState());
})