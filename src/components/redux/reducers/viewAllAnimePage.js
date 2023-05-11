import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchViewAll = createAsyncThunk(
  "fetchViewAll",
  async (pageData) => {
    let viewAllData, pageNo;
    pageData.pageNo === null ? (pageNo = 1) : (pageNo = pageData.pageNo);
    // console.log(pageData.pageName);

    switch (pageData.pageName) {
      case "This Season": {
        viewAllData = await fetch(
          `https://api.jikan.moe/v4/seasons/now?page=${pageNo}`
        ).then((response) => response.json());
        break;
      }
      case "Upcoming Season": {
        viewAllData = await fetch(
          `https://api.jikan.moe/v4/seasons/upcoming?page=${pageNo}`
        ).then((response) => response.json());
        break;
      }
      case "Top Animes": {
        viewAllData = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${pageNo}`
        ).then((response) => response.json());
        break;
      }
    }

    return viewAllData;
  }
);

const viewAllAnime = createSlice({
  name: "viewAllData",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchViewAll.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchViewAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchViewAll.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default viewAllAnime.reducer;
