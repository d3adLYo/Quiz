import { useState } from 'react';
import './App.css';
import StartMenu from './Components/StartMenu/StartMenu';
import Profile from './Components/Profile/Profile';
import GameSettings from './Components/GameSettings/GameSettings';
import QuestionsPanel from './Components/QuestionsPanel/QuestionsPanel';
import Result from './Components/Result/Result';


let screenObj = {
  StartMenu: (props) => <StartMenu {...props}/>,
  GameSettings: (props) => <GameSettings {...props}/>,
  QuestionsPanel: (props) => <QuestionsPanel {...props}/>,
  Result: (props) => <Result {...props}/>,
  Profile: (props) => <Profile {...props}/>,
};

function App() {
  
  const [currentScreen, setCurrentScreen] = useState('StartMenu');

  const CurrentPage = screenObj[currentScreen];

  return (
    <>
      {CurrentPage ? <CurrentPage changeCurrentScreen={(x)=>{setCurrentScreen(x)}}/> : null}
    </>
  );
}

export default App;
