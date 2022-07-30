import {FunctionComponent} from "react";
import {Box, InputBase} from "@mui/material";

import styles from "./destination-address.module.css";
import classNames from "classnames";

interface Props {
    disabled?: boolean;
}

export const DestinationAddress: FunctionComponent<Props> = ({disabled}) => {
    return (
        <Box>
            <div className={styles.labelPanel}>
                <span className="medium12">Destination address</span>
            </div>
            <InputBase
                className={classNames(styles.destinationAddress, "medium14")}
                type="text"
                value=""
                disabled={disabled}
            />
        </Box>
    );
}