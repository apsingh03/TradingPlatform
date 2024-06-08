import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;
const HOSTNAME = "http://localhost:8000";

export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/users/getAllUsers/`);
      return response.data;
    } catch (error) {
      console.log("getAllUsersAsync Error - ", error.response);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async ({ email, fullName, password }) => {
    try {
      console.log(`${HOSTNAME}/api/signUp/`);
      const response = await axios.post(`${HOSTNAME}/api/signUp/`, {
        email: email,
        fullName: fullName,
        password: password,
      });
      // console.log(" resopnse data " , response.data );
      return response.data;
    } catch (error) {
      console.log("createUserAsync Error - ", error.response);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/api/login/`, {
        email: email,
        password: password,
      });
      // console.log( response.data );
      return response.data;
    } catch (error) {
      console.log("loginUserAsync Error  ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: {
    isUserLogged:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).isUserLogged
        : null,
    id:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).id
        : null,
    fullName:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).fullName
        : null,
    email:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).email
        : null,
  },
};

export const authenticationSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(loginUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default authenticationSlice.reducer;
