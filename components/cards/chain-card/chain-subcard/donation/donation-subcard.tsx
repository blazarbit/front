import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {Donation} from "../../../../../apollo-client/data-model";

import styles from "./donation-subcard.module.css";
import classNames from "classnames";

interface Props {
    contract: Donation;
}

export const DonationSubCard: FunctionComponent<Props> = ({contract}) => {
    return (
        <>
            <div className={styles.fakeDonationChainLogo}/>
            <Box sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: '0.3em',
                alignItems: 'flex-start'
            }}>
                <span className={classNames(styles.donationChainName, 'bold14')}>{contract.name}</span>
            </Box>
        </>
    );
}