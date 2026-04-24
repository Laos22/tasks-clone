import './index.css'

import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Sidebar from "./components/Sidebar"
import { useSelector } from "react-redux"

function App() {
  return (
    <div className="h-dvh w-dvw bg-gray-100 flex flex-col">
      <Header/>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar/>
        <MainContent />
      </div>
    </div>
  )
}

export default App
