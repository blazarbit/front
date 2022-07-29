import styles from './layout.module.css'
import React, {FunctionComponent} from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import {Content} from "./content";
import {Box} from "@mui/material";

interface Props {
    children: React.ReactNode
}

export const Layout: FunctionComponent<Props> = ({children}) => {
    return (
        <Box className={styles.container}>
            <Header/>
            <Content/>
            <Footer/>
        </Box>
    );
}