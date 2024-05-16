import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import textService from "./textService.js";

// const text = JSON.parse(localStorage.getItem('text'))

const initialState = {
  texts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createText = createAsyncThunk(
  "texts/create",
  async (textData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await textService.createText(textData, token);
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

export const deleteText = createAsyncThunk(
  "texts/delete",
  async (id, thunkAPI) => {
    try {
      // Extract the token from the Redux store
      const token = thunkAPI.getState().auth.user.token;

      // Call the deleteText service method with the id and token
      await textService.deleteText(id, token);

      // Return the id of the deleted text
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


export const getTexts = createAsyncThunk("texts/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await textService.getTexts(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    reset: state => {
      state.texts = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.texts.push(action.payload);
      })
      .addCase(createText.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getTexts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTexts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.texts = action.payload
      })
      .addCase(getTexts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.texts = state.texts.filter(
          (text) => text._id !== action.payload.id
        );
      })
      .addCase(deleteText.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = textSlice.actions;
export default textSlice.reducer;
