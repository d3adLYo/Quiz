import { IInitialState, IResult, ICategoriesParams, ICategoriesObj } from '../interfaces/interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:IInitialState = {
    uncompletedQuestions:[],
    result:[],
    profileStats:{
        music:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        sport_and_leisure:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        film_and_tv:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        arts_and_literature:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        history:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        society_and_culture:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        science:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        geography:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        food_and_drink:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
        general_knowledge:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
        },
    },
    errorQuestions:'',
};

export const getQuestions = createAsyncThunk<IInitialState['uncompletedQuestions'], [string, string, number], {rejectValue: string}>('questions/getQuestions', async (settingsArray, thunkApi) => {
    const difficultyString = settingsArray[0];
    const categoriesString = settingsArray[1];
    const selectedQuantity = settingsArray[2];

    try {
        let response = await fetch(`https://the-trivia-api.com/v2/questions?difficulties=${difficultyString}&categories=${categoriesString}&limit=${selectedQuantity}`)
        let json = await response.json();
        return json;
    }
    catch(error){
        if(error instanceof TypeError) return thunkApi.rejectWithValue(error.message);  
    }
})

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addResult: (state, action:PayloadAction<IResult>) => {
            state.result.push(action.payload);
        },
        resetQuestions: (state) => {
            return state = {...state,
                uncompletedQuestions:[],
                result:[],
                errorQuestions:'',
            };
        },
        addProfileStats: (state, action:PayloadAction<Record<string, ICategoriesParams>>) => {
            let obj = action.payload;
            
            return Object.keys(obj).forEach((elem) => {
                let elem2 = elem as keyof ICategoriesObj;
                state.profileStats[elem2].easy.correct += obj[elem].easy.correct;
                state.profileStats[elem2].easy.total += obj[elem].easy.total;

                state.profileStats[elem2].medium.correct += obj[elem].medium.correct;
                state.profileStats[elem2].medium.total += obj[elem].medium.total;

                state.profileStats[elem2].hard.correct += obj[elem].hard.correct;
                state.profileStats[elem2].hard.total += obj[elem].hard.total;
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getQuestions.fulfilled,(state, action) => {
                state.uncompletedQuestions = action.payload;
            })
            .addCase(getQuestions.rejected,(state, action) => {
                if(action.payload)  state.errorQuestions = action.payload;
            })
    }
});

export const { addResult, resetQuestions, addProfileStats } = questionsSlice.actions;

export default questionsSlice.reducer;