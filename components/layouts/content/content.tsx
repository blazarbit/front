import {FunctionComponent} from "react";
import styles from "./content.module.css";
import {About} from "../../about";
import {PaymentPanel} from "../../payment-panel";
import {Container, Grid} from "@mui/material";

export const Content: FunctionComponent = () => {
    return (
        <Container sx={{mt: 5, mb: 5, display: 'flex', overflow: 'auto', maxHeight: '70%'}}
                   className={styles.contentContainer}>
            <Grid container columnSpacing={5} height='590px'>
                <Grid item xs={12} md={7}
                      sx={{zIndex: 1, display: 'flex', justifyContent: 'flex-start', height: 'inherit'}}>
                    <About className={styles.aboutPanel}/>
                </Grid>
                <Grid item xs={12} md={5}
                      sx={{zIndex: 1, display: 'flex', justifyContent: 'flex-end', height: 'inherit'}}>
                    <PaymentPanel className={styles.paymentPanel}/>
                </Grid>
            </Grid>
        </Container>
    );
}