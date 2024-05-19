import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileService from "./fileService.js";

// const file = JSON.parse(localStorage.getItem('file'))

const initialState = {
  files: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createFile = createAsyncThunk(
  "files/create",
  async (fileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.createFile(fileData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/delete",
  async (id, thunkAPI) => {
    try {
      // Extract the token from the Redux store
      const token = thunkAPI.getState().auth.user.token;

      // Call the deleteFile service method with the id and token
      await fileService.deleteFile(id, token);

      // Return the id of the deleted file
      return id;
    } catch (error) {
      // Handle errors and return a rejected action with the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getFiles = createAsyncThunk("files/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    let a = await fileService.getFiles(token);
    // console.log(a);
    return a
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    reset: state => {
      state.files = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files.push(action.payload);
      })
      .addCase(createFile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.files = action.payload
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = state.files.filter(
          (file) => file._id !== action.payload.id
        );
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fileSlice.actions;
export default fileSlice.reducer;
