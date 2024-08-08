import './App.css';
import Footer from './Footer/Footer';
import CardComponent from './Card/Card';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import PlaylistItem from './PlaylistItem/PlaylistItem';

function App() {
  return (
    <div className="App">
      <h1>Fullstack Team 3</h1>
      <p>I'm Laila, I really love the outdoors and being in nature. I try to spend as much time out as possible. Currently training for a marathon on December! </p>
      <p>Hi, I'm Mehtap. I love playing volleyball, especially beach volleyball, which is very popular here in Barcelona. I enjoy staying active and meeting new people through sports </p>
      <p>Hey, I'm Shanice! I loveee all things music. Attending concerts, festivals and small intimate shows is my favourite thing to do in my free time 🎼 I'm very excited about producing our own music-related app!</p>
      <p>Hello, I'm Moge.I love exploring new restaurants because it allows me to discover new flavors. It’s also a fun way to spend time with friends and family.</p>
      <p>This is Zuzanna. Outside of work/studying, I am a DJ. I like listening to all forms of electronic music. From time to time I perform in venues in Berlin and Glasgow as my side hustle. </p>
      <p>Hi, I'm Morgan! I spend my free time reading and running my small business - Peach Perfect! I also love going to see new plays and musicals!</p>

   
      
      
      <NavScrollExample/>
      <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
      <ReusableButton text='Test First Button'></ReusableButton>
      <div className="playlist">
        <br></br>
        <PlaylistItem 
          songName="Song Title 1"
          album="Album Name 1"
          artist="Artist Name 1"
          views="1223"
          runtime="3:45"
          albumCover={null} // to be replaced with actual album cover url
        />
      </div>
      <Footer/>
    </div>

    
  );
}

export default App;
