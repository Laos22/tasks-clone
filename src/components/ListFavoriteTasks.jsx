import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTask } from "../store/tasksSlice";
import TaskCard from "./TaskCard";


const ListFavoriteTasks = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskName, setTaskName] = useState('');
    const isFavoritesVisible = useSelector(state => state.ui.isFavoritesVisible);
    const [isCompletedOpen, setIsCompletedOpen] = useState(false);
    
    return (
    <div
      className="mx-auto w-full min-w-98 max-w-192 h-fit bg-white flex flex-col rounded-lg shadow-md"
    >
      <div className="py-2 px-4 border-b border-gray-300 flex items-start justify-between">
        <h1>Помеченные задачи</h1>
        <button
        //   onClick={() => dispatch(deleteList({ id: list.id }))}
          className="p-1 rounded hover:bg-gray-200 "
        >
          Меню
        </button>
      </div>
      <button
        onClick={() => setIsAddingTask(true)}
        className="p-2 m-2 bg-gray-100 rounded hover:bg-gray-200 "
      >
        Добавить задачу
      </button>
      <div className="p-4 overflow-y-auto">
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
              />
            </li>
          )}
          {tasks[0].tasks
            .filter((task) => task.isFavorite === true)
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
              .filter((task) => task.isFavorite === true && task.isCompleted)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListFavoriteTasks;

