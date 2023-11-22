
import { Link, Outlet } from 'react-router-dom';
import './App.css';






function App() {
  

  return (
    <div className='App'>
      <Link to="/" className='heading'>
        <span className='heading'>Prognoza</span>
      </Link>
      <Outlet/>
      <div className='footer'></div>
    </div>

  );
}


export default App;
