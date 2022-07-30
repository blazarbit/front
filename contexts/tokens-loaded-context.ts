import {createContext, useContext} from "react";

export type TokenLoadedSetting = {
    tokensLoaded: boolean
    setTokensLoaded: (b: boolean) => void
}

export const TokensLoadedContext = createContext<TokenLoadedSetting>({
    tokensLoaded: false,
    setTokensLoaded: () => {}
});

export const useTokensLoadedContext = () => useContext(TokensLoadedContext);