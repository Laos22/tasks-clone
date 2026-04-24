import { useSelector } from "react-redux";
import ListTasks from "./ListTasks";
import ListFavoriteTasks from "./ListFavoriteTasks";

const MainContent = () => {
  const lists = useSelector((state) => state.lists);
  const isFavoritesVisible = useSelector(
    (state) => state.ui.isFavoritesVisible,
  );

  return (
    <main className="flex-1 p-4 overflow-x-auto flex gap-4 ">
      {isFavoritesVisible && <ListFavoriteTasks />}
      {!isFavoritesVisible &&
       lists.lists.map(
        (list) =>
          lists.activeList.id.includes(list.id) && (
            <ListTasks key={list.id} list={list} />
          ),
      )}
    </main>
  );
};

export default MainContent;
