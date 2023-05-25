import { create } from 'zustand';
import {devtools, persist} from 'zustand/middleware';

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set(
        (store) => ({ tasks: [...store.tasks, { title, state }] }), 
        false,   // for debug
        "addTask" // debug
        ),
    deleteTask: (title) => set(
        (store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
    setDraggedTask: (title) => set(
        { draggedTask: title }),
    moveTask: (title, state) => set(
        (store) => ({
            tasks: store.tasks.map((task) => (task.title === title ? { title, state } : task)),
        })),
});

const log = (config) => (set, get, api) => config(
    (...args) => {
        console.log(args);
        set(...args);
    },
    get,
    api
);

//                             persist / devtool/ store
export const useStore = create(persist(devtools(store), {name: "store"}));
// globalize all tasks 