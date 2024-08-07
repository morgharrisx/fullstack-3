import './App.css';

import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';



function App() {
  return (
    <div className="App">

      <NavScrollExample/>
     
      <ReusableButton text='Test First Button'></ReusableButton>

    </div>
  );
}

export default App;
