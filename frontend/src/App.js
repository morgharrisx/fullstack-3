import './App.css';
import Button from 'react-bootstrap/Button';

import ReusableButton from './ReusableButton/ReusableButton';


function App() {
  return (
    <div className="App">
      <h1>Fullstack Team 3</h1>
      <p>I'm Laila, I really love the outdoors and being in nature. I try to spend as much time out as possible. Currently training for a marathon on December! </p>
      <p>Hi, I'm Mehtap. I love playing volleyball, especially beach volleyball, which is very popular here in Barcelona. I enjoy staying active and meeting new people through sports </p>
      <p>Hey, I'm Shanice! I loveee all things music. Attending concerts, festivals and small intimate shows is my favourite thing to do in my free time 🎼 I'm very excited about producing our own music-related app!</p>
      <p>Hello, I'm Moge.I love exploring new restaurants because it allows me to discover new flavors. It’s also a fun way to spend time with friends and family.</p>
      
      <ReusableButton text='Test First Button'></ReusableButton>
    </div>
  );
}

export default App;
