import {property, typed} from "class-converter";
import {Blockchain, TokenData} from "./token-properties";

export enum ChainType {
    Token,
    Donation,
    Nft
}

export interface Contract {
    get chainName(): string;

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

    get blockchainName(): string {
        return this.tokenData.baseBlockchain.blockchainName;
    }

    get chainName(): string {
        return this.tokenData.symbol;
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
}

export class NftContract extends DestinationAsset implements Contract {
    @property("token_id")
    tokenId: string;

    @typed(Blockchain)
    @property("blockchain")
    blockchain: Blockchain;

    get chainName(): string {
        return this.name;
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

    get chainName(): string {
        return this.token.tokenData.symbol;
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