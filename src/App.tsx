import { useState, FC } from 'react';
import './App.css';
import StartMenu from './Components/StartMenu/StartMenu';
import GameSettings from './Components/GameSettings/GameSettings';
import QuestionsPanel from './Components/QuestionsPanel/QuestionsPanel';
import Result from './Components/Result/Result';
import Profile from './Components/Profile/Profile';
import { IChangeCurrentScreen } from './interfaces/interfaces';


let screenObj: Record<string, FC<IChangeCurrentScreen>>= {
  StartMenu: (props) => <StartMenu {...props}/>,
  GameSettings: (props) => <GameSettings {...props}/>,
  QuestionsPanel: (props) => <QuestionsPanel {...props}/>,
  Result: (props) => <Result {...props}/>,
  Profile: (props) => <Profile {...props}/>,
};

function App() {
  
  const [currentScreen, setCurrentScreen] = useState<string>('StartMenu');

  const CurrentPage:FC<IChangeCurrentScreen> = screenObj[currentScreen];

  return (
    <>
      {CurrentPage && <CurrentPage changeCurrentScreen={(x: string)=>{setCurrentScreen(x)}}/>}
    </>
  );
}

export default App;
