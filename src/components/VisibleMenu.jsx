import { use, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavoritesVisible } from "../store/uiSlice";


const VisibleMenu = () => {
  const isFavoritesVisible = useSelector((state) => state.ui.isFavoritesVisible);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2 mt-8">
      <button
        onClick={() => dispatch(toggleFavoritesVisible())}
        className={`w-full ${!isFavoritesVisible ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"} py-2 px-4 rounded-full hover:bg-gray-300`}
      >
        <div className="flex items-center gap-2">Все задачи</div>
      </button>
      <button
        onClick={() => dispatch(toggleFavoritesVisible())}
        className={`w-full ${isFavoritesVisible ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"} py-2 px-4 rounded-full hover:bg-gray-300`}
      >
        <div className="flex items-center gap-2">Помеченные</div>
      </button>
    </div>
  );
};

export default VisibleMenu;
