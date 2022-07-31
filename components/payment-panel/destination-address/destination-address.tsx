import React, {FunctionComponent} from "react";
import {Box, InputBase} from "@mui/material";

import styles from "./destination-address.module.css";
import classNames from "classnames";

interface Props {
    destinationAddress?: string;
    setDestinationAddress: Function;
    disabled?: boolean;
}

export const DestinationAddress: FunctionComponent<Props> = ({
    destinationAddress,
    setDestinationAddress,
    disabled
}) => {

    return (
        <Box>
            <div className={styles.labelPanel}>
                <span className="medium12">Destination address</span>
            </div>
            <InputBase
                className={classNames(styles.destinationAddress, "medium14")}
                type="text"
                value={destinationAddress}
                disabled={disabled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                    setDestinationAddress(e.target.value);
                }}
            />
        </Box>
    );
}