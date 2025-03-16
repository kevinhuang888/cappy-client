import Home from './components/home/Home'
import Goals from './components/goals/Goals'
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react'

function App() {
  const [stars,setStars] = useState(0)

  return (
    <div className="App">
      <Router>
        <Routes>     
          <Route path="/" element={<Home stars={stars} />} />
          <Route path="/goals" element={<Goals stars={stars} setStars={setStars} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
