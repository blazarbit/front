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
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 120
            }}>
                <a href="https://github.com/blazarbit">
                    <Box
                        component="img"
                        sx={{
                            width: 34,
                            height: 34
                        }}
                        src="gitLogo.png"
                    />
                </a>
                <a href="https://twitter.com/blazarbit">
                    <Box
                        component="img"
                        sx={{
                            width: 34,
                            height: 34
                        }}
                        src="twitterLogo.png"
                    />
                </a>
            </Box>
            <span className="medium16">
                Developed during <b>HackAtom Seoul 2022</b>
            </span>
        </footer>
    );
}