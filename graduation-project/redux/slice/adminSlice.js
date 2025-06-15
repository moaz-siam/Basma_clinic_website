import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  admin: null,
  isLoading: true,
  isError: null,
};

export const getAllUsers = createAsyncThunk(
  "/dashbboard/admin/get_users",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/admin/get_users`,
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
export const addUser = createAsyncThunk(
  "/dashbboard/admin/add_user",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/admin/add_user`,
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
export const activity_status = createAsyncThunk(
  "/dashbboard/admin/activity_status",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/admin/activity_status`,
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
export const update_user = createAsyncThunk(
  "/dashbboard/admin/update_user",
  async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/dashboard/admin/update_user`,
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
export const getAllDoctors = createAsyncThunk(
  "/dashbboard/admin/get_doctors",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/admin/get_doctors`,
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
export const addDoctor = createAsyncThunk(
  "/dashbboard/admin/add_doctor",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/admin/add_doctor`,
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
export const update_doctor = createAsyncThunk(
  "/dashbboard/admin/update_doctor",
  async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/dashboard/admin/update_doctor`,
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
export const getAllMD = createAsyncThunk(
  "/dashbboard/admin/medical_points",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/admin/medical_points`,
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
export const activity_status_md = createAsyncThunk(
  "/dashbboard/admin/activity_status_md",
  async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/dashboard/admin/activity_status_md`,
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
export const get_pharmacists = createAsyncThunk(
  "/dashbboard/admin/pharmacists",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/admin/pharmacists`,
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
export const add_medical_point = createAsyncThunk(
  "/dashbboard/admin/add_medical_point",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/admin/add_medical_point`,
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
export const update_medical_point = createAsyncThunk(
  "/dashbboard/admin/update_medical_point",
  async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/dashboard/admin/update_medical_point`,
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
export const dashboard_stats = createAsyncThunk(
  "/dashbboard/admin/dashboard_stats",
  async (formData) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/admin/dashboard_stats`,
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
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    rest: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.admin = null;
      }),
      builder.addCase(addUser.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(activity_status.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(activity_status.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(activity_status.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(update_user.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(update_user.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(update_user.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(getAllDoctors.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(getAllDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.admin = null;
      }),
      builder.addCase(addDoctor.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(addDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(addDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(update_doctor.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(update_doctor.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(update_doctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(getAllMD.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getAllMD.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(getAllMD.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.admin = null;
      }),
      builder.addCase(activity_status_md.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(activity_status_md.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(activity_status_md.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(get_pharmacists.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(get_pharmacists.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_pharmacists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(add_medical_point.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(add_medical_point.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(add_medical_point.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(update_medical_point.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(update_medical_point.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(update_medical_point.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.admin = null;
      }),
      builder.addCase(dashboard_stats.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(dashboard_stats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(dashboard_stats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.admin = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { rest } = adminSlice.actions;

export default adminSlice.reducer;
