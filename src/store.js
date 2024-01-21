import { configureStore } from "@reduxjs/toolkit";
import  userReducer from  './reducer';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist/es";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key :'root',
  storage,
}

const presistedReducer = persistReducer(persistConfig,userReducer)
 wwwwwwwwwwwwwwww

export const store =  configureStore({
    reducer: {
     user : presistedReducer 
    }   
  });

  export let persistor = persistStore(store)