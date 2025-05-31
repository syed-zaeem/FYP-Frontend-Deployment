import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  trendingTopics: [],
  channelWiseTrendingTopics: [],
  channels: [],
  channelSpecificTrendingTopics: [],
  loading: false,
  error: null,
};

export const getMostTrendingTopics = createAsyncThunk(
  "topics/mostTrendingTopics",
  async (data) => {
    console.log("The data for body of request is: ", data);
    const res = await fetch(
      "http://127.0.0.1:8000/most-frequent-entity-query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   start_date: "2020-05-01",
        //   end_date: "2024-12-31",
        //   limit: 5,
        // }),
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    console.log(response);

    return response;
  }
);

export const getChannelWiseTrendingTopics = createAsyncThunk(
  "topics/channelwiseTrendingTopics",
  async (data) => {
    const res = await fetch(
      "http://127.0.0.1:8000/most-frequent-entity-query-byChannel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    console.log(response);

    return response;
  }
);

export const getChannels = createAsyncThunk("topics/channels", async () => {
  const res = await fetch("http://127.0.0.1:8000/get_all_channels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  console.log(response);

  return response;
});

export const getChannelSpecificMostTredingTopics = createAsyncThunk(
  "topics/channelSpecificTrendingTopics",
  async (data) => {
    console.log("I am here")
    const res = await fetch(
      "http://127.0.0.1:8000/channel_wise_entity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("I am here after the channel wise most trending topics")

    const response = await res.json();

    console.log(response);

    return response;
  }
);

export const TopicsSlice = createSlice({
  name: "trendingTopics",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(getMostTrendingTopics.pending), (state) => {
        state.loading = true;
      })
      .addCase(
        createAction(getMostTrendingTopics.fulfilled),
        (state, action) => {
          state.loading = false;
          state.trendingTopics = action.payload;
          // console.log("The topics slice is: " , state.trendingTopics[0].data.length)
          // localStorage.setItem("trendingTopics", JSON.stringify(action.payload)); // Save to localStorage
        }
      )
      .addCase(
        createAction(getMostTrendingTopics.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(createAction(getChannelWiseTrendingTopics.pending), (state) => {
        state.loading = true;
      })
      .addCase(
        createAction(getChannelWiseTrendingTopics.fulfilled),
        (state, action) => {
          state.loading = false;
          console.log(
            "The channel wise trending topics payload is: ",
            action.payload
          );
          state.channelWiseTrendingTopics = action.payload;
          // console.log("The topics slice is: " , state.trendingTopics[0].data.length)
          // localStorage.setItem("trendingTopics", JSON.stringify(action.payload)); // Save to localStorage
        }
      )
      .addCase(
        createAction(getChannelWiseTrendingTopics.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(createAction(getChannels.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(getChannels.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The action payload after getting all channels are: ",
          action.payload.channels
        );
        state.channels = action.payload.channels;
      })
      .addCase(createAction(getChannels.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(getChannelSpecificMostTredingTopics.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(getChannelSpecificMostTredingTopics.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The action payload after getting channel specific trending topics are: ",
          action.payload
        );
        state.channelSpecificTrendingTopics = action.payload;
      })
      .addCase(createAction(getChannelSpecificMostTredingTopics.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default TopicsSlice.reducer;
