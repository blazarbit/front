import {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {DepositSubCard} from "./deposit";
import {DonationSubCard} from "./donation";
import {NftSubCard} from "./nft";
import {ChainType, Contract, Token, NftContract, Donation} from "../../../../apollo-client/data-model";

import styles from "./chain-subcard.module.css";

interface Props {
    chainSubCardType?: ChainType;
    contract: Contract;
}

export const ChainSubCard: FunctionComponent<Props> = ({chainSubCardType = ChainType.Token, contract}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0.2rem 0.5rem',
            marginLeft: '1rem'
        }}
             className={styles.chainSubCardContainer}
        >
            <div className={styles.chainSubCardType}>
                {chainSubCardType === ChainType.Token && <span className="medium10">Deposited on</span>}
                {chainSubCardType === ChainType.Donation && <span className="medium10">Donation</span>}
                {chainSubCardType === ChainType.Nft && <span className="medium10">Contract</span>}
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0.25em'
            }}>
                {chainSubCardType === ChainType.Token && <DepositSubCard contract={contract as Token}/>}
                {chainSubCardType === ChainType.Donation && <DonationSubCard contract={contract as Donation}/>}
                {chainSubCardType === ChainType.Nft && <NftSubCard contract={contract as NftContract}/>}
            </Box>
        </Box>
    );
}