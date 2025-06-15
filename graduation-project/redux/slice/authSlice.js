import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/login",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 
    return response.data;
  } catch (error) {
    

    if (error.response) {
      

      return error.response.data;
    }
  }
});
// export const verifyEmail = createAsyncThunk(
//   "/auth/verifyEmail",
//   async (formData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/auth/verify-email",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // 
//       return response.data;
//     } catch (error) {
//       

//       if (error.response) {
//         

//         return error.response.data;
//       }
//     }
//   }
// );

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.get("http://localhost:4000/api/auth/logout", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:4000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

// export const sendMail = createAsyncThunk("/auth/sendmail", async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/v1/sendmail",
//     formData,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data;
// });
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 
      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
// export const updatePassword = createAsyncThunk(
//   "/auth/updata-passowrd",
//   async (formData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/auth/update-password",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // 
//       return response.data;
//     } catch (error) {
//       

//       if (error.response) {
//         // 
//         return error.response.data;
//       }
//     }
//   }
// );
export const personal_information_update = createAsyncThunk(
  "/dashbboard/personal_information_update",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/personal_information_update`,
        formData,
        {
          withCredentials: true,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );
      ;

      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const change_password = createAsyncThunk(
  "/dashbboard/change_password",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/change_password`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ;

      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const forget_password = createAsyncThunk(
  "/dashbboard/forget_password",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/forget_password`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ;

      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const verify_code = createAsyncThunk(
  "/dashbboard/verify_code",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/verify_code`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const reset_password = createAsyncThunk(
  "/reset_password",
  async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/reset_password`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rest: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        // 
        // 
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = true;
      }),
      builder.addCase(registerUser.rejected, (state) => {
        // 
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
      builder.addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      }),
      builder.addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
      builder.addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
      builder.addCase(personal_information_update.pending, (state) => {}),
      builder.addCase(
        personal_information_update.fulfilled,
        (state, action) => {
          state.isLoading = false;
          // state.user = action.payload.success ? action.payload.user : null;
          // state.isAuthenticated = action.payload.success;
        }
      ),
      builder.addCase(personal_information_update.rejected, (state, action) => {
        
        state.isLoading = false;
      }),
      builder.addCase(change_password.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(change_password.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(change_password.rejected, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(forget_password.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(forget_password.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(forget_password.rejected, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(verify_code.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(verify_code.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(verify_code.rejected, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(reset_password.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(reset_password.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { rest } = authSlice.actions;

export default authSlice.reducer;

//   builder.addCase(loginUser.pending, (state) => {
//     state.isLoading = true;
//   }),
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       
//       
//       state.isLoading = false;
//       state.user = action.payload.success ? action.payload.user : null;
//       state.isAuthenticated = action.payload.success;
//     }),
//     builder.addCase(loginUser.rejected, (state, action) => {
//       
//       state.isLoading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//     }),
//     builder.addCase(logoutUser.fulfilled, (state) => {
//       state.isLoading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//     }),

//     builder.addCase(sendMail.pending, (state) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(sendMail.fulfilled, (state) => {
//       state.isLoading = false;
//     }),
//     builder.addCase(sendMail.rejected, (state) => {
//       state.isLoading = false;
//     }),
//     builder.addCase(verifyEmail.pending, (state) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(verifyEmail.fulfilled, (state) => {
//       state.isLoading = false;
//       state.isAuthenticated = true
//     }),
//     builder.addCase(verifyEmail.rejected, (state) => {
//       state.isLoading = false;
//       state.isAuthenticated = false;
//     }),
//     builder.addCase(updatePassword.pending, (state) => {
//       state.isLoading = true;
//     }),
//     builder.addCase(updatePassword.fulfilled, (state) => {
//       state.isLoading = false;
//       state.isAuthenticated = true
//     }),
//     builder.addCase(updatePassword.rejected, (state) => {
//       state.isLoading = false;
//     });
