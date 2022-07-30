import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {TokenSelector} from "./token-selector";
import {TokenAmount} from "./token-amount";

import styles from "./chain-clipboard.module.css";
import classNames from "classnames";

interface Props {
    labelName: string;
    amountName: string;
    isDestinationChain?: boolean;
}

export const ChainClipboard: FunctionComponent<Props> = ({labelName, amountName, isDestinationChain}) => {
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
                className={classNames(styles.tokenPanel, styles.tokenSelector)}
            >
                <TokenSelector placeHolder={labelName}/>
                <TokenAmount/>
            </Box>
        </div>
    );
}