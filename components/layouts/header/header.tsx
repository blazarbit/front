import {FunctionComponent} from "react";

import styles from "./header.module.css"
import {ConnectWallet} from "../../buttons";

export const Header: FunctionComponent = () => {
    return (
        <header className={styles.header}>
            <div className={styles.labelContainer}>
                <a>Logo</a>
                <p>
                    Don&#39;t be an exchange, be an Inter-blockchain Payment System!
                </p>
            </div>
            <ConnectWallet/>
        </header>
    );
}