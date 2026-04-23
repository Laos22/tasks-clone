import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);

    return (
        <li key={task.id}>
            <div className="flex items-center hover:bg-gray-100 rounded mb-2">
                <input type="checkbox" className="mr-4" />
                <span className="flex-1">{task.name}</span>
                    <button className="p-1 rounded hover:bg-gray-200 ">
                        ...
                    </button>
            </div>
        </li>
    );
};

export default TaskCard;