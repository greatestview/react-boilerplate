import React, { useState } from "react";
import settings from "../data/settings";
import Box from "./Box";
import styles from "./App.module.css";

export default () => {
  return (
    <div className={styles.App}>
      <h1>I am App.</h1>
      <Box />
    </div>
  );
};
