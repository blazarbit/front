import {FunctionComponent} from "react";
import {Box} from "@mui/material";

import styles from './footer.module.css';
import classNames from "classnames";

export const Footer: FunctionComponent = () => {
    return (
        <footer className={classNames(styles.footer)}>
            <span className="medium16">
                Created by <b>Blazarbit</b> team © 2022
            </span>
            <Box>
                <a className="medium16">Twitter</a>
                <a className="medium16">Github</a>
            </Box>
            <span className="medium16">
                Developed during <b>HackAtom Seoul 2022</b>
            </span>
        </footer>
    );
}