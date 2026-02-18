import { useState, useEffect, use } from 'react'
import Navbar from './components/Navbar'
// const { v4: uuidv4 } = require('uuid')
import {v4 as uuidv4} from 'uuid'
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
     try {
    const localTodos = JSON.parse(localStorage.getItem('todos'))
    if (localTodos) {
      setTodos(localTodos)
    }
  } catch (error) {
    console.error("Failed to parse todos from localStorage", error)
  }
  }, [])

  const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    const id = e.target.name
    let index = todos.findIndex(item=>{      
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos([...newTodos])
  }
    

    const handleAdd = () => {
      const newTodos = [...todos, { id: uuidv4(), todo: todo, isCompleted: false }]
      setTodos(newTodos)
      setTodo('')
      console.log(newTodos)
      saveToLocalStorage(newTodos);

    }
    const handleEdit = (e, id) => {
    let t = todos.filter(t=>t.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
      
    });
    setTodos(newTodos)
    saveToLocalStorage(newTodos);
  }


    const handleDelete = (e, id) => {

      const confirmDelete = window.confirm("Are you sure you want to delete this todo?")
      if(!confirmDelete){
        return
      } 
      console.log(`id is, ${id}`)
        let index = todos.findIndex(item=>{
        return item.id === id
      })
      let newTodos = todos.filter(item=>{
        return item.id !== id
      })
      setTodos(newTodos)
      saveToLocalStorage(newTodos);
    }

    return (
      <>
        <Navbar />
        <div className='container mx-w-2xl mx-auto my-5 rounded-xl p-3 bg-violet-100  min-h-[80vh]'>

          <div className='addToDo'>
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input type="text" onChange={handleChange} value={todo} className='w-full md:w-3/4 p-2 rounded border' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 text-sm rounded-md mx-6'>Add</button>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show todos
          <h1 className='text-lg font-bold'>Your To Do</h1>
          <div className='todos '>
            {todos.length === 0 && <div className='m-2'>No todos yet</div>}
            {todos.map(item => {


              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row sm:items-center w-full my-2 justify-between">
                <div className='flex items-center gap-4 flex-1 min-w-0'>
                <input name={item.id} type="checkbox" onChange={handleCheckBox} checked={item.isCompleted} />
                <div className={`break-words ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>

                </div>
                <div className="buttons flex gap-2 shrink-0">
                  <button onClick={(e) =>{handleEdit(e, item.id)}} className='bg-violet-800 p-2 rounded-md py-1 text-white hover:bg-violet-950'>Edit</button>
                  <button onClick={(e) =>{handleDelete(e, item.id)}} className='bg-violet-800 p-2 rounded-md py-1 text-white hover:bg-violet-950'>Delete</button>
                </div>
              </div>
            })}
          </div>

        </div>





      </>
    )
  }


  export default App
