import { Outlet } from 'react-router'
import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <h2>Hello world</h2>
      <Button>Click me</Button>
      <Outlet/>
      
    </>
  )
}

export default App
