import {property, typed} from "class-converter";
import {Blockchain, TokenData} from "./token-properties";

export enum ChainType {
    Token,
    Donation,
    Nft
}

export interface Contract {
    get chainName(): string;

    get chainLogo(): string;

    get blockchainName(): string;

    get chainType(): ChainType;

    isNativeToken(): boolean;
}

export class Token implements Contract {
    @property("denom")
    denom: string;

    @typed(TokenData)
    @property("token_data")
    tokenData: TokenData;

    @typed(Blockchain)
    @property("deposited_on")
    blockchain: Blockchain;

    constructor(denom: string, tokenData: TokenData, blockchain: Blockchain) {
        this.denom = denom;
        this.tokenData = tokenData;
        this.blockchain = blockchain;
    }

    get chainName(): string {
        return this.tokenData.symbol;
    }

    get chainLogo(): string {
        return this.tokenData.logoUrl;
    }

    get blockchainName(): string {
        return this.tokenData.baseBlockchain.blockchainName;
    }

    get chainType(): ChainType {
        return ChainType.Token;
    }

    isNativeToken(): boolean {
        return this.denom === this.tokenData.baseDenom
            && this.blockchain.blockchainNetworkId === this.tokenData.baseBlockchain.blockchainNetworkId;
    }
}

export class DestinationAsset {
    @property("address")
    contractAddress: string;

    @property("name")
    name: string;

    @property("logo_url")
    logoUrl: string;

    constructor(contractAddress: string, name: string, logoUrl: string) {
        this.contractAddress = contractAddress;
        this.name = name;
        this.logoUrl = logoUrl;
    }
}

export class NftContract extends DestinationAsset implements Contract {
    @property("token_id")
    tokenId: string;

    @typed(Blockchain)
    @property("blockchain")
    blockchain: Blockchain;

    constructor(contractAddress: string, name: string, logoUrl: string, tokenId: string, blockchain: Blockchain) {
        super(contractAddress, name, logoUrl);
        this.tokenId = tokenId;
        this.blockchain = blockchain;
    }

    get chainName(): string {
        return this.name;
    }

    get chainLogo(): string {
        return this.logoUrl;
    }

    get blockchainName(): string {
        return this.blockchain.blockchainName;
    }

    get chainType(): ChainType {
        return ChainType.Nft;
    }

    isNativeToken(): boolean {
        return false;
    }
}


export class Donation extends DestinationAsset implements Contract {
    @typed(Token)
    @property("token")
    token: Token;

    constructor(contractAddress: string, name: string, logoUrl: string, token: Token) {
        super(contractAddress, name, logoUrl);
        this.token = token;
    }

    get chainName(): string {
        return this.token.tokenData.symbol;
    }

    get chainLogo(): string {
        return this.token.tokenData.logoUrl;
    }

    get blockchainName(): string {
        return this.token.blockchain.blockchainName;
    }

    get chainType(): ChainType {
        return ChainType.Donation;
    }

    isNativeToken(): boolean {
        return false;
    }
}