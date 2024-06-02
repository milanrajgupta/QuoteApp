import { createSlice } from "@reduxjs/toolkit";

const quoteSlice=createSlice({
    name:"quote",
    initialState:{
        allUserQuote:[]
    },
    reducers:{
        setallUserQuote(state,value){
           state.allUserQuote.push(value.payload)
        }
    }
})

export const {setallUserQuote}=quoteSlice.actions;
export default quoteSlice.reducer;