
import { Link, Outlet } from 'react-router-dom';
import './App.css';






function App() {
  

  return (
    <div className='App'>
      <Outlet/>
      <div className='footer'></div>
    </div>

  );
}


export default App;
