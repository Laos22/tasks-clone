import { useSelector, useDispatch } from "react-redux";
import { deleteList } from "../store/listsSlice";
import { useState, useRef } from "react";
import { addTask } from "../store/tasksSlice";
import ListTasks from "./ListTasks"; 


const MainContent = () => {
  const lists = useSelector(state => state.lists);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskName, setTaskName] = useState('');
  const taskNameRef = useRef(null);

  return (
    <main className="flex-1 p-4 overflow-x-auto flex gap-4 ">
        {lists.lists.map(list => (
            lists.activeList.id.includes(list.id) &&
            <ListTasks key={list.id} list={list} />
        ))}
       
    </main>
  );
};

export default MainContent;