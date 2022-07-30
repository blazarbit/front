import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {Contract} from "../../../apollo-client/data-model";

import styles from "./chain-cards.module.css";
import classNames from "classnames";


interface Props {
    contract: Contract;
}

export const ChainCard: FunctionComponent<Props> = ({contract}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div className={styles.fakeImage}/>
            <Box sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: '1rem',
                alignItems: 'flex-start',
                width: 'max-content'
            }}>
                <span className={classNames(styles.chainName, 'bold20')}>{contract.chainName}</span>
                <span className={classNames(styles.blockchainName, 'medium12')}>{contract.blockchainName}</span>
            </Box>
        </Box>
    );
}