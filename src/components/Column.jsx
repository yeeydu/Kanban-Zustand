import React, { useMemo, useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { shallow } from 'zustand/shallow';
import classNames from 'classnames';

export default function Column({ state }) {

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    //store
    const addTask = useStore((store) => store.addTask);
    const setDraggedTask = useStore((store) => store.setDraggedTask);
    const draggedTask = useStore((store) => store.draggedTask);
    const moveTask = useStore((store) => store.moveTask);

    // get tasks
    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state),
        shallow
    );
    /*
    // use filter to get new required value but use only inside of a selector, shallow,your own compare function -- it will rerender
    const filtered = useMemo(
        () => tasks.filter((task) => task.state === state),
        [tasks, state]
    )
    */
    /*
    const tasks = useStore(
        store => store.tasks.filter((task) => task.state === state),
        (prev, next) => {
            const longest = prev.length > next.length ? prev.length : next.length;
            for (let i = 0; i < longest; i++) {
                if (!prev[i] || !next[i]) return false;
                if(prev[i] !== next[i]) return true;
            }
            return true;
        }
    );
    */

    return (
        <div className={classNames("column", { drop: drop })}
            onDragOver={(e) => {
                e.preventDefault();
                setDrop(true);
            }}
            onDrop={(e) => {
                setDraggedTask(null);
                moveTask(draggedTask, state);
                setDrop(false);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setDrop(false);
            }}
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map((task) => (
                <Task title={task.title} key={task.title} />
            ))}
            {open && (
                <div className='Modal'>
                    <div className='modalContent'>
                        <input
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                            value={text}
                            required
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addTask(text, state)
                                setOpen(false);
                                setText('');
                            }}>Submit
                        </button>
                        <button onClick={() => {
                            setOpen(false);
                        }}>Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
