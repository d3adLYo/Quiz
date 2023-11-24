import { useState } from 'react';
import Select from 'react-select';
import { useSelector } from "react-redux";

import { categoriesArray } from '../../data/settings';

const styles = {
    container:(styles)=>{
        return {
            ...styles,
            fontSize: '1.5rem',
            lineHeight: '1.7'
        }
    },
}

function Profile({changeCurrentScreen}){
    let questions = useSelector(state => state.questions.profileStats);

    const [ selectValue, setSelectValue ] = useState(categoriesArray[0]);

    const handleSelectChange = (selectValue) => {
        setSelectValue(selectValue)
    };

    const currentCategory = questions[selectValue.value];
    
    return (
        <div className='wrapper p-3'>
            <Select options={categoriesArray} value={selectValue} onChange={handleSelectChange} styles={styles}/>
            <div className='grow py-3 flex flex-col gap-4'>
                <div className="text-4xl font-bold flex flex-col items-center justify-center gap-3">
                    <p className='text-center'>Total score</p>
                    <p className="rounded-lg bg-yellow-400 w-32 h-20 flex items-center justify-center">{currentCategory.easy.correct + currentCategory.medium.correct + currentCategory.hard.correct} / {currentCategory.easy.total + currentCategory.medium.total + currentCategory.hard.total}</p>
                </div>
                <div className="flex justify-around flex-wrap gap-4">
                    <p className="difficulty-icon bg-green-400">
                        <span>Easy</span>
                        <span>{currentCategory.easy.correct} / {currentCategory.easy.total}</span>
                    </p>
                    <p className="difficulty-icon bg-yellow-400">
                        <span>Medium</span>
                        <span>{currentCategory.medium.correct} / {currentCategory.medium.total}</span>
                    </p>
                    <p className="difficulty-icon bg-red-500">
                        <span>Hard</span>
                        <span>{currentCategory.hard.correct} / {currentCategory.hard.total}</span>
                    </p>
                </div>
            </div>
            <button className='btn self-center' onClick={()=>{changeCurrentScreen('StartMenu')}}>
                Go back
            </button>
        </div>
    )
};

export default Profile;