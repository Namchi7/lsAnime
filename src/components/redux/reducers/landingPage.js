import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPreview = createAsyncThunk("fetchPreview", async () => {
  const thisSeason = fetch(`https://api.jikan.moe/v4/seasons/now?limit=5`).then(
    (response) => response.json()
  );
  const upcoming = fetch(
    `https://api.jikan.moe/v4/seasons/upcoming?limit=5`
  ).then((response) => response.json());
  const top = fetch(`https://api.jikan.moe/v4/top/anime?limit=5`).then(
    (response) => response.json()
  );

  const [thisSeasonData, upcomingData, topData] = await Promise.all([
    thisSeason,
    upcoming,
    top,
  ]);

  const preview = {
    thisSeason: thisSeasonData,
    upcomingSeason: upcomingData,
    top: topData,
  };

  return preview;
});

const landingPageSlice = createSlice({
  name: "previewData",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPreview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPreview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPreview.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default landingPageSlice.reducer;
