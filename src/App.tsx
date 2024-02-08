import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  TypingGame from "./TypingGame"
function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="App text-4xl">
    <TypingGame />
   </div>
  )
}

export default App
