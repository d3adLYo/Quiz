import { FC } from "react";
import { IChangeCurrentScreen } from "../../interfaces/interfaces";

const StartMenu: FC<IChangeCurrentScreen> = ({changeCurrentScreen}) => {
    return(
        <div className='items-center wrapper justify-evenly'>
            <h1 className="text-5xl text-center">Quiz Game</h1>
            <button onClick={()=>{changeCurrentScreen('GameSettings')}} className="btn">
                Start
            </button>
            <button onClick={()=>{changeCurrentScreen('Profile')}} className="btn">
            Profile
            </button>
        </div>
    )
};

export default StartMenu;