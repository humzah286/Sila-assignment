
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUser = createAsyncThunk(
    'api/user',
    async () => {
        try {
            // const response = await axios.get(`${BACKEND_URL}/api/getuser`) 
            const response = await axios({
                method: 'get', 
                url: `${BACKEND_URL}/api/getuser`,
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

export const updateUser = createAsyncThunk(
    'api/update_profile', 
    async (data: any) => {
        console.log('Sending data: ', data)
        try {
        const response = await axios({
            method: 'patch', 
            url: `${BACKEND_URL}/api/update_profile`,
            data: data,
            withCredentials: true,
        }) 
        
        console.log("res: ", response)
        return response;

        } catch (error: any) {
            console.log("error: ", error.response)
            return error.response;
        }
    }
);

const initialState = {
    status: "",
    message: "",
    email: "",
    first_name: "",
    last_name: "",
    country: "",
    gender: "", 
    phone: ""
} 

const userSlice = createSlice({
    name: "user", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
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
            // state = initialState;
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
            // state = initialState;
            console.log("state: ", state)
        })
        .addCase(updateUser.pending, (state, action) => {
            state.status = "pending"
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'success';
            // console.log("WORKING OK!")
            // console.log("action.payload UPDATE : ", action.payload)

            let response = action.payload;
            if (response == undefined) {
                state.status = 'failed';
                state.message = "Internal Server Error, Please try again later";
            } else
            if (response.status == 200) {
                state.status = 'success';
                state.message = response.data.message;
            } else if (response.status == 400) {
                state.status = 'failed';
                state.message = response.data.message;
            } else {
                state.status = 'failed';
                state.message = "Internal Server Error, Please try again later";
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.status = 'failed';
        })

    },
}); 

export default userSlice.reducer;


  