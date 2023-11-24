import { memo } from "react";


function QuestionsSection({data, refData}){
    let answers = [...data.incorrectAnswers];
    let correctAnswer = data.correctAnswer;
    const randomIndex = Math.floor(Math.random() * 4);
    answers.splice(randomIndex, 0, correctAnswer);

    return answers.map((e, index)=>{
        return (    
            <button key={index} ref={index === randomIndex ? refData : null} className="class-for-interaction max-h-12 p-2 border-solid border-2 rounded text-2xl text-left overflow-auto border-blue-300 indent-2 leading-none max-[600px]:h-20 max-[600px]:max-h-min" title={e}>
                {e}
            </button>
        )
    })
};

export default memo(QuestionsSection);