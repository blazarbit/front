import {FunctionComponent} from "react";
import {ConnectWallet} from "../../buttons";
import {Box} from "@mui/material";

import styles from "./header.module.css";
import classNames from "classnames";

export const Header: FunctionComponent = () => {
    return (
        <header className={styles.header}>
            <div className={styles.labelContainer}>
                <Box
                    component="img"
                    sx={{
                        width: 176,
                        height: 76
                    }}
                    src="headerLogo.png"
                />
                <Box className={styles.slogan} sx={{
                    display: 'flex',
                    flexDirection: 'column',

                }}
                >
                    <p className={classNames(styles.topPart, 'bold18')}>Don&#39;t be an exchange, be an</p>
                    <p className={classNames(styles.bottomPart, 'bold20')}>Inter-blockchain Payment System!</p>
                </Box>
            </div>
            <ConnectWallet/>
        </header>
    );
}