import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {NftContract} from "../../../../../apollo-client/data-model";

import styles from "./nft-subcard.module.css";
import classNames from "classnames";

interface Props {
    contract: NftContract;
}

export const NftSubCard: FunctionComponent<Props> = ({contract}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'flex-start'
            }} className={styles.nftSubCard}>
                <span className='bold14'>Token id:&nbsp;{contract.tokenId}</span>
                <span
                    className={classNames(styles.contractAddress, 'small10')}>{contract.contractAddress.slice(0, 8)}...{contract.contractAddress.slice(-4)}
                </span>
            </Box>
        </>
    );
}