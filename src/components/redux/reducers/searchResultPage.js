import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResultData = createAsyncThunk(
  "fetchSearchResultData",
  async (searchData) => {
    let searchResult;
    // console.log(searchData);
    switch (searchData.type) {
      case "full": {
        searchResult = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchData.query}&page=${searchData.pageNo}`
        ).then((response) => response.json());
        break;
      }
      case "short": {
        searchResult = await fetch(
          `https://api.jikan.moe/v4/anime?limit=5&q=${searchData.query}`
        ).then((response) => response.json());
        break;
      }
    }

    // console.log(searchResult);

    return searchResult;
  }
);

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResultData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearchResultData.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchSearchResultData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default searchResultSlice.reducer;
