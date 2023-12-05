import { FC, useState } from 'react';
import { getQuestions, resetQuestions } from '../../store/questionsSlice';

import { difficultyArray, categoriesArray, quantityQuestions } from '../../data/settings';

import { useAppDispatch } from '../../hooks/hooks';
import { IChangeCurrentScreen } from '../../interfaces/interfaces';


const GameSettings:FC<IChangeCurrentScreen> = ({changeCurrentScreen}) => {
    const dispatch = useAppDispatch();
    
    const [ difficultyArrayInputs, setDifficultyArrayInputs ] = useState<Record<string, boolean>>(
        {
            'easy': false,
            'medium': false,
            'hard': false
        }
    );

    const handledifficultyArrayChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const { name, checked } = event.target;
        setDifficultyArrayInputs({ ...difficultyArrayInputs, [name]: checked });
    };

    const [ categoriesArrayInputs, setCategoriesArrayInputs ] = useState<Record<string, boolean>>(
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

    const handleCategoriesArrayChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const { name, checked } = event.target;
        setCategoriesArrayInputs({ ...categoriesArrayInputs, [name]: checked });
    };

    const handleGameSettings = ():void => {
        let difficultyString: string = '';
        for (const key in difficultyArrayInputs) {
           if(difficultyArrayInputs[key]) difficultyString += key + ',';
        };
        difficultyString = difficultyString.slice(0, difficultyString.length-1);

        let categoriesString: string = '';
        for (const key in categoriesArrayInputs) {
           if(categoriesArrayInputs[key]) categoriesString += key + ',';
        };
        categoriesString = categoriesString.slice(0, categoriesString.length-1);

        let selectedQuantity: number = +(document.querySelector('input[name="amount"]:checked') as HTMLInputElement)?.value;
        
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
            <div className="flex items-center justify-center">
                <button onClick={handleGameSettings} className='btn'>
                    Start Quiz
                </button>
            </div>
        </div>
    )
};

export default GameSettings;