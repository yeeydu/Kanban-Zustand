# Kanban-Zustand

A TODO APP WITH DRAGGABLE OPTIONS LIKE KANBEN MADE WITH REACT AND ZUSTAND STATE MANAGEMNET

- Vite created project
- npm i zustand
- npm I classnames

------------------------------------

# devtools works with redux chrome extension
# persist keeps the information you are using in dev 
# log another way to debug and load information in console with the following code

const log = (config) => (set, get, api) => config(
    (...args) => {
        console.log(args);
        set(...args);
    },
    get,
    api
);

//                             persist / devtool/ store
export const useStore = create(log(persist(devtools(store), {name: "store”})));

------------------------------------

## ZUSTAND
A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.
ZUSTAND DOCUMENTATION:  https://docs.pmnd.rs/zustand/getting-started/introduction


FOLLOW TUTORIAL: https://www.freecodecamp.org/news/zustand-course-react-state-management