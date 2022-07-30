import {FunctionComponent} from "react";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Button} from "@mui/material";

import styles from "./token-selector.module.css";
import classNames from "classnames";

interface Props {
    placeHolder: string;
}

export const TokenSelector: FunctionComponent<Props> = ({placeHolder}) => {
    return (
        <Button className={classNames(styles.tokenSelector, styles.tokenNotSelected)}>
            <Box sx={{
                display: 'flex',
                alignItem: 'center'
            }}>
                <span className={classNames(styles.placeHolder, 'bold18')}>{placeHolder}</span>
            </Box>
            <ArrowBackIosIcon className={styles.selectorArrow}/>
        </Button>
    );
}