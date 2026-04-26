import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { addList, deleteList } from "../store/listsSlice";
import { addTask } from "../store/tasksSlice";
import TaskCard from "./TaskCard";

const ListTasks = ({ list }) => {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const isFavoritesVisible = useSelector(
    (state) => state.ui.isFavoritesVisible,
  );
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);
  const listMenuRef = useRef(null);

  useEffect(() => {
    if (!isListMenuOpen) return;

    const handKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsListMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handKeyDown);
      document.body.style.overflow = "";
    };
  }, [isListMenuOpen]);

  const openListMenu = () => {
    alert(
      "нужно сделать меню с настройками отображения и кнопкой удаления списка",
    );
  };

  return (
    <div
      key={list.id}
      className="mx-auto w-full min-w-98 max-w-192 h-fit bg-white flex flex-col rounded-lg shadow-md"
    >
      <div className="py-2 px-4 border-b border-gray-300 flex items-start justify-between relative">
        <h1>{list.name}</h1>
        <button
          onClick={() => setIsListMenuOpen(!isListMenuOpen)}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 transition-transform duration-300`}
          >
            <path
              fillRule="evenodd"
              d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isListMenuOpen && (
          <>
            {/* Прозрачная подложка на весь экран */}
            <div
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => setIsListMenuOpen(false)}
            />
            {/* Само меню */}
            <div
              ref={listMenuRef}
              className="w-78 absolute flex flex-col right-2 top-10 bg-white border rounded-sm shadow-md z-20 p-2"
            >
              <div className="mb-2 border-b border-gray-300">
                <span className="text-xl">Сортировка по</span>
                <ul>
                  <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    Названию
                  </li>
                  <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    Времени исполнения
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => alert("нужно сделать возможность переименовывать список")}
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full">
                Переименовать
              </button>
              <button
                onClick={() => dispatch(deleteList({ id: list.id }))}
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full text-red-500"
              >
                Удалить список
              </button>
              <button
                onClick={() => alert("нужно сделать возможность очищать список")}
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full"
              >
                Очистить список
              </button>
              <button
                onClick={() => alert("нужно удалить все выполненные задачи из этого списка")}
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full"
              >
                Удалить все выполненные задачи
              </button>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setIsAddingTask(true)}
        className="p-2 m-2 bg-gray-100 rounded hover:bg-gray-200 "
      >
        Добавить задачу
      </button>
      <div
        className={`p-4 ${
          isListMenuOpen ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        <ul>
          {isAddingTask && (
            <li>
              <input
                type="text"
                value={taskName}
                placeholder="Название задачи"
                autoFocus
                onChange={(e) => setTaskName(e.target.value)}
                onBlur={() => {
                  dispatch(addTask({ name: taskName, listID: list.id }));
                  setIsAddingTask(false);
                  setTaskName("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(addTask({ name: taskName, listID: list.id }));
                    setIsAddingTask(false);
                    setTaskName("");
                  }
                }}
                className="w-full p-2 border rounded"
              />
            </li>
          )}
          {tasks[0].tasks
            .filter((task) => task.listID === list.id && !task.isCompleted)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </ul>
        <div className="flex items-center justify-between">
          <span>Выполненные задачи</span>
          <button
            onClick={() => setIsCompletedOpen(!isCompletedOpen)}
            className="p-1 rounded hover:bg-gray-200 "
          >
            {isCompletedOpen ? "▲" : "▼"}
          </button>
        </div>
        {isCompletedOpen && (
          <ul>
            {tasks[0].tasks
              .filter((task) => task.listID === list.id && task.isCompleted)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListTasks;
