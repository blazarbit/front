import {optional, property, typed} from "class-converter";

export class DefaultGas {
    @optional()
    @property("defaultGas")
    defaultGas: number;

    constructor(defaultGas: number) {
        this.defaultGas = defaultGas;
    }
}

export class ProtocolInstructions {
    @optional()
    @property("destination_asset_address")
    destinationAssetAddress: string;

    @optional()
    @property("destination_asset_amount")
    destinationAssetAmount: number;

    @optional()
    @property("destination_asset_blockchain")
    destinationAssetBlockchain: string;

    @optional()
    @property("destination_asset_contract_address")
    destinationAssetContractAddress: string;

    @optional()
    @property("destination_asset_denom")
    destinationAssetDenom: string;

    @optional()
    @typed(DefaultGas)
    @property("fee")
    fee: DefaultGas;

    @optional()
    @property("funds")
    funds: Object;

    @optional()
    @property("json_encoded_send_args")
    transactionInstructions: string;

    @optional()
    @property("memo")
    memo: string;

    @optional()
    @property("payment_method_blockchain")
    paymentMethodBlockchain: string;

    @optional()
    @property("payment_method_denom")
    paymentMethodDenom: string;

    @optional()
    @property("payment_token_amount")
    paymentTokenAmount: number;

    constructor(destinationAssetAddress: string, destinationAssetAmount: number,
                destinationAssetBlockchain: string, destinationAssetContractAddress: string,
                destinationAssetDenom: string, fee: DefaultGas,
                funds: Object, transactionInstructions: string,
                memo: string, paymentMethodBlockchain: string,
                paymentMethodDenom: string, paymentTokenAmount: number) {
        this.destinationAssetAddress = destinationAssetAddress;
        this.destinationAssetAmount = destinationAssetAmount;
        this.destinationAssetBlockchain = destinationAssetBlockchain;
        this.destinationAssetContractAddress = destinationAssetContractAddress;
        this.destinationAssetDenom = destinationAssetDenom;
        this.fee = fee;
        this.funds = funds;
        this.transactionInstructions = transactionInstructions;
        this.memo = memo;
        this.paymentMethodBlockchain = paymentMethodBlockchain;
        this.paymentMethodDenom = paymentMethodDenom;
        this.paymentTokenAmount = paymentTokenAmount;
    }
}