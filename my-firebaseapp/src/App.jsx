import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import Write from './components/Write.jsx';

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Write/>}></Route>
          <Route path="/write" element={<Write/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
