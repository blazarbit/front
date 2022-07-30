import {FunctionComponent} from "react";
import {Box, Button, Grid} from "@mui/material";
import {ChainCard} from "../cards/chain-card";
import {ChainType, Contract} from "../../apollo-client/data-model";

import styles from "./tab-panel.module.css";
import classNames from "classnames";

interface TabPanelProps {
    index: number;
    value: number;
    chainType: ChainType;
    contracts: Contract[];
    handleSelect: Function;
    isAvailable: boolean;
}

export const TabPanel: FunctionComponent<TabPanelProps> = ({
    index,
    value,
    chainType,
    contracts,
    handleSelect,
    isAvailable
}) => {
    return (
        <Box
            hidden={value !== index}
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            {value === index && (
                <>
                    {isAvailable ? (
                        <Grid container rowSpacing={5}>
                            {contracts.map((contract, index) => {
                                return (
                                    <Grid key={`${contract.chainName}-${index}`} item xs={12} md={6}
                                          sx={{zIndex: 1, display: 'flex', justifyContent: 'space-around'}}>
                                        <Box className={styles.chainContainer}>
                                            <Button
                                                className={classNames(styles.tokenButton)}
                                                onClick={() => handleSelect(contract)}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItem: 'center'
                                                    }}
                                                    className={styles.chainCardContainer}
                                                >
                                                    <ChainCard contract={contract}/>
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Box sx={{
                            display: 'flex'
                        }}
                             className={styles.informationContainer}
                        >
                            <p className={classNames(styles.topPart, 'bold26')}>
                                {chainType === ChainType.Nft && 'NFT'}
                                {chainType === ChainType.Donation && 'Donations'}
                                &nbsp;cannot be used as a Payment Method.
                            </p>
                            <p className={classNames(styles.bottomPart, 'bold26')}>
                                Use it as a Destination Asset!
                            </p>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}