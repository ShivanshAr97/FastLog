import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import textService from "./textService.js";

// const text = JSON.parse(localStorage.getItem('text'))

const initialState = {
  texts: "",
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

export const updateText = createAsyncThunk(
  "texts/update",
  async (id, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;
      const {text} = updateText
      await textService.updateText(text, token);
    } 
    catch (error) {
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

export const getTexts = createAsyncThunk(
  "texts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      let a = await textService.getTexts(token);
      return a;
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

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    reset: (state) => {
      state.texts = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
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
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getTexts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTexts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.texts = action.payload;
      })
      .addCase(getTexts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateText.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateText.fulfilled, (state, action) => {
        const updatedText = action.payload;
        const textsArray = JSON.parse(state.texts); // Parse the string into an array of objects
        const index = textsArray.findIndex(textItem => textItem._id === action.payload.id);
        if (index !== -1) {
          // Found the item, update its text
          textsArray[index].text = updatedText;
          state.texts = JSON.stringify(textsArray); // Convert the array of objects back to a string
        }
        state.isLoading = false;
        state.isSuccess = true;
      })
      
    
      .addCase(updateText.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = textSlice.actions;
export default textSlice.reducer;
