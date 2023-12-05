import { categoriesObj } from "../../data/settings";
import { resetQuestions, addProfileStats } from "../../store/questionsSlice";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ICategoriesObj, ICategoriesParams, IDifficultyObj } from "../../interfaces/interfaces";


const Result:FC<{changeCurrentScreen: (x:string)=>void}> = ({changeCurrentScreen}) => {
    const dispatch = useAppDispatch();

    const result = useAppSelector((state) => state.questions.result);
    
    let easy = {total: 0, correct: 0};
    let medium = {total: 0, correct: 0};
    let hard = {total: 0, correct: 0};
    result.forEach((elem)=>{
        if(elem.difficulty === 'easy'){
            easy.total += 1;
            elem.isCorrect ? easy.correct += 1 : easy.correct += 0;
        }
        else if(elem.difficulty === 'medium'){
            medium.total += 1;
            elem.isCorrect ? medium.correct += 1 : medium.correct += 0;
        }
        else{
            hard.total += 1;
            elem.isCorrect ? hard.correct += 1 : hard.correct += 0;
        }
    });

    let categoriesResultObj: Record<string, {name: string; correct: number; total: number}> = {};
    result.forEach((elem)=>{
        if(elem.category in categoriesResultObj){
            if(elem.isCorrect) categoriesResultObj[elem.category].correct += 1;
            categoriesResultObj[elem.category].total += 1;
        }
        else{
            categoriesResultObj[elem.category] = {name: '', total: 1, correct: 0};
            categoriesResultObj[elem.category].name = categoriesObj[elem.category as keyof ICategoriesObj];
            if(elem.isCorrect) categoriesResultObj[elem.category].correct += 1;
        }
    });

    let categoriesResultArray: {name: string; correct: number; total: number}[] = [];
    Object.values(categoriesResultObj).forEach((elem)=>{
        categoriesResultArray.push(elem);
    });

    let profileStatsObj: Record<string, ICategoriesParams> = {};
    result.forEach((elem)=>{
        if(elem.category in profileStatsObj){
            if(elem.isCorrect) profileStatsObj[elem.category][elem.difficulty as keyof IDifficultyObj].correct += 1;
            profileStatsObj[elem.category][elem.difficulty as keyof IDifficultyObj].total += 1;
        }
        else{
            profileStatsObj[elem.category] = {
                easy:{
                    correct:0, total: 0,
                },
                medium:{
                    correct:0, total: 0,
                },
                hard:{
                    correct:0, total: 0,
                },
            };
            if(elem.isCorrect) profileStatsObj[elem.category][elem.difficulty as keyof IDifficultyObj].correct += 1;
            profileStatsObj[elem.category][elem.difficulty as keyof IDifficultyObj].total += 1;
        }
    });
    dispatch(addProfileStats(profileStatsObj));

    return (
        <>
            <div className='wrapper'>
                <div className="h-[15%] max-[600px]:h-auto flex justify-around flex-wrap gap-4 max-[600px]:mb-2">
                    <p className="difficulty-icon bg-green-400 min-[600px]:py-0 mb-2">
                        <span>Easy</span>
                        <span>{easy.correct}/{easy.total}</span>
                    </p>
                    <p className="difficulty-icon bg-yellow-400 min-[600px]:py-0 mb-2">
                        <span>Medium</span>
                        <span>{medium.correct}/{medium.total}</span>
                    </p>
                    <p className="difficulty-icon bg-red-500 min-[600px]:py-0 mb-2">
                        <span>Hard</span>
                        <span>{hard.correct}/{hard.total}</span>
                    </p>
                </div>
                <div className="p-4 h-[50%] max-[600px]:h-auto flex items-center content-center justify-center gap-5 flex-wrap overflow-auto max-[600px]:overflow-visible max-[600px]:flex-grow">
                    {categoriesResultArray.map((elem, index) => {
                            return (
                                    <div key={index} className="text-2xl border-solid border-2 border-blue-300 rounded-md p-2 flex gap-3 max-[600px]:flex-col">
                                        <p>
                                            {elem.name}
                                        </p>
                                        <span className="border-solid border-l-2 border-blue-300 text-center pl-3 max-[600px]:border-t-2 max-[600px]:border-l-0">
                                            {elem.correct} / {elem.total}
                                        </span>
                                    </div>
                                )
                        })}
                </div>
                <div className="h-[25%] text-4xl font-bold flex flex-col items-center justify-center max-[600px]:mb-4">
                    <p className="text-center">Total score</p>
                    <p className="flex items-center justify-center w-32 h-20 bg-yellow-400 rounded-lg">{easy.correct + medium.correct + hard.correct} / {result.length}</p>
                </div>
                <button className="self-center btn" onClick={()=>{
                        changeCurrentScreen('StartMenu');
                        dispatch(resetQuestions());
                    }}>
                    Go to Menu
                </button>
            </div>
        </>
    )
};

export default Result;