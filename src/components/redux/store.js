import { configureStore } from "@reduxjs/toolkit";

import landingPageReducer from "./reducers/landingPage.js";
import searchResultReducer from "./reducers/searchResultPage.js";
import viewAllAnimePageReducer from "./reducers/viewAllAnimePage.js";
import currentAnimeReducer from "./reducers/currentAnimePage.js";
import filterAnimeReducer from "./reducers/filterAnimePage.js";
import recommendationsReducer from "./reducers/recommendationsPage.js";

export const store = configureStore({
  reducer: {
    previewData: landingPageReducer,
    searchData: searchResultReducer,
    viewAllData: viewAllAnimePageReducer,
    currentAnime: currentAnimeReducer,
    filterData: filterAnimeReducer,
    recommendations: recommendationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
