import { createSlice } from '@reduxjs/toolkit'


const init = {
    showMenu: true,
    them: "light",
}

const ThemSlice = createSlice({
    name: "them",
    initialState: init,
    reducers: {
        toggleMenu: (state, action) => {
            state.showMenu = action.payload;
            console.log('state.showMenu RRR ', state.showMenu)
        },
        changeThem: (state, action) => {
            state.them = (state.them == "light") ? "dark" : "light";
        }

    }
})

export const { toggleMenu, changeThem } = ThemSlice.actions;
const ThemReducers = ThemSlice.reducer;
export default ThemReducers;
