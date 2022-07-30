import {FunctionComponent, useState} from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import {Content} from "./content";
import {Box} from "@mui/material";
import {BlurContext, TokensLoadedContext} from "../../contexts";

import styles from "./layout.module.css";
import classNames from "classnames";

export const Layout: FunctionComponent = () => {
    const [blurScreen, setBlurScreen] = useState(false);
    const [tokensLoaded, setTokensLoaded] = useState(false);

    return (
        <BlurContext.Provider value={{blurScreen, setBlurScreen}}>
            <TokensLoadedContext.Provider value={{tokensLoaded, setTokensLoaded}}>
                <Box className={classNames(styles.container, blurScreen ? styles.modalBlur : null)}>
                    <Header/>
                    <Content/>
                    <Footer/>
                </Box>
            </TokensLoadedContext.Provider>
        </BlurContext.Provider>
    );
}