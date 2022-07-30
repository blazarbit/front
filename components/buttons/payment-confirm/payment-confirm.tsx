import {FunctionComponent} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useKeplerContext} from "../../../contexts";

import styles from "./payment-confirm.module.css";
import classNames from "classnames";

export const PaymentConfirm: FunctionComponent = () => {
    const {keplerLoaded} = useKeplerContext();

    return (
        <Box sx={{
            marginTop: '2rem'
        }}>
            <Button variant="contained" disabled={!keplerLoaded}
                    className={classNames(styles.paymentConfirmButton, "bold20", !keplerLoaded ? styles.disabledButton : null)}
            >
                Confirm
            </Button>
        </Box>
    );
}