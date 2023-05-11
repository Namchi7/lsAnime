import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecommendations = createAsyncThunk(
  "fetchRecommendations",
  async (pageNo) => {
    // console.log(pageNo);
    const allData = await fetch(
      `https://api.jikan.moe/v4/recommendations/anime?page=${pageNo}`
    ).then((response) => response.json());

    return {
      data: allData.data,
      pagination: {
        current_page: pageNo,
        last_visible_page: allData.pagination.last_visible_page,
        has_next_page: allData.pagination.has_next_page,
      },
    };
  }
);

const recommendationsPageSlice = createSlice({
  name: "recommendations",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default recommendationsPageSlice.reducer;
