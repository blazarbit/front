import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {Token} from "../../../../../apollo-client/data-model";

import styles from "./deposit-subcard.module.css";
import classNames from "classnames";

interface Props {
    contract: Token;
}

export const DepositSubCard: FunctionComponent<Props> = ({contract}) => {
    return (
        <>
            <Box
                component="img"
                sx={{
                    width: 35,
                    height: 35
                }}
                src={contract.blockchain.blockchainLogoUrl}
            />
            <Box sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: '0.3em',
                alignItems: 'flex-start'
            }} className={styles.depositSubCard}>
                <span
                    className={classNames(styles.depositChainName, 'bold14')}>{contract.blockchain.blockchainName}
                </span>
                <span
                    className={classNames(styles.depositedAddress, 'small10')}>{contract.denom.slice(0, 8)}...{contract.denom.slice(-4)}
                </span>
            </Box>
        </>
    );
}