import {FunctionComponent, useState} from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import {Content} from "./content";
import {Box} from "@mui/material";
import {BlurContext, KeplerContext, TokensLoadedContext} from "../../contexts";
import {Keplr} from "@keplr-wallet/types";

import styles from "./layout.module.css";
import classNames from "classnames";

export const Layout: FunctionComponent = () => {
    const [blurScreen, setBlurScreen] = useState(false);
    const [tokensLoaded, setTokensLoaded] = useState(false);
    const [kepler, setKepler] = useState<Keplr>();
    const [keplerLoaded, setKeplerLoaded] = useState(false);

    return (
        <KeplerContext.Provider value={{kepler, setKepler, keplerLoaded, setKeplerLoaded}}>
            <BlurContext.Provider value={{blurScreen, setBlurScreen}}>
                <TokensLoadedContext.Provider value={{tokensLoaded, setTokensLoaded}}>
                    <Box className={classNames(styles.container, blurScreen ? styles.modalBlur : null)}>
                        <Header/>
                        <Content/>
                        <Footer/>
                    </Box>
                </TokensLoadedContext.Provider>
            </BlurContext.Provider>
        </KeplerContext.Provider>
    );
}