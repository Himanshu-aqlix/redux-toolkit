import './App.css'
import Todos from './Components/Todos'
import  Addtodo  from './Components/addTodo'


function App() {
  return (
    <>
      <h1 style={{ color: "black", textDecoration: "underline", marginBottom: "40px" }}> Advance TODOS with Redux</h1>

      <Addtodo />
      <Todos/>
    </>
  )
}

export default App
