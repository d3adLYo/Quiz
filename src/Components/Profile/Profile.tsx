import { useState, FC } from 'react';
import Select, { StylesConfig } from 'react-select';
import Option from 'react-select'

import { categoriesArray } from '../../data/settings';
import { ICategoriesObj, IChangeCurrentScreen } from '../../interfaces/interfaces';
import { useAppSelector } from '../../hooks/hooks';

interface IReactSelectStyles {
    container?: StylesConfig['container'];
}

const styles: IReactSelectStyles = {
    container:(styles)=>{
        return {
            ...styles,
            fontSize: '1.5rem',
            lineHeight: '1.7'
        }
    },
}

const Profile: FC<IChangeCurrentScreen> = ({changeCurrentScreen}) => {
    let questions = useAppSelector(state => state.questions.profileStats);

    const [ selectValue, setSelectValue ] = useState<any>(categoriesArray[0]);

    const handleSelectChange = (selectValue: Option | null):void => {
        setSelectValue(selectValue)
    };

    const currentCategory = questions[selectValue.value as keyof ICategoriesObj];
    
    return (
        <div className='p-3 wrapper'>
            <Select options={categoriesArray} value={selectValue} onChange={handleSelectChange} styles={styles}/>
            <div className='flex flex-col gap-4 py-3 grow'>
                <div className="flex flex-col items-center justify-center gap-3 text-4xl font-bold">
                    <p className='text-center'>Total score</p>
                    <p className="flex items-center justify-center w-32 h-20 bg-yellow-400 rounded-lg">{currentCategory.easy.correct + currentCategory.medium.correct + currentCategory.hard.correct} / {currentCategory.easy.total + currentCategory.medium.total + currentCategory.hard.total}</p>
                </div>
                <div className="flex flex-wrap justify-around gap-4">
                    <p className="bg-green-400 difficulty-icon">
                        <span>Easy</span>
                        <span>{currentCategory.easy.correct} / {currentCategory.easy.total}</span>
                    </p>
                    <p className="bg-yellow-400 difficulty-icon">
                        <span>Medium</span>
                        <span>{currentCategory.medium.correct} / {currentCategory.medium.total}</span>
                    </p>
                    <p className="bg-red-500 difficulty-icon">
                        <span>Hard</span>
                        <span>{currentCategory.hard.correct} / {currentCategory.hard.total}</span>
                    </p>
                </div>
            </div>
            <button className='self-center btn' onClick={()=>{changeCurrentScreen('StartMenu')}}>
                Go back
            </button>
        </div>
    )
};

export default Profile;