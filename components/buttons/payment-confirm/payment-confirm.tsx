import {FunctionComponent} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styles from "./payment-confirm.module.css";
import classNames from "classnames";

export const PaymentConfirm: FunctionComponent = () => {
    return (
        <Box sx={{
            marginTop: '2rem'
        }}>
            <Button variant="contained" className={classNames(styles.paymentConfirmButton, "bold20")}>
                Confirm
            </Button>
        </Box>
    );
}