import './App.css';

import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import BentoGrid from './BentoGrid/BentoGrid';



function App() {
  return (
    <div className="App">

      <NavScrollExample/>
     
      <ReusableButton text='Test First Button'></ReusableButton>

      <BentoGrid/>

    </div>
  );
}

export default App;
