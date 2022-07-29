import {FunctionComponent, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styles from "./connect-wallet.module.css";
import classNames from "classnames";


export const ConnectWallet: FunctionComponent = () => {
    const [walletConnected, setWalletConnected] = useState(false);

    return (
        <Box maxWidth="sm">
            {walletConnected ? (
                <Button variant="contained" className={classNames(styles.connectedWalletButton, styles.button, 'bold16')} disabled={true}>
                    Wallet Connected
                </Button>
            ) : (
                <Button variant="contained" className={classNames(styles.connectWalletButton, styles.button, 'bold16')}
                        onClick={() => setWalletConnected(true)}>
                    Connect Wallet
                </Button>
            )}
        </Box>
    );
}