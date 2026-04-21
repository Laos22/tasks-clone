import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { selectLists, addList} from "../store/listsSlice";
import { toggleCheckboxList } from "../store/listsSlice";

const Sidebar = ({ isOpenSidebar }) => {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState('');
  const listNameRef = useRef(null);


  return (
    <aside className={`bg-gray-100 border-r border-gray-300 overflow-y-auto ${isOpenSidebar ? 'w-64 p-4' : 'w-0'}`}>
        {lists.lists.length > 0 &&
        <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => alert('Добавление задачи')}>
        
            Добавить задачу
        </button>}
      <nav className="mt-6">
        <ul>
            {lists.lists.map(list => (
                <li 
                    key={list.id} 
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
                    onClick={() => {dispatch(toggleCheckboxList({ listId: list.id }))}}>
                    <input 
                        type="checkbox" 
                        className="m-2"
                        readOnly 
                        checked={lists.activeList.id.includes(list.id)} 
                    />
                    {list.name}
                    </li>
            ))}
            {isAddingList &&
            <li 
                    className="flex items-center gap-2 p-2"
                    >
                    <input 
                        type="checkbox" 
                        className="m-2"
                        readOnly 
                        checked={true} 
                    />
                    <input 
                        type="text" 
                        value={listName}
                        placeholder="Название списка"
                        ref={listNameRef}
                        autoFocus
                        onChange={(e) => setListName(e.target.value)}
                        onBlur={() => {
                            dispatch(addList({ name: listName }));
                            setIsAddingList(false);
                            setListName('');
                        }} 
                        />
                    </li>}
          <button 
            onClick={() => 
                setIsAddingList(true)
                
            }
            className="bg-green-500 text-white m-2 py-2 px-4 rounded hover:bg-green-600">
            Добавить список
            </button>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;