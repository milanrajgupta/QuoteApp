import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./Slices/authSlice";
import quoteSlice from "./Slices/quoteSlice";



const store=configureStore({
    reducer:{
       
        auth:authSlice,
        quote:quoteSlice

    }

})

export default store;