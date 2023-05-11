import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentAnimeData = createAsyncThunk(
  "fetchCurrentAnimeData",
  async (malId) => {
    const currentAnime = await fetch(
      `https://api.jikan.moe/v4/anime/${malId}`
    ).then((response) => response.json());

    // console.log(currentAnime);

    return currentAnime;
  }
);

const currentAnimeSlice = createSlice({
  name: "currentAnime",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentAnimeData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentAnimeData.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchCurrentAnimeData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default currentAnimeSlice.reducer;
