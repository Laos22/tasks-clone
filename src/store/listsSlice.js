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

        }

    }
})

export const selectLists = state => state.lists;
export const { toggleCheckboxList } = listsSlice.actions;         
export default listsSlice.reducer;