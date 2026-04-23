import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { selectLists, addList } from "../store/listsSlice";
import { toggleCheckboxList } from "../store/listsSlice";
import ListMenu from "./ListMenu";

const Sidebar = ({ isOpenSidebar }) => {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");
  const listNameRef = useRef(null);

  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 overflow-y-auto ${isOpenSidebar ? "w-64 p-4" : "w-0"}`}
    >
      {lists.lists.length > 0 && (
        <button
          className="bg-gray-200 text-white py-6 px-4 rounded-xl hover:bg-gray-300"
          onClick={() => alert("Добавление задачи")}
        >
          Добавить задачу
        </button>
      )}
      <div className="flex flex-col gap-2 mt-8">
        <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300">
          <div className="flex items-center gap-2">Все задачи</div>
        </button>
        <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300">
          <div className="flex items-center gap-2">Помеченные</div>
        </button>
      </div>
      <ListMenu />
    </aside>
  );
};

export default Sidebar;
