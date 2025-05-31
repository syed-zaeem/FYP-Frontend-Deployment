import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
  loading: false,
  error: null,
};

export const registerNewUser = createAsyncThunk(
  "registerNewUser",
  async ({ data }, thunkAPI) => {
    console.log("The data for body of request is: ", data);
    const res = await fetch("https://fyp-backend-1-og5r.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await res.json();

    if (res.ok) {
      console.log("The response is ok");
      // navigate("/");
    } else {
      return thunkAPI.rejectWithValue(response);
    }

    console.log(response);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ data }, thunkAPI) => {
    console.log("The data for body of request is: ", data);
    const res = await fetch("https://fyp-backend-1-og5r.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await res.json();

    if (res.ok) {
      console.log("The response is ok");
      // navigate("/");
    } else {
      return thunkAPI.rejectWithValue(response);
    }

    console.log(response);

    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async ({ navigate }, thunkAPI) => {
    console.log("I am ready for logout.")
    const res = await fetch("https://fyp-backend-1-og5r.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    });

    const response = await res.json();

    if (response.message === "Logout successful") {
      console.log("Message of response is" , response.message)
      navigate("/Login");
    } else {
      return thunkAPI.rejectWithValue(response);
    }

    console.log(response);

    return response;
  }
);

const refreshToken = async () => {
  const res = await fetch("https://fyp-backend-1-og5r.onrender.com/refersh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });

  const response = await res.json();

  console.log("The response of refresh token is: " , response);

  return response;
};

export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
  const res = await fetch("https://fyp-backend-1-og5r.onrender.com/user", {
    credentials: "include",
  });

  const response = await res.json();

  console.log("The response for get user details:", response);

  if (response.detail == "Authentication credentials were not provided.") {
    const refreshTokenResponse = await refreshToken()
    if(refreshTokenResponse.message === "Access token refreshed successfully"){
      const newRes = await fetch("https://fyp-backend-1-og5r.onrender.com/user", {
        credentials: "include",
      });
    
      const newResponse = await newRes.json();

      console.log("The new response after refreshing token and get user details again is: " , newResponse)
      return newResponse;
    }
  }

  return response;
});

export const sendFeedback = createAsyncThunk("sendFeedback", async (data) => {
  console.log("The data for body of request is: ", data);
    const res = await fetch("https://fyp-backend-1-og5r.onrender.com/contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await res.json();

    console.log(response);

    return response;
})

export const updateUserDetails = createAsyncThunk("updateUserDetails", async (data) => {
  const res = await fetch("https://fyp-backend-1-og5r.onrender.com/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const response = await res.json();

  console.log(response);

  return response;
})

export const updateUserPassword = createAsyncThunk("updateUserPasswords", async (data) => {
  const res = await fetch("https://fyp-backend-1-og5r.onrender.com/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const response = await res.json();

  console.log(response);

  return response;
})

export const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(registerNewUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(registerNewUser.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The action payload after user registeration successfully is:",
          action.payload
        );
        state.loggedInUser = action.payload.user;
      })
      .addCase(createAction(registerNewUser.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(loginUser.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(loginUser.fulfilled), (state, action) => {
        state.loading = false;
        console.log("The payload of action is: ", action.payload);
        state.loggedInUser = action.payload.user;
      })
      .addCase(createAction(loginUser.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(sendFeedback.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(sendFeedback.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(sendFeedback.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(getUserDetails.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(getUserDetails.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The payload of action of get user details is: ",
          action.payload
        );
        state.loggedInUser = action.payload;
      })
      .addCase(createAction(getUserDetails.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(updateUserDetails.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateUserDetails.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The payload of action of updating user details is: ",
          action.payload
        );
        // state.loggedInUser = action.payload;
      })
      .addCase(createAction(updateUserDetails.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(updateUserPassword.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateUserPassword.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The payload of action of updating user password is: ",
          action.payload
        );
        // if(action.payload.message === "Previous password is incorrect"){
        //   alert("Your current password is incorrect.")
        // }
        // state.loggedInUser = action.payload;
      })
      .addCase(createAction(updateUserPassword.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(logoutUser.pending), (state) => {
        state.loading = true;
        console.log("Pending")
      })
      .addCase(createAction(logoutUser.fulfilled), (state, action) => {
        state.loading = false;
        console.log(
          "The payload of action of updating user password is: ",
          action.payload
        );
        // if(action.payload.message === "Previous password is incorrect"){
        //   alert("Your current password is incorrect.")
        // }
        // state.loggedInUser = action.payload;
        console.log("Fulfilled")
      })
      .addCase(createAction(logoutUser.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Rejected")
      })
      ;
  },
});

export default UserSlice.reducer;
