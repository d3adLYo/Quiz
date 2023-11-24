function StartMenu({changeCurrentScreen}){
    return(
        <div className='wrapper justify-evenly items-center'>
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