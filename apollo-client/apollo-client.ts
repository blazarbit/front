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

export const LOAD_PROTOCOL_INSTRUCTIONS_SCRIPT = gql`
query MyQuery(
  $p_m_blockchain: String, 
  $p_m_denom: String, 
  $d_a_blockchain: String, 
  $d_a_denom: String, 
  $d_a_denom_is_null: Boolean, 
  $d_a_address: String, 
  $d_a_address_is_null: Boolean, 
  $d_a_contract_address: String, 
  $d_a_contract_address_is_null: Boolean
) {
  protocolInstructions: protocol_instructions(
    limit: 1, 
    where: {_and: [
      {payment_method_blockchain: {_eq: $p_m_blockchain}}, 
      {payment_method_denom: {_eq: $p_m_denom}}, 
      {destination_asset_blockchain: {_eq: $d_a_blockchain}}, 
      {_or: [
        {destination_asset_denom: {_eq: $d_a_denom}},
        {_and: [
          {destination_asset_denom: {_is_null: $d_a_denom_is_null}},
          {destination_asset_denom: {_is_null: true}}
        ]}
      ]}, 
      {_or: [
        {destination_asset_address: {_eq: $d_a_address}},
        {_and: [
          {destination_asset_address: {_is_null: $d_a_address_is_null}},
          {destination_asset_address: {_is_null: true}}
        ]}
      ]},
      {_or: [
        {destination_asset_contract_address: {_eq: $d_a_contract_address}},
        {_and: [
          {destination_asset_contract_address: {_is_null: $d_a_contract_address_is_null}},
          {destination_asset_contract_address: {_is_null: true}}
        ]}
      ]}
    ]}) {
  destination_asset_address
  destination_asset_amount
  destination_asset_blockchain
  destination_asset_contract_address
  destination_asset_denom
  fee
  funds
  id
  json_encoded_send_args
  memo
  payment_method_blockchain
  payment_method_denom
  payment_token_amount
}
}
`;