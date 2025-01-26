import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allAdmin: [],
    editData: {},
    singlePreviewImage: "./image/dummy.jpg",
    multiPreviewImage:[]
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setViewData(state, action) {
            state.allAdmin = action.payload;
        },
        setEditData(state,action){
            state.editData = action.payload;
        },
        setSinglePreviewImage(state, action) {
            state.singlePreviewImage = action.payload;
        },
        setMultiPreviewImage(state, action) {
            state.multiPreviewImage = action.payload;
        },
        cleanAllData(state, action) {
            console.log("check")
            state.editData = {};
            state.singlePreviewImage = "";
            state.multiPreviewImage = [];

        }
    }
});

export const { setViewData, setEditData, setSinglePreviewImage, setMultiPreviewImage ,cleanAllData} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
