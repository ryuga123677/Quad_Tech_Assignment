import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Routes,Route} from 'react-router-dom'
import { ItemList } from './pages/ItemList'
import { ItemDetail } from './components/ItemDetail'
import { BookTicket } from './components/BookTicket'
function App() {


  return (
    <>
    <Routes>
   
    <Route path='/' element={ <ItemList/>} />
    <Route path='details/:id' element={ <ItemDetail/>}/>
    <Route path='bookticket/:item' element={ <BookTicket/>}/>
    </Routes>
    </>
  )
}

export default App
