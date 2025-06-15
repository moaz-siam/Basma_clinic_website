import { create } from "zustand";

// export const useModel = create((set) => ({
//   isOpen: null,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));



export const useGlobalState = create((set) => ({
  sidenav: false, 
  hasScrolled : false,
  activeLink : 0,
  setSidenav: (newValue) => set({ sidenav: newValue }), // تحديث القيمة
  setHasScrolled : (newValue) => set({ hasScrolled: newValue }),
  setActiveLink : (newValue) => set({ activeLink: newValue })
  // resetValue: () => set({ value: null }), // إعادة التعيين إلى null
}));