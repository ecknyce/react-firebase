import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import Write from './components/Write.jsx';
import Read from './components/Read.jsx'; 
import UpdateRead from './components/UpdateRead.jsx';
import UpdateWrite from './components/UpdateWrite.jsx'; 

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Write/>}></Route>
          <Route path="/write" element={<Write/>}></Route>
          <Route path="/read" element={<Read/>}></Route>
          <Route path="/updateread" element={<UpdateRead/>}></Route>
          <Route path="/updatewrite/:firebaseId" element={<UpdateWrite/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
