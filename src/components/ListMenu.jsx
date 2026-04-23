import { toggleCheckboxList, addList, selectLists } from "../store/listsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";

const ListMenu = () => {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");
  const listNameRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="m-2 text-xl">Списки</h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "▲" : "▼"}
        </button>
      </div>
      <div>
        <div>
          {isMenuOpen ? (
            <ul>
              {lists.lists.map((list) => (
                <li
                  key={list.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
                  onClick={() => {
                    dispatch(toggleCheckboxList({ listId: list.id }));
                  }}
                >
                  <input
                    type="checkbox"
                    className="m-2"
                    readOnly
                    checked={lists.activeList.id.includes(list.id)}
                  />
                  {list.name}
                </li>
              ))}
              {isAddingList && (
                <li className="flex items-center gap-2 p-2">
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
                      setListName("");
                    }}
                  />
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
      <button
        onClick={() => setIsAddingList(true)}
        className="bg-green-500 text-white m-2 py-2 px-4 rounded hover:bg-green-600"
      >
        Добавить список
      </button>
    </div>
  );
};

export default ListMenu;
