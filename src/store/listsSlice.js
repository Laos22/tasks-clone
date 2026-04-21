import { createSlice } from "@reduxjs/toolkit";

const initialState = {lists: [{id: 1, name: "Список 1"}, {id: 2, name: "Список 2"}, {id: 3, name: "Список 3"}], activeList: {id: [1, 2]}};

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
        }

    }
})

export const selectLists = state => state.lists;
export const { toggleCheckboxList, addList } = listsSlice.actions;         
export default listsSlice.reducer;