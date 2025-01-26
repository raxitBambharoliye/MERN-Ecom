import { createSlice } from "@reduxjs/toolkit";

let init = {
    singleProductId: "",
    categoryId:"",
}
const DataSlice = createSlice({
    name: "data",
    initialState: init,
    reducers: {
        changeSingleProductId: changeSingleProductIdFun,
        changeCategoryId: (state, action) => state.categoryId = action.payload,

    }
})



function changeSingleProductIdFun(state, action)  {
    state.singleProductId = action.payload;
}


export const { changeSingleProductId ,changeCategoryId} = DataSlice.actions;
export const dataReducer = DataSlice.reducer;