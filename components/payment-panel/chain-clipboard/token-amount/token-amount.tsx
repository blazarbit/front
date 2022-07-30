import {FunctionComponent} from "react";
import {Box, InputBase} from "@mui/material";

import styles from "./token-amount.module.css";
import classNames from "classnames";

interface Props {
    disabled?: boolean;
}

export const TokenAmount: FunctionComponent<Props> = ({disabled}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                borderRadius: 1,
                width: '40%',
                textAlign: 'end',
                marginLeft: '1rem'
            }}
        >
            <InputBase
                disabled={disabled}
                className={classNames(styles.amountInput, "bold18", disabled ? styles.inputDisabled : styles.inputEnabled)}
                type="number"
                value={0}
            />
        </Box>
    );
}