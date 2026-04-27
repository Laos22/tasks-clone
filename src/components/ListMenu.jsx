import { toggleCheckboxList, addList } from "../store/listsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleListMenu } from "../store/uiSlice";

const ListMenu = () => {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");
  const isMenuOpen = useSelector((state) => state.ui.isListMenuOpen);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="m-2 text-xl">Списки</h2>
        <button onClick={() => dispatch(toggleListMenu())}>
          {isMenuOpen ? "▲" : "▼"}
        </button>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
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
                  <form
                    className="flex items-center gap-2 w-full"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (listName.trim() !== "") {
                        dispatch(addList({ name: listName }));
                        setIsAddingList(false);
                        setListName("");
                      }
                    }}
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
                      autoFocus
                      onChange={(e) => setListName(e.target.value)}
                    />
                  </form>
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
      <button
        onClick={() => {
          if (!isMenuOpen) dispatch(toggleListMenu());
          setIsAddingList(true);
        }}
        className="bg-gray-200 mt-2 py-2 px-4 rounded hover:bg-gray-300"
      >
        Добавить список
      </button>
    </div>
  );
};

export default ListMenu;
