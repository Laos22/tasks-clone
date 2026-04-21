import { createSlice } from "@reduxjs/toolkit";

const initialState = {lists: [{id: 1, name: "Список 1"}, {id: 2, name: "Список 2"}, {id: 3, name: "Список 3"}], activeList: {id: [1, 2]}};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
})

export const selectLists = state => state.lists;         

export default listsSlice.reducer;