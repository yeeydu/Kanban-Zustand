import { useEffect } from "react";
import { render } from 'vitest';

vi.mock('zustand') ;

function TestComponent({ selector, effect }) {

    const items = useStore(selector);

    useEffect(() => effect(items), [items]);
    return null;
}

// test('Should return default value', () => {
//     const selector = (store) => store.tasks;
//     const effect = vi.fn();   // mocked function
//     render(<TestComponent selector={selector} effect={effect} />);
//     expect(effect).toHaveBeenCalledWith([]);
// });

test('Should add an item to the store and re-run effect', () => {
    const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });
    const effect = vi.fn().mockImplementation((items) => {
        if (items.tasks.length === 0) {
            items.addTask('a', 'b');
        }
        render(<TestComponent selector={selector} effect={effect} />);
        expect(effect).toHaveBeenCalledTimes(2);
        expect(effect).toHaveBeenCalledWith(
            expect.objectContaining({ tasks: [{ title: "a", state: "b" }] })
            );
        });
});

test('Should add an item to the store and re-run effect', () => {
    const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask, deleteTask: store.deleteTask });
    let createdTask = false;
    let currentItmes; 
    const effect = vi.fn().mockImplementation((items) => {
        currentItmes = items;
        if (!createdTask) {
            items.addTask('a', 'b');
            createdTask = true;
        }else if(items.tasks.length ===1){
            items.deleteTask('a');
        }
        render(<TestComponent selector={selector} effect={effect} />);
        expect(effect).toHaveBeenCalledTimes(3);
        expect(currentItmes.tasks).toEqual([]);
        });
});