import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteTask,
  toggleTaskFavorite,
  toggleTaskCompleted,
} from "../store/tasksSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  return (
    <li key={task.id}>
      <div className="flex items-start justify-between hover:bg-gray-100 pl-4 pr-2 py-2 rounded group">
        <input
          type="checkbox"
          className="mr-2 mt-1.5"
          checked={task.isCompleted}
          onChange={() => dispatch(toggleTaskCompleted(task.id))}
        />
        <div className="flex-1 flex flex-col gap-1">
          <div
            className={`flex-1 ${task.isCompleted ? "line-through text-gray-500" : ""}`}
          >
            {task.name}
          </div>
          <div
            className="text-sm text-gray-500 line-clamp-2"
            title={task.description}
          >
            {task.description}
          </div>
          {task.date && (
            <div className="text-xs text-gray-400">
              <button 
              className="px-2 py-1 rounded-full text-xs border transition-colors bg-white text-gray-600 hover:bg-gray-200"
              onClick={() => alert("нужно добавить возможность менят дату")}>
                {new Date(task.date).toLocaleDateString()}
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center hover:bg-gray-100 rounded p-1 gap-2">
          <button
            onClick={() => {
              confirm("Вы уверены, что хотите удалить эту задачу?") &&
              dispatch(deleteTask({ id: task.id }))}}
            className="p-1 rounded-full hover:bg-gray-200 invisible group-hover:visible"
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
          <button
            className={`p-1 rounded-full hover:bg-gray-200 ${task.isFavorite ? "visible" : "invisible group-hover:visible"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                task.isFavorite
                  ? "fill-blue-400 text-blue-400"
                  : "fill-none text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => dispatch(toggleTaskFavorite(task.id))}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
