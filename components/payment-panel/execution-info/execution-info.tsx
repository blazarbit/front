import {FunctionComponent} from "react";
import {Box, TextField} from "@mui/material";

import styles from "./execution-info.module.css"
import classNames from "classnames";

export const ExecutionInfo: FunctionComponent = () => {
    return (
        <Box>
            <div className={styles.labelPanel}>
                <span className="medium12">Execution info</span>
            </div>
            <TextField
                className={classNames(styles.textArea, "medium14")}
                multiline
                rows={3}
                type='text'
                fullWidth
                value=''
                variant='outlined'
                inputProps={
                    {readOnly: true}
                }
            />
        </Box>
    );
}