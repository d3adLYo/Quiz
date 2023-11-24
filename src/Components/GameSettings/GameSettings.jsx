import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getQuestions, resetQuestions } from '../../store/questionsSlice';

import { difficultyArray, categoriesArray, quantityQuestions } from '../../data/settings';


function GameSettings({changeCurrentScreen}){
    const dispatch = useDispatch();

    const [ difficultyArrayInputs, setDifficultyArrayInputs ] = useState(
        {
            'easy': false,
            'medium': false,
            'hard': false
        }
    );

    const handledifficultyArrayChange = (event) => {
        const { name, checked } = event.target;
        setDifficultyArrayInputs({ ...difficultyArrayInputs, [name]: checked });
    };

    const [ categoriesArrayInputs, setCategoriesArrayInputs ] = useState(
        {
            'music': false,
            'sport_and_leisure': false,
            'film_and_tv': false,
            'arts_and_literature': false,
            'history': false,
            'society_and_culture': false,
            'science': false,
            'geography': false,
            'food_and_drink': false,
            'general_knowledge': false
        }
    );

    const handleCategoriesArrayChange = (event) => {
        const { name, checked } = event.target;
        setCategoriesArrayInputs({ ...categoriesArrayInputs, [name]: checked });
    };

    const handleGameSettings = () => {
        let difficultyString = '';
        for (const key in difficultyArrayInputs) {
           if(difficultyArrayInputs[key]) difficultyString += key + ',';
        };
        difficultyString = difficultyString.slice(0, difficultyString.length-1);

        let categoriesString = '';
        for (const key in categoriesArrayInputs) {
           if(categoriesArrayInputs[key]) categoriesString += key + ',';
        };
        categoriesString = categoriesString.slice(0, categoriesString.length-1);

        let selectedQuantity = document.querySelector('input[name="amount"]:checked')?.value;
        
        if(difficultyString.length < 1 || categoriesString.length < 1 || !selectedQuantity) {
            alert('Select atleast 1 option from each field');
            return;
        }

        dispatch(resetQuestions());
        dispatch(getQuestions([difficultyString, categoriesString, selectedQuantity]));
        changeCurrentScreen('QuestionsPanel');
    };

    return (
        <div className='wrapper justify-evenly'>
            <div className="w-full flex justify-evenly gap-7 max-[600px]:flex-col max-[600px]:gap-0">
                <div className='flex flex-col gap-3 max-[600px]:gap-1'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl m-2 max-[600px]:m-0'>Select difficult:</h2>
                        {difficultyArray.map((elem)=>
                            <label key={elem.value} className='flex justify-between gap-2 text-lg'>
                                <p>{elem.label}</p>
                                <input type='checkbox' name={elem.value} onChange={handledifficultyArrayChange}/>
                            </label>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl m-2 max-[600px]:m-0'>Select quantity:</h2>
                        {quantityQuestions.map((elem)=>
                            <label key={elem} className='flex justify-between gap-2 text-lg'>
                                <p>{elem}</p>
                                <input type='radio' name='amount' value={elem}/>
                            </label>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl m-2 max-[600px]:m-0'>Select categories:</h2>
                    {categoriesArray.map((elem)=>
                        <label key={elem.value} className='flex justify-between gap-2 text-lg'>
                            <p>{elem.label}</p>
                            <input type='checkbox' name={elem.value} onChange={handleCategoriesArrayChange}/>
                        </label>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={handleGameSettings} className='btn'>
                    Start Quiz
                </button>
            </div>
        </div>
    )
};

export default GameSettings;