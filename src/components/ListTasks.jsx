import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { selectLists, addList, deleteList } from "../store/listsSlice";
import { selectTasks, addTask } from "../store/tasksSlice";


const ListTasks = ({ list }) => {
    const lists = useSelector(selectLists);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskName, setTaskName] = useState('');
    const taskNameRef = useRef(null);


    return (
        <div key={list.id} className="m-auto w-full min-w-128  max-w-192 h-full bg-white flex flex-col">
                <div className="py-2 px-4 border-b border-gray-300 flex items-center justify-between">
                    <h1>{list.name}</h1>
                    <button
                        onClick={() => dispatch(deleteList({ id: list.id }))}
                        className="p-1 rounded hover:bg-gray-200 "
                    >
                        Меню
                        </button>
                </div>
                <button 
                    onClick={() => setIsAddingTask(true)}
                    className="p-2 m-2 bg-gray-100 rounded hover:bg-gray-200 ">
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
                                    ref={taskNameRef}
                                    autoFocus
                                    onChange={(e) => setTaskName(e.target.value)}
                                    onBlur={() => {
                                        dispatch(addTask({ name: taskName, listID: list.id }));
                                        setIsAddingTask(false);
                                        setTaskName('');
                                    }} 
                                    />
                            </li>
                        )}
                        {tasks[0].tasks.filter(task => task.listID === list.id).map(task => (
                            <li key={task.id}>{task.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default ListTasks;