
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = createAsyncThunk(
    'api/user',
    async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${BACKEND_URL}/api/user/get-user`,
                withCredentials: true,
            })

            console.log("res: ", response)
            return response;

        } catch (error) {
            return {
                "status": "No user found"
            }
        }
    }
);

export const createUser = createAsyncThunk(
    'api/user/create-account',
    async (data: any) => {
        console.log('Sending data: ', data)

        console.log("BACKEND_URL: ", BACKEND_URL)

        try {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_URL}/api/user/create-account`,
                data: data,
                // withCredentials: true,
            })

            console.log("res: ", response)
            return response;
        } catch (error: any) {

            console.log("error: ", error.response)
            return error.response;
        }
    }
);

export const loginUser = createAsyncThunk(
    'api/user/login',
    async (data: any) => {
        console.log('Sending data: ', data)
        try {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_URL}/api/user/sign-in`,
                data: data,
                // withCredentials: true,
            })

            console.log("res: ", response)
            return response;

        } catch (error: any) {
            console.log("error: ", error.response)
            return error.response;
        }
    }
);

export const logoutUser = createAsyncThunk(
    'api/logout',
    async () => {
        const response = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/logout`,
            withCredentials: true,
        })

        console.log("res: ", response)
        return response;
    }
);

const initialState = {
    status: "",
    message: "",
    email: "",
    name: "",
    country: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(createUser.fulfilled, (state, action: any) => {


                if (action.payload.status == 201) {
                    state.status = 'success';
                    state.message = 'Account created successfully';
                    state.email = action.payload.data.user.email;
                    state.name = action.payload.data.user.name;
                    state.country = action.payload.data.user.country;
                } else if (action.payload.status == 400) {
                    state.status = 'failed';
                    state.message = 'Account already exists';
                } else if (action.payload.status == 500) {
                    state.status = 'failed';
                    state.message = 'Internal server error';
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Internal server error';
            })

            .addCase(loginUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                if (action.payload.status == 200) {
                    state.status = 'success';
                    state.message = 'Login successful';
                    state.email = action.payload.data.user.email;
                    state.name = action.payload.data.user.name;
                    state.country = action.payload.data.user.country;
                } else if (action.payload.status == 400) {
                    state.status = 'failed';
                    state.message = 'Invalid email or password';
                } else if (action.payload.status == 500) {
                    state.status = 'failed';
                    state.message = 'Internal server error';
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Internal server error'
            })

            .addCase(getUser.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getUser.fulfilled, (state, action: any) => {
                state.status = 'success';
                if (action.payload.status == 200) {
                    console.log("action.payload : ", action.payload)
                    try {
                        state.first_name = action.payload.data.message.first_name;
                        state.last_name = action.payload.data.message.last_name;
                        state.email = action.payload.data.message.email;
                        state.phone = action.payload.data.message.phone_number;
                        state.country = action.payload.data.message.country;
                        state.gender = action.payload.data.message.gender;
                    }
                    catch (error) {
                        console.log("error: ", error)
                    }

                }
                console.log("WORKING OK!")
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
            })

            .addCase(logoutUser.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'success';
                console.log("WORKING OK!")
                state.first_name = "";
                state.last_name = "";
                state.email = "";
                state.gender = "";
                state.country = "";
                state.phone = "";
                console.log("state: ", state)
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.first_name = "";
                state.last_name = "";
                state.email = "";
                state.gender = "";
                state.country = "";
                state.phone = "";
                console.log("state: ", state)
            })
    },
});

export default userSlice.reducer;
