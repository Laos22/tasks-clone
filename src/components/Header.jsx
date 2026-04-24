import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/uiSlice";






const Header = () => {
    const isOpenSidebar = useSelector(state => state.ui.isSidebarOpen);
    const dispatch = useDispatch();



  return (
    <header className="bg-gray-200 px-4 py-2 border-b border-gray-300 overflow-hidden flex items-center justify-between">
        <div className="flex gap-4 items-center">
            <button onClick={() => dispatch(toggleSidebar())} className="rounded-full p-2 bg-gray-100 hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
                </svg>
            </button>
            <h1>My App</h1>
        </div>
        <div>
            Профиль
        </div>
        
    </header>
  );
};

export default Header;