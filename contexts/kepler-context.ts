import {createContext, useContext} from "react";
import {Keplr} from "@keplr-wallet/types";

export type KeplerContextSetting = {
    kepler?: Keplr;
    setKepler: (k: Keplr) => void;
    keplerLoaded: boolean;
    setKeplerLoaded: (b: boolean) => void;
}

export const KeplerContext = createContext<KeplerContextSetting>({
    kepler: undefined,
    setKepler: () => {},
    keplerLoaded: false,
    setKeplerLoaded: () => {}
});

export const useKeplerContext = () => useContext(KeplerContext);