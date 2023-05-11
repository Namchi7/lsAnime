import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilteredAnime = createAsyncThunk(
  "fetchFilteredAnime",
  async (filters) => {
    let filterString = "";

    if (filters.startDate !== "") {
      filterString += `&start_date=${filters.startDate}`;
    }
    if (filters.endDate !== "") {
      filterString += `&end_date=${filters.endDate}`;
    }
    if (filters.status !== "") {
      filterString += `&status=${filters.status}`;
    }
    if (filters.rating !== "") {
      filterString += `&rating=${filters.rating}`;
    }
    if (filters.minScore !== null) {
      filterString += `&min_score=${filters.minScore}`;
    }
    if (filters.type !== "") {
      filterString += `&type=${filters.type}`;
    }
    if (filters.orderBy !== "") {
      filterString += `&order_by=${filters.orderBy}`;
    }
    if (filters.sortBy !== "") {
      filterString += `&sort=${filters.sortBy}`;
    }
    // console.log(filterString, filters.genres);

    const filterData = await fetch(
      `https://api.jikan.moe/v4/anime?page=${filters.page}&genres=${filters.genres}${filterString}`
    ).then((response) => response.json());

    // console.log(filterData);

    return filterData;
  }
);

const filterAnimeSlice = createSlice({
  name: "filterData",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredAnime.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilteredAnime.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchFilteredAnime.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default filterAnimeSlice.reducer;
