import {FunctionComponent, useState} from "react";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Button} from "@mui/material";
import {Contract} from "../../../../apollo-client/data-model";
import {useBlurContext} from "../../../../contexts";
import {TokenSelectorModal} from "../../../modals/token-selector-modal";
import {ChainCard} from "../../../cards/chain-card";

import styles from "./token-selector.module.css";
import classNames from "classnames";

interface Props {
    placeHolder: string;
    isDestinationChain: boolean;
    tokenSelected: boolean;
    setTokenSelected: Function;
    selectedContract?: Contract;
    setSelectedContract: Function;
}

export const TokenSelector: FunctionComponent<Props> = ({
    placeHolder,
    isDestinationChain,
    tokenSelected,
    setTokenSelected,
    selectedContract,
    setSelectedContract
}) => {
    const {setBlurScreen} = useBlurContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setBlurScreen(true);
    }

    const handleSelectedContract = (contract: Contract) => {
        setSelectedContract(contract);
        setTokenSelected(true);
    }

    return (
        <>
            <Button
                className={classNames(styles.tokenSelector, tokenSelected ? styles.tokenSelected : styles.tokenNotSelected)}
                onClick={handleOpen}
            >
                <Box sx={{
                    display: 'flex',
                    alignItem: 'center'
                }}>
                    {selectedContract ? (
                        <Box className={styles.placeHolder}>
                            <ChainCard contract={selectedContract} chainSubCardType={selectedContract.chainType}/>
                        </Box>
                    ) : (
                        <span className={classNames(styles.placeHolder, 'bold18')}>{placeHolder}</span>
                    )}
                </Box>
                <ArrowBackIosIcon className={styles.selectorArrow}/>
            </Button>
            <TokenSelectorModal
                open={open}
                setOpen={setOpen}
                handleSelectedContract={handleSelectedContract}
                isDestinationChain={isDestinationChain}
            />
        </>
    );
}