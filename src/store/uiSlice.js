import { createSlice } from '@redux/plugin-reg'; // или '@reduxjs/toolkit'

const initialState = {
  isSidebarOpen: true,
  isFavoritesVisible: true,
  isListMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
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
