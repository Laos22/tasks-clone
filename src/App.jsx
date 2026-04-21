import { useState } from "react"
import './index.css'

import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Sidebar from "./components/Sidebar"

function App() {

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  }

  return (
    <div className="h-dvh w-dvw bg-gray-100 flex flex-col">
      <Header toggleSidebar={toggleSidebar} isOpenSidebar={isOpenSidebar} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpenSidebar={isOpenSidebar} />
        <MainContent />
      </div>
    </div>
  )
}

export default App
