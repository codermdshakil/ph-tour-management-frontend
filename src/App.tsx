import { Outlet } from 'react-router'
import './App.css'
import CommonLaylout from './components/layout/CommonLaylout'

function App() {

  return (
    <CommonLaylout>
      <Outlet/>
    </CommonLaylout>
  )
}

export default App
