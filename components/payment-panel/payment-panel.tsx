import {FunctionComponent} from "react";
import Typography from '@mui/material/Typography';
import {ChainClipboard} from "./chain-clipboard";
import {DestinationAddress} from "./destination-address";
import {ExecutionInfo} from "./execution-info";
import {PaymentConfirm} from "../buttons";

import styles from "./payment-panel.module.css";
import classNames from "classnames";

interface Props {
    className: string;
}

export const PaymentPanel: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={classNames(className, styles.panelContainer)}>
            <Typography textAlign='center' className={classNames(styles.panelTitle, 'bold16')}>
                Payment
            </Typography>
            <ChainClipboard
                labelName="Payment method"
                amountName="Amount"
            />
            <ChainClipboard
                labelName="Destination asset"
                amountName="Estimated amount"
                isDestinationChain={true}
            />
            <DestinationAddress/>
            <ExecutionInfo/>
            <PaymentConfirm/>
        </div>
    );
}