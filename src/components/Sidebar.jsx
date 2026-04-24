import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addList, toggleCheckboxList } from "../store/listsSlice";
import ListMenu from "./ListMenu";
import VisibleMenu from "./VisibleMenu";

const Sidebar = () => {
  const isOpenSidebar = useSelector(state => state.ui.isSidebarOpen);
  const lists = useSelector(state => state.lists);
  const dispatch = useDispatch();
  
  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 overflow-y-auto ${isOpenSidebar ? "w-64 p-4" : "w-0"}`}
    >
      {lists.lists.length > 0 && (
        <button
          className="bg-gray-200 text-white p-4 rounded-xl hover:bg-gray-300 flex items-center gap-2"
          onClick={() => alert("Добавление задачи")}
        >
          <span className="text-2xl">+</span>
          <span>Добавить задачу</span>
        </button>
      )}
      <VisibleMenu />
      <ListMenu />
    </aside>
  );
};

export default Sidebar;
