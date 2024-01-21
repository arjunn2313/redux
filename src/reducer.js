import { createSlice } from "@reduxjs/toolkit";

export const UserSlicer = createSlice({
    name : 'user',
    initialState : {
        data : "",
    },
    reducers: {
        setUser: (state, action) => {
          state.data = action.payload
        },
        logout :(state,action) =>{
            state.data = ''
        }
    }
})
export const {setUser,logout} = UserSlicer.actions;
export default UserSlicer.reducer;