import { createSlice } from "@reduxjs/toolkit";

const initialState = [{tasks: [{id: 1, listID: 1, name: "Задача 1"}, {id: 2, listID: 1, name: "Задача 2"}, {id: 3, listID: 1, name: "Задача 3"}]}];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
});

export const selectTasks = state => state.tasks;         

export default tasksSlice.reducer;