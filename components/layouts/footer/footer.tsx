import {FunctionComponent} from "react";

import styles from './footer.module.css';

export const Footer: FunctionComponent = () => {
    return (
        <footer className={styles.footer}>
            <div>
                Created by Blazarbit team © 2022
            </div>
            <div>
                <a>Twitter</a>
                <a>Github</a>
            </div>
            <div>
                Developed during hackatom seul 2022
            </div>
        </footer>
    );
}