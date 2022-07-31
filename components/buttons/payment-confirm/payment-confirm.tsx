import {FunctionComponent} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useKeplerContext} from "../../../contexts";

import styles from "./payment-confirm.module.css";
import classNames from "classnames";

interface Props {
    disabled?: boolean;
    onPaymentConfirm: Function;
}

export const PaymentConfirm: FunctionComponent<Props> = ({disabled, onPaymentConfirm}) => {
    const {keplerLoaded} = useKeplerContext();

    return (
        <Box sx={{
            marginTop: '2rem'
        }}>
            <Button variant="contained" disabled={disabled || !keplerLoaded}
                    className={classNames(styles.paymentConfirmButton, "bold20", disabled ? styles.disabled : null)}
                    onClick={() => onPaymentConfirm()}>
                Confirm
            </Button>
        </Box>
    );
}