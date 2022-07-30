import {FunctionComponent, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useKeplerContext} from "../../../contexts";
import {apolloClient, LOAD_BLOCKCHAIN_NETWORKS_SCRIPT} from "../../../apollo-client";
import {toClasses} from "class-converter";
import {BlockchainNetwork} from "../../../apollo-client/data-model";
import {getKeplrFromWindow} from "@keplr-wallet/stores";

import styles from "./connect-wallet.module.css";
import classNames from "classnames";

export const ConnectWallet: FunctionComponent = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const {setKepler, setKeplerLoaded} = useKeplerContext();
    const [blockchainList, setBlockchainList] = useState<string[]>([]);
    const [blockchainListLoaded, setBlockchainListLoaded] = useState(false);

    useEffect(() => {
        !blockchainListLoaded && apolloClient.query({
            query: LOAD_BLOCKCHAIN_NETWORKS_SCRIPT
        }).then(({data: {blockchains}}) => {
            setBlockchainList(
                toClasses(blockchains, BlockchainNetwork)
                    .map((blockchain: BlockchainNetwork) => blockchain.networkId)
            );
            setBlockchainListLoaded(true);
        })
    }, [blockchainListLoaded]);

    const onConnectWalletButtonClick = () => {
        getKeplrFromWindow().then((keplr) => {
            if (!keplr || !keplr.getOfflineSigner) {
                alert("Please install keplr extension!");
            } else if (blockchainList) {
                keplr.enable(blockchainList).then(() => {
                    setKepler(keplr);
                    setWalletConnected(true);
                    setKeplerLoaded(true);
                });
            }
        });
    }

    return (
        <Box maxWidth="sm">
            {walletConnected ? (
                <Button variant="contained" className={classNames(styles.connectedWalletButton, styles.button, 'bold16')} disabled={true}>
                    Wallet Connected
                </Button>
            ) : (
                <Button variant="contained" className={classNames(styles.connectWalletButton, styles.button, 'bold16')}
                        onClick={onConnectWalletButtonClick}>
                    Connect Wallet
                </Button>
            )}
        </Box>
    );
}