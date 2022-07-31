import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";

import styles from "./about.module.css";
import classNames from "classnames";

interface Props {
    className: string;
}

export const About: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={classNames(className, styles.aboutContainer)}>
            <Box className={styles.aboutContent}>
                <Box textAlign='justify'>
                    <Box
                        component="img"
                        sx={{
                            width: 700,
                            height: 360
                        }}
                        src={"about.jpg"}
                    />
                    <Typography className={styles.aboutText}>
                        Inter-blockchain Payment System<br/>developed during HackAtom Seoul 2022
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}