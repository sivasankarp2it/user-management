import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: any = { items: [], filter: "all" };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state: any, action: any) {
        state.items.push(action.payload);
      },
      prepare(user: any, title: any) {
        return {
          payload: { id: nanoid(), user, title, status: "pending" }, // 👈 replaced completed with status
        };
      },
    },

    toggleTask(state: any, action: any) {
      const t = state.items.find((i: any) => i.id === action.payload);
      if (t) {
        // 👇 Toggle between 3 states instead of just true/false
        if (t.status === "pending") t.status = "in-progress";
        else if (t.status === "in-progress") t.status = "completed";
        else t.status = "pending";
      }
    },

    editTask(state: any, action: any) {
      const t = state.items.find((i: any) => i.id === action.payload.id);
      if (t) t.title = action.payload.title;
    },

    deleteTask(state: any, action: any) {
      state.items = state.items.filter((i: any) => i.id !== action.payload);
    },

    setFilter(state: any, action: any) {
      state.filter = action.payload;
    },

    clearTasksForUser(state: any, action: any) {
      state.items = state.items.filter((i: any) => i.user !== action.payload);
    },

    // 👇 allow manual status change from dropdown
    setStatus(state: any, action: any) {
      const t = state.items.find((i: any) => i.id === action.payload.id);
      if (t) t.status = action.payload.status;
    },
  },
} as any);

export const {
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  setFilter,
  clearTasksForUser,
  setStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState: any = { items: [], filter: "all" };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: {
//       reducer(state: any, action: any) {
//         state.items.push(action.payload);
//       },
//       prepare(user: any, title: any) {
//         return {
//           payload: { id: nanoid(), user, title, completed: false },
//         };
//       },
//     },

//     toggleTask(state: any, action: any) {
//       const t = state.items.find((i: any) => i.id === action.payload);
//       if (t) t.completed = !t.completed;
//     },

//     // ✅ fix: force TS to treat action as "any" — stops void merging issue
//     editTask(state: any, action: any) {
//       const t = state.items.find((i: any) => i.id === action.payload.id);
//       if (t) t.title = action.payload.title;
//     },

//     deleteTask(state: any, action: any) {
//       state.items = state.items.filter((i: any) => i.id !== action.payload);
//     },

//     setFilter(state: any, action: any) {
//       state.filter = action.payload;
//     },

//     clearTasksForUser(state: any, action: any) {
//       state.items = state.items.filter((i: any) => i.user !== action.payload);
//     },
//   },
// } as any); // 👈 THIS is the key fix (force type as any)

// export const {
//   addTask,
//   toggleTask,
//   editTask,
//   deleteTask,
//   setFilter,
//   clearTasksForUser,
// } = tasksSlice.actions;

// export default tasksSlice.reducer;