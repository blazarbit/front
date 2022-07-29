import styles from './layout.module.css'
import React from "react";
import {Footer} from "./footer";
import {Header} from "./header";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}
