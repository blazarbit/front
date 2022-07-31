import {FunctionComponent, useEffect, useState} from "react";
import {Box, Container, Modal, Tab, Tabs} from "@mui/material";
import {ChainType, Contract, Donation, NftContract, Token} from "../../apollo-client/data-model";
import {TabPanel} from "../tab-panel";
import {toClasses} from "class-converter";
import {useBlurContext, useTokensLoadedContext} from "../../contexts";
import {apolloClient, LOAD_CHAIN_ELEMENTS_SCRIPT} from "../../apollo-client";

import styles from "./token-selector-modal.module.css";
import classNames from "classnames";

interface Props {
    open: boolean;
    setOpen: Function;
    handleSelectedContract: Function;
    isDestinationChain: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: 826,
    height: '50%',
    minHeight: 459,
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

export const TokenSelectorModal: FunctionComponent<Props> = ({
    open,
    setOpen,
    handleSelectedContract,
    isDestinationChain
}) => {
    const {tokensLoaded, setTokensLoaded} = useTokensLoadedContext();
    const {setBlurScreen} = useBlurContext();

    const handleClose = () => {
        setOpen(false);
        setBlurScreen(false);
    }

    const handleSelect = (contract: Contract) => {
        handleSelectedContract(contract);
        handleClose();
    }


    const [tabIndex, setTabIndex] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        !tokensLoaded && apolloClient.query({
            query: LOAD_CHAIN_ELEMENTS_SCRIPT
        }).then(({data: {tokens, nfts, donations}}) => {
            setTokens(tokens);
            setNfts(nfts);
            setDonations(donations);
            setTokensLoaded(true);
        })
    }, [tokensLoaded]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.modalContainer}>
                    <Box className={classNames(styles.modalHeader, 'bold26')}>
                        <Tabs
                            variant="fullWidth"
                            sx={{width: '100%'}}
                            value={tabIndex}
                            onChange={(e, index) => setTabIndex(index)}
                            TabIndicatorProps={{style: {width: 0}}}
                        >
                            <Tab className={tabIndex === 0 ? styles.selectedTab : styles.notSelectedTab}
                                 label={<span className={classNames(styles.tabSpan, 'bold26')}>Tokens</span>}
                                 value={0}
                            />
                            <Tab className={tabIndex === 1 ? styles.selectedTab : styles.notSelectedTab}
                                 label={<span className={classNames(styles.tabSpan, 'bold26')}>NFT</span>}
                                 value={1}
                            />
                            <Tab className={tabIndex === 2 ? styles.selectedTab : styles.notSelectedTab}
                                 label={<span className={classNames(styles.tabSpan, 'bold26')}>Donations</span>}
                                 value={2}
                            />
                        </Tabs>
                    </Box>
                    <Container component="section"
                               sx={{mt: 5, mb: 5, display: 'flex', overflow: 'auto', height: '70%'}}
                               className={styles.chainGrid}
                    >
                        <TabPanel index={0} value={tabIndex} chainType={ChainType.Token}
                                  contracts={toClasses(tokens, Token)}
                                  handleSelect={handleSelect}
                                  isAvailable={true}
                        />
                        <TabPanel index={1} value={tabIndex} chainType={ChainType.Nft}
                                  contracts={toClasses(nfts, NftContract)}
                                  handleSelect={handleSelect}
                                  isAvailable={isDestinationChain}
                        />
                        <TabPanel index={2} value={tabIndex} chainType={ChainType.Donation}
                                  contracts={toClasses(donations, Donation)}
                                  handleSelect={handleSelect}
                                  isAvailable={isDestinationChain}
                        />
                    </Container>
                </Box>
            </Modal>
        </div>
    );
}
