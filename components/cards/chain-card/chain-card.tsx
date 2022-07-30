import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {ChainType, Contract} from "../../../apollo-client/data-model";
import {ChainSubCard} from "./chain-subcard";

import styles from "./chain-cards.module.css";
import classNames from "classnames";

interface Props {
    chainSubCardType?: ChainType;
    contract: Contract;
}

export const ChainCard: FunctionComponent<Props> = ({
    chainSubCardType = ChainType.Token,
    contract
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Box
                component="img"
                sx={{
                    width: 50,
                    height: 50
                }}
                src={contract.chainLogo}
            />
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
            {!contract.isNativeToken() && <ChainSubCard contract={contract} chainSubCardType={chainSubCardType}/>}
        </Box>
    );
}