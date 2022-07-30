import {optional, property, typed} from "class-converter";

export class Blockchain {
    @property("blockchain_name")
    blockchainName: string;

    @property("blockchain_network_id")
    blockchainNetworkId: string;

    @optional()
    @property("blockchain_logo_url")
    blockchainLogoUrl: string;

    @optional()
    @property("gas_price")
    gasPrise: number;

    @optional()
    @property("rpc_node_address")
    rpcNodeAddress: string;

    @optional()
    @property("protocol_contract_address")
    protocolContractAddress: string;

    @optional()
    @property("prefix")
    prefix: string;
}

export class TokenData {
    @property("symbol")
    symbol: string;

    @property("logo_url")
    logoUrl: string;

    @property("symbol_point_exponent")
    exponent: number;

    @optional()
    @property("base_denom")
    baseDenom: string;

    @optional()
    @typed(Blockchain)
    @property("base_blockchain")
    baseBlockchain: Blockchain;
}