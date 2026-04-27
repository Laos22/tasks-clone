import { createSlice } from "@reduxjs/toolkit";

const saveddLists = localStorage.getItem('lists');

const initialState = saveddLists ? JSON.parse(saveddLists) : {
    lists: [
        // { id: 1, name: 'Список 1' },
        // { id: 2, name: 'Список 2' },
    ],
    activeList: {
        id: [],
    }
};
const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: { 
        toggleCheckboxList: (state, action) => {
            const { listId } = action.payload;
            const isActive = state.activeList.id.includes(listId);

            if (isActive) {
                state.activeList.id = state.activeList.id.filter(id => id !== listId);
            } else {
                state.activeList.id.push(listId);
            }

        },
        addList: (state, action) => {
            if (action.payload.name.trim() === '') {
                return;
            }
            const newList = {
                id: crypto.randomUUID(),
                ...action.payload,
            };
            state.lists.push(newList);
            state.activeList.id.push(newList.id);
        },
        deleteList: (state, action) => {
            state.lists = state.lists.filter(list => list.id !== action.payload.id);
            state.activeList.id = state.activeList.id.filter(id => id !== action.payload.id);
            state.tasks = state.tasks?.tasks.filter(task => task.listId !== action.payload.id);
        },

    }
})

export const { toggleCheckboxList, addList, deleteList } = listsSlice.actions;         
export default listsSlice.reducer;