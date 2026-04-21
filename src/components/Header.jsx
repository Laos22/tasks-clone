const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-200 p-4 border-b border-gray-300 overflow-hidden flex justify-between">
        <div className="flex gap-4 items-center">
            <button onClick={toggleSidebar}>Menu</button>
            <h1>My App</h1>
        </div>
        <div>
            Профиль
        </div>
        
    </header>
  );
};

export default Header;