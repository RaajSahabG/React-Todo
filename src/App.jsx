import { useState } from 'react'
import Navbar from './components/Navbar'
const { v4: uuidv4 } = require('uuid')

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    const id = e.target.name
    let index = todos.findIndex(item=>{      
      return item.id === id
    })
    

    const handleAdd = () => {
      setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }])
      setTodo('')
      console.log(todos)

    }
    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

    return (
      <>
        <Navbar />
        <div className='container mx-auto my-5 rounded-xl p-3 bg-violet-100  min-h-[80vh]'>

          <div className='addToDo'>
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input type="text" onChange={handleChange} value={todo} className='w-1/2' />
            <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 text-sm rounded-md mx-6'>Add</button>
          </div>
          <h1 className='text-lg font-bold'>Your To Do</h1>
          <div className='todos'>
            {todos.map(items => {


              return <div key={todo} className="todo flex w-1/2 justify-between">
                <input name={todo.id} type="checkbox" onChange={handleCheckBox} value={todo.isCompleted} />
                <div className={items.isCompleted ? "" : "line-through"}>{items.todo}</div>
                <div className="buttons flex gap-2">
                  <button onClick={handleEdit} className='bg-violet-800 p-2 rounded-md py-1 text-white hover:bg-violet-950'>Edit</button>
                  <button onClick={handleDelete} className='bg-violet-800 p-2 rounded-md py-1 text-white hover:bg-violet-950'>Delete</button>
                </div>
              </div>
            })}
          </div>

        </div>





      </>
    )
  }
}

  export default App
