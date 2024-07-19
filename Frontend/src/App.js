import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AssessmentPage from './Pages/Assesment'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ScorePage from './Pages/Score'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/assessment' element={<AssessmentPage></AssessmentPage>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/score" element={<ScorePage></ScorePage>}></Route>
      </Routes>
    </div>
  )
}

export default App
