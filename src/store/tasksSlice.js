import { createSlice } from "@reduxjs/toolkit";

// const initialState = [{tasks: [{id: 1, listID: 1, name: "Задача 1"}, {id: 2, listID: 1, name: "Задача 2"}, {id: 3, listID: 2, name: "Задача 3"}]}];
const savedTasks = localStorage.getItem('tasks');

const initialState = savedTasks ? JSON.parse(savedTasks) : [{tasks: []}];
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            if (action.payload.name.trim() === '') {
                return;
            }
            const newTask = {
                id: crypto.randomUUID(),
                ...action.payload,
            };
            state[0].tasks.push(newTask);
        },
        deleteTask: (state, action) => {
            state[0].tasks = state[0].tasks.filter(task => task.id !== action.payload.id);
        },
    }
});

export const selectTasks = state => state.tasks;
export const { addTask, deleteTask } = tasksSlice.actions;         

export default tasksSlice.reducer;