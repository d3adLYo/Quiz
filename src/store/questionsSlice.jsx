import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    uncompletedQuestions:[],
    result:[],
    profileStats:{
        music:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        sport_and_leisure:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        film_and_tv:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        arts_and_literature:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        history:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        society_and_culture:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        science:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        geography:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        food_and_drink:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
        general_knowledge:{
            easy: {correct: 0,total: 0,},
            medium: {correct: 0,total: 0,},
            hard: {correct: 0,total: 0,},
            total: {correct: 0,total: 0,},
        },
    },
    errorQuestions:'',
};

export const getQuestions = createAsyncThunk('questions/getQuestions', async (settingsArray, thunkApi) => {
    const difficultyString = settingsArray[0];
    const categoriesString = settingsArray[1];
    const selectedQuantity = settingsArray[2];

    try {
        let response = await fetch(`https://the-trivia-api.com/v2/questions?difficulties=${difficultyString}&categories=${categoriesString}&limit=${selectedQuantity}`)
        let json = await response.json();
        return json;
    }
    catch(error){
       return thunkApi.rejectWithValue(error.message)
    }
})

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addResult: (state, action) => {
            state.result.push(action.payload);
        },
        resetQuestions: (state) => {
            return state = {...state,
                uncompletedQuestions:[],
                result:[],
                errorQuestions:'',
            };
        },
        addProfileStats: (state, action) => {
            let obj = action.payload;
            
            return Object.keys(obj).forEach((elem) => {
                state.profileStats[elem].easy.correct += obj[elem].easy.correct;
                state.profileStats[elem].easy.total += obj[elem].easy.total;

                state.profileStats[elem].medium.correct += obj[elem].medium.correct;
                state.profileStats[elem].medium.total += obj[elem].medium.total;

                state.profileStats[elem].hard.correct += obj[elem].hard.correct;
                state.profileStats[elem].hard.total += obj[elem].hard.total;
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getQuestions.fulfilled,(state, action) => {
                state.uncompletedQuestions = action.payload;
            })
            .addCase(getQuestions.rejected,(state, action) => {
                state.errorQuestions = action.payload;
            })
    }
});

export const { addResult, resetQuestions, addProfileStats } = questionsSlice.actions;

export default questionsSlice.reducer;