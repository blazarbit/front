import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: 'https://api.blazarbit.com/v1/graphql',
    cache: new InMemoryCache()
});

export const LOAD_BLOCKCHAIN_NETWORKS_SCRIPT = gql`
query MyQuery {
  blockchains {
    network_id
  }
}
`;

export const LOAD_CHAIN_ELEMENTS_SCRIPT = gql`
query MyQuery {
    tokens {
        denom
        deposited_on: blockchainByBlockchain {
            blockchain_name: name
            blockchain_network_id: network_id
            blockchain_logo_url: logo_url
            gas_price
            rpc_node_address
            protocol_contract_address
            prefix
        }
        token_data: tokens_datum {
            symbol
            base_denom
            logo_url
            symbol_point_exponent
            base_blockchain: blockchain {
                blockchain_name: name
                blockchain_network_id: network_id
            }
        }
    }
    donations {
        address
        logo_url
        name
        token {
            denom
            token_data: tokens_datum {
                symbol
                logo_url
                symbol_point_exponent
            }
            deposited_on: blockchainByBlockchain {
                blockchain_name: name
                blockchain_network_id: network_id
            }
        }
    }
    nfts: nft_contracts {
        address:contract_address
        name
        logo_url
        token_id
        blockchain: blockchainByBlockchain {
            blockchain_name: name
            blockchain_network_id: network_id
        }
    }
}`;