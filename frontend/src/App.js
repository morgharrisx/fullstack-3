import './App.css';
import CardComponent from './Card/Card';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import ControlledCarousel from './Carousel/ControlledCarousel';



function App() {
  return (
    <div className="App">
        <NavScrollExample/>
        <ControlledCarousel></ControlledCarousel>
        <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
        <ReusableButton text='Test First Button'></ReusableButton>
   </div>
  );
}

export default App;
