import {FunctionComponent, useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {ChainClipboard} from "./chain-clipboard";
import {DestinationAddress} from "./destination-address";
import {ExecutionInfo} from "./execution-info";
import {PaymentConfirm} from "../buttons";
import {ChainType, Contract, Donation, NftContract, ProtocolInstructions, Token} from "../../apollo-client/data-model";
import {toClasses} from "class-converter";
import {GasPrice} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {coin} from "@cosmjs/launchpad";
import {MsgExecuteContract} from "cosmjs-types/cosmwasm/wasm/v1beta1/tx";
import {toUtf8} from "@cosmjs/encoding";
import {useKeplerContext} from "../../contexts";
import {apolloClient, LOAD_PROTOCOL_INSTRUCTIONS_SCRIPT} from "../../apollo-client";

import styles from "./payment-panel.module.css";
import classNames from "classnames";

interface Props {
    className: string;
}

export const PaymentPanel: FunctionComponent<Props> = ({className}) => {
    const [paymentMethodContract, setPaymentMethodContract] = useState<Contract>();
    const [destinationAssetContract, setDestinationAssetContract] = useState<Contract>();
    const [protocolInstructions, setProtocolInstructions] = useState<ProtocolInstructions[]>();
    const [isLoadedProtocolInstructions, setIsLoadedProtocolInstructions] = useState(false);
    const [paymentMethodAmount, setPaymentMethodAmount] = useState<string>("");
    const [destinationAddress, setDestinationAddress] = useState<string>("");

    const {kepler, keplerLoaded} = useKeplerContext();

    const makeTransaction = async (): Promise<void> => {
        if (!protocolInstructions || !protocolInstructions[0] || !keplerLoaded) {
            return;
        }
        const paymentMethodData = paymentMethodContract as Token;
        // @ts-ignore
        const offlineSigner = kepler.getOfflineSigner(paymentMethodData.tokenData.baseBlockchain.blockchainNetworkId);
        const accounts = await offlineSigner.getAccounts();
        const senderAddress = accounts[0].address;
        const defaultSigningClientOptions = {
            gasPrice: GasPrice.fromString(protocolInstructions[0].fee.defaultGas.toFixed(2) + paymentMethodData.denom)
        };
        const client = await SigningCosmWasmClient.connectWithSigner(
            paymentMethodData.blockchain.rpcNodeAddress,
            offlineSigner,
            defaultSigningClientOptions
        );
        const funds = [coin(Number(paymentMethodAmount) * 10 ** paymentMethodData.tokenData.exponent, paymentMethodData.denom)];
        const transactionInstructions = JSON.stringify(protocolInstructions[0].transactionInstructions).replace(/<destination_address>/, destinationAddress);
        const msg = {
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: MsgExecuteContract.fromPartial({
                sender: senderAddress,
                contract: paymentMethodData.blockchain.protocolContractAddress,
                msg: toUtf8(transactionInstructions),
                funds: [...(funds)],
            }),
        };

        const result = await client.signAndBroadcast(senderAddress, [msg], "auto", protocolInstructions[0].memo);

        if (result.code !== undefined &&
            result.code !== 0) {
            // @ts-ignore
            alert("Failed to send tx: " + result.log || result.rawLog);
        } else {
            alert("Succeed to send tx:" + result.transactionHash);
        }
    }

    const onPaymentConfirm = () => {
        makeTransaction();
    }

    useEffect(() => {
        if (paymentMethodContract && destinationAssetContract) {
            let paymentMethodData = paymentMethodContract as Token;
            let d_a_denom = "";
            let d_a_address = "";
            let d_a_contract_address = "";
            if (destinationAssetContract.chainType === ChainType.Token) {
                const token = destinationAssetContract as Token;
                d_a_denom = token.denom;
            }
            if (destinationAssetContract.chainType === ChainType.Donation) {
                const donation = destinationAssetContract as Donation;
                d_a_address = donation.contractAddress;
            }
            if (destinationAssetContract.chainType === ChainType.Nft) {
                const nft = destinationAssetContract as NftContract;
                d_a_contract_address = nft.contractAddress;
            }

            apolloClient.query({
                query: LOAD_PROTOCOL_INSTRUCTIONS_SCRIPT,
                variables: {
                    "p_m_blockchain": paymentMethodData.blockchain.blockchainNetworkId,
                    "p_m_denom": paymentMethodData.denom,
                    "d_a_blockchain": destinationAssetContract.blockchainNetworkId,
                    "d_a_denom": d_a_denom,
                    "d_a_denom_is_null": destinationAssetContract.chainType !== ChainType.Token,
                    "d_a_address": d_a_address,
                    "d_a_address_is_null": destinationAssetContract.chainType !== ChainType.Donation,
                    "d_a_contract_address": d_a_contract_address,
                    "d_a_contract_address_is_null": destinationAssetContract.chainType !== ChainType.Nft
                }
            }).then(({data: {protocolInstructions}}) => {
                setProtocolInstructions(toClasses(protocolInstructions, ProtocolInstructions));
                setIsLoadedProtocolInstructions(true);
                if (destinationAssetContract.chainType === ChainType.Donation) {
                    const donation = destinationAssetContract as Donation;
                    setDestinationAddress(donation.contractAddress);
                }
            })
        }
    }, [paymentMethodContract, destinationAssetContract]);

    return (
        <div className={classNames(className, styles.panelContainer)}>
            <Typography textAlign='center' className={classNames(styles.panelTitle, 'bold16')}>
                Payment
            </Typography>
            <ChainClipboard
                labelName="Payment method"
                amountName="Amount"
                selectedContract={paymentMethodContract}
                setSelectedContract={setPaymentMethodContract}
                tokenAmount={paymentMethodAmount}
                setTokenAmount={setPaymentMethodAmount}
            />
            <ChainClipboard
                labelName="Destination asset"
                amountName="Estimated amount"
                isDestinationAsset={true}
                selectedContract={destinationAssetContract}
                setSelectedContract={setDestinationAssetContract}
            />
            <DestinationAddress
                destinationAddress={destinationAddress}
                setDestinationAddress={setDestinationAddress}
                disabled={destinationAssetContract?.chainType === ChainType.Donation}/>
            <ExecutionInfo/>
            <PaymentConfirm onPaymentConfirm={onPaymentConfirm} disabled={!isLoadedProtocolInstructions || !paymentMethodAmount || !destinationAddress}/>
        </div>
    );
}