import authReducer from "@/redux/slice/authSlice";
import patientReducer from "@/redux/slice/patientSlice";
import doctorReducer from "@/redux/slice/doctorSlice";
import pharmacyReducer from "@/redux/slice/pharmacySlice";
import adminReducer from "@/redux/slice/adminSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      patient: patientReducer,
      doctor: doctorReducer,
      pharmacy: pharmacyReducer,
      admin: adminReducer,
    },
    preloadedState,
  });
}
