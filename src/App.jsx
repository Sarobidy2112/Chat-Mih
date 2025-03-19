import { useState } from 'react'
import Sidebar from './components/sidebar/sidebar'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import Chat from './components/Chat/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="bodyContent">
      <Sidebar />
      <div className="pages">
        <Navbar />
        <Chat />
      </div>
    </div>
  )
}

export default App
