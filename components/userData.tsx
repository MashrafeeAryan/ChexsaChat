// Importing the 'create' function from the Zustand library
// Zustand is a lightweight, fast state management tool used to store and share data across the app
import { create } from "zustand";

// Importing the 'persist' middleware from Zustand
// This allows the state (like user login info) to be saved across app restarts using storage
import { persist } from "zustand/middleware";

// ---------- TYPE DEFINITIONS ----------

// This defines the structure of a single 'User' object.
// The TypeScript type helps ensure that the user data is always in the correct format.
type User = {
  id: string;        // Every user must have a unique ID (this is required)
  name?: string;     // The user's name (optional)
  email?: string;    // The user's email (optional)
};

// This defines what data and functions our Zustand store should provide.
type UserStore = {
  user: User | null;                     // Stores the current logged-in user or null if logged out
  setUser: (user: User) => void;         // Function to update/set the user
  clearUser: () => void;                 // Function to clear/reset the user (log out)
};

// ---------- CREATING THE ZUSTAND STORE ----------

// This creates the Zustand store with persistent storage
// We export `useUserStore` so any component can access or update the user data
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state: no user is logged in
      user: null,

      // Updates the user state with new user info (e.g., after login)
      setUser: (user) => set({ user }),

      // Clears the user data (e.g., on logout)
      clearUser: () => set({ user: null }),
    }),
    {
      // Name of the storage key used under the hood (AsyncStorage in React Native)
      name: "user-storage",
    }
  )
);
