import { useState } from 'react'
import './App.css'
import Column from './components/Column'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Column state={"PLANNED"} />
        <Column state={"ONGOING"} />
        <Column state={"DONE"} />
      </div>
    </>
  )
}

export default App
