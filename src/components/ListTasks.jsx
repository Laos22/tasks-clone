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
  const [task, setTask] = useState({ name: "", description: "", date: "" });
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

  const blurTimeoutRef = useRef(null); // Добавляем ref для таймаута
  return (
    <div
      key={list.id}
      className="mx-auto w-full min-w-98 max-w-192 h-fit border border-gray-300 bg-white flex flex-col rounded-lg shadow-md hover:shadow-[8px_0px_10px_-2px_rgba(0,0,0,0.2)] transition-shadow duration-300"
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
                onClick={() =>
                  alert("нужно сделать возможность переименовывать список")
                }
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full"
              >
                Переименовать
              </button>
              <button
                onClick={() => dispatch(deleteList({ id: list.id }))}
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full text-red-500"
              >
                Удалить список
              </button>
              <button
                onClick={() =>
                  alert("нужно сделать возможность очищать список")
                }
                className="w-full hover:bg-gray-200 text-left p-2 rounded-full"
              >
                Очистить список
              </button>
              <button
                onClick={() =>
                  alert("нужно удалить все выполненные задачи из этого списка")
                }
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
      <div className={isListMenuOpen ? "overflow-hidden" : "overflow-y-auto"}>
        <ul>
          {isAddingTask && (
            <li>
              <form
                className="p-4 bg-gray-100 rounded flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    addTask({
                      name: task.name,
                      description: task.description,
                      listID: list.id,
                      date: task.date,
                    }),
                  );
                  setIsAddingTask(false);
                  setTask({ name: "", description: "", date: "" });
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    dispatch(
                      addTask({
                        name: task.name,
                        description: task.description,
                        listID: list.id,
                        date: task.date,
                      }),
                    );
                    setIsAddingTask(false);
                    setTask({ name: "", description: "", date: "" });
                  }
                }}
              >
                <input
                  type="text"
                  value={task.name}
                  placeholder="Название задачи"
                  autoFocus
                  onChange={(e) => setTask({ ...task, name: e.target.value })}
                  className="w-full p-2 border rounded bg-white"
                />
                <input
                  type="textarea"
                  value={task.description}
                  placeholder="Дополнительная информация"
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-white"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onMouseDown={() => clearTimeout(blurTimeoutRef.current)} // Отменяем таймаут при нажатии
                    onClick={() => {
                      const today = new Date().toISOString().split("T")[0];
                      setTask({ ...task, date: today });
                    }}
                    className={`px-3 py-1 text-xs border rounded-full transition-colors ${
                      task.date === new Date().toISOString().split("T")[0]
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Сегодня
                  </button>
                  <button
                    type="button"
                    onMouseDown={() => clearTimeout(blurTimeoutRef.current)} // Отменяем таймаут при нажатии
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      const dateStr = tomorrow.toISOString().split("T")[0];
                      setTask({ ...task, date: dateStr });
                    }}
                    className={`px-3 py-1 text-xs border rounded-full transition-colors ${
                      task.date ===
                      new Date(Date.now() + 86400000)
                        .toISOString()
                        .split("T")[0]
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Завтра
                  </button>
                  <input
                    type="date"
                    onMouseDown={() => clearTimeout(blurTimeoutRef.current)} // Отменяем таймаут при нажатии
                    value={task.date}
                    onChange={(e) => setTask({ ...task, date: e.target.value })}
                    className="text-xs p-1 border rounded bg-white text-gray-600 outline-none cursor-pointer hover:bg-gray-50"
                  />
                </div>
                <div className="flex justify-end">
                  {/* Добавляем явную кнопку для сохранения задачи */}
                  <button type="submit" onMouseDown={() => clearTimeout(blurTimeoutRef.current)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Добавить задачу</button>
                </div>
              </form>
            </li>
          )}
          {tasks[0]?.tasks
            .filter((task) => task.listID === list.id && !task.isCompleted)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </ul>
        <div className="flex items-center justify-between px-4 py-2">
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
            {tasks[0]?.tasks
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
