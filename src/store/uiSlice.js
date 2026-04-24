import { createSlice } from "@reduxjs/toolkit";

const savedUI = localStorage.getItem('ui');

const initialState = {
  isSidebarOpen: savedUI ? JSON.parse(savedUI).isSidebarOpen : true,
  isFavoritesVisible: savedUI ? JSON.parse(savedUI).isFavoritesVisible : false,
  isListMenuOpen: savedUI ? JSON.parse(savedUI).isListMenuOpen : true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleFavoritesVisible: (state) => {
      state.isFavoritesVisible = !state.isFavoritesVisible;
    },
    toggleListMenu: (state) => {
      state.isListMenuOpen = !state.isListMenuOpen;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleFavoritesVisible, toggleListMenu } = uiSlice.actions;
export default uiSlice.reducer;
