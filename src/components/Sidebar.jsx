import { useSelector } from "react-redux";
import { selectLists } from "../store/listsSlice";

const Sidebar = ({ isOpenSidebar }) => {
  const lists = useSelector(selectLists);

  return (
    <aside className={`bg-gray-100 border-r border-gray-300 overflow-y-auto ${isOpenSidebar ? 'w-64 p-4' : 'w-0'}`}>
        <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Добавить задачу
        </button>
      <nav className="mt-6">
        <ul>
            {lists.lists.map(list => (
                <li key={list.id} className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer">
                    <input type="checkbox" className="m-2" checked={lists.activeList.id.includes(list.id)} />
                    {list.name}
                    </li>
            ))}
          <button className="bg-green-500 text-white m-2 py-2 px-4 rounded hover:bg-green-600">
            Добавить список
            </button>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;