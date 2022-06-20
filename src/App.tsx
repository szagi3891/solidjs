import { Accessor, Component, createMemo, createSignal, Setter } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

class Signal<T> {
    private readonly valueFunc: Accessor<T>;
    private readonly setFunc: (newValue: T) => void;

    public constructor(init: T) {
        const [ value, setValue ] = createSignal<T>(init);
        this.valueFunc = value;
        this.setFunc = (value: T) => {
            setValue(() => value);
        };
    }

    public get value(): T {
        return this.valueFunc();
    }

    public set value(newValue: T) {
        this.setFunc(newValue);
    }
}

const createStore = () => {
    const age: Signal<number> = new Signal(10);

    const up = () => {
        age.value = age.value + 1;
    };

    const age2 = createMemo(() => age.value * 2);

    return {
        age: () => age.value,
        age2,
        up,
    }
}

const store = createStore();

const App: Component = () => {

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <img src={logo} class={styles.logo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload. DDDaaa
                </p>
                <a
                    class={styles.link}
                    href="https://github.com/solidjs/solid"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Solidfff
                </a>
                <div onClick={store.up} class={styles.counter}>
                    <div>counter = {store.age()}</div>
                    <div>counter2 = {store.age2()}</div>
                </div>
            </header>
        </div>
    );
};

export default App;
