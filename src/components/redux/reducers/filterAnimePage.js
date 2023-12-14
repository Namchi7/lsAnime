import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilteredAnime = createAsyncThunk(
  "fetchFilteredAnime",
  async (filters) => {
    console.log(filters);
    let filterString = "";

    if (filters.startDate !== "" && filters.startDate !== undefined) {
      filterString += `&start_date=${filters.startDate}`;
    }
    if (filters.endDate !== "" && filters.endDate !== undefined) {
      filterString += `&end_date=${filters.endDate}`;
    }
    if (filters.status !== "" && filters.status !== undefined) {
      filterString += `&status=${filters.status}`;
    }
    if (filters.rating !== "" && filters.rating !== undefined) {
      filterString += `&rating=${filters.rating}`;
    }
    if (filters.minScore !== null && filters.minScore !== undefined) {
      filterString += `&min_score=${filters.minScore}`;
    }
    if (filters.type !== "" && filters.type !== undefined) {
      filterString += `&type=${filters.type}`;
    }
    if (filters.orderBy !== "" && filters.orderBy !== undefined) {
      filterString += `&order_by=${filters.orderBy}`;
    }
    if (filters.sortBy !== "" && filters.sortBy !== undefined) {
      filterString += `&sort=${filters.sortBy}`;
    }
    // console.log(filterString, filters.genres);
    // console.log(filterString);

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
