import { createSlice } from "@reduxjs/toolkit";

let init = {
    singleProductId: "",
    categoryId: "",
    singleProductReview: null,
    singleProductSummary: null
}
const DataSlice = createSlice({
    name: "data",
    initialState: init,
    reducers: {
        changeSingleProductId: changeSingleProductIdFun,
        changeCategoryId: (state, action) => state.categoryId = action.payload,
        setSingleProductReview: setSingleProductReviewFun,
        setSingleProductSummary: setSingleProductSummaryFun
    }
})



function changeSingleProductIdFun(state, action) {
    state.singleProductId = action.payload;
}
function setSingleProductReviewFun(state, action) {
    state.singleProductReview = action.payload;
}
function setSingleProductSummaryFun(state, action) {
    state.singleProductSummary = action.payload;
}
export const { changeSingleProductId, changeCategoryId, setSingleProductReview, setSingleProductSummary } = DataSlice.actions;
export const dataReducer = DataSlice.reducer;