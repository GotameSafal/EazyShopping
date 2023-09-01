import React from "react";
import styles from "@styles/loading.module.scss";

export default function Loading() {
  return (
    <div class={styles.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
