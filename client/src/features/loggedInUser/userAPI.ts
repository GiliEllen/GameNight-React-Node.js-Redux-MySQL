import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserJoi } from "./usersModel";

export const login = createAsyncThunk(
  "api/user/login",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/users/get-user");
      const { userCookie } = data;

      if (userCookie) {
        // navigate("/find-mentor");
        const { error } = UserJoi.validate(userCookie);
        if (error) throw error;
        return userCookie;
      }
    } catch (error:any) {
        console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);
