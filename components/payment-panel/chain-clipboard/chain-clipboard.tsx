import {FunctionComponent, useState} from "react";
import {Box} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {TokenSelector} from "./token-selector";
import {TokenAmount} from "./token-amount";
import {Contract} from "../../../apollo-client/data-model";

import styles from "./chain-clipboard.module.css";
import classNames from "classnames";

interface Props {
    labelName: string;
    amountName: string;
    isDestinationChain?: boolean;
    selectedContract?: Contract;
    setSelectedContract: Function;
}

export const ChainClipboard: FunctionComponent<Props> = ({
    labelName,
    amountName,
    isDestinationChain = false,
    selectedContract,
    setSelectedContract
}) => {
    const [tokenSelected, setTokenSelected] = useState(false);

    return (
        <div className={styles.chainContainer}>
            <div className={classNames(styles.labelPanel)}>
                <span className='medium12'>{labelName}</span>
                {isDestinationChain && <ArrowDownwardIcon/>}
                <span className='medium12'>{amountName}</span>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                }}
                className={classNames(styles.tokenPanel, tokenSelected ? styles.tokenSelected : styles.tokenNotSelected)}
            >
                <TokenSelector
                    placeHolder={labelName}
                    tokenSelected={tokenSelected}
                    setTokenSelected={setTokenSelected}
                    isDestinationChain={isDestinationChain}
                    selectedContract={selectedContract}
                    setSelectedContract={setSelectedContract}
                />
                <TokenAmount disabled={!tokenSelected}/>
            </Box>
        </div>
    );
}