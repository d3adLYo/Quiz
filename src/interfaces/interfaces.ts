// Settings
export interface IDifficultyArray{
    value: string;
    label: string;
};

export interface IDifficultyObj{
    easy:string;
    medium:string;
    hard:string;
};

export interface ICategoriesArray{
    value: string;
    label: string;
};

export interface ICategoriesObj{
    music: string;
    sport_and_leisure: string;
    film_and_tv: string;
    arts_and_literature: string;
    history: string;
    society_and_culture: string;
    science: string;
    geography: string;
    food_and_drink: string;
    general_knowledge: string;
};

// redux

export interface ICategoriesParams {
    easy: {
        correct: number,
        total: number,
    };
    medium: {
        correct: number,
        total: number,
    };
    hard: {
        correct: number,
        total: number,
    };
};
interface IProfileStats {
    music: ICategoriesParams;
    sport_and_leisure: ICategoriesParams;
    film_and_tv: ICategoriesParams;
    arts_and_literature: ICategoriesParams;
    history: ICategoriesParams;
    society_and_culture: ICategoriesParams;
    science: ICategoriesParams;
    geography: ICategoriesParams;
    food_and_drink: ICategoriesParams;
    general_knowledge: ICategoriesParams;
};
export interface IResult {
    category: string;
    difficulty: string;
    isCorrect: boolean;
}
export interface IInitialState {
    uncompletedQuestions: {
        category: string,
        difficulty: string,
        question: {
            text: string
        },
        correctAnswer: string,
        incorrectAnswers: string[]
    }[];
    result: IResult[];
    profileStats: IProfileStats;
    errorQuestions: string;
};

// components

export interface IChangeCurrentScreen {
    changeCurrentScreen: (x:string) => void
}


