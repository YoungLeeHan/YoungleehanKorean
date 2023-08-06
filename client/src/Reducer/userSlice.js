import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        displayName: "",
        uid: "",
        accessToken: "",
        photoURL: "",
        isLoading: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
            state.photoURL = action.payload.photoURL;
            state.isLoading = true;
        },

        clearUser: (state) => {
            state.displayName = "";
            state.uid = "";
            state.accessToken = "";
            state.photoURL = "";
            state.isLoading = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
