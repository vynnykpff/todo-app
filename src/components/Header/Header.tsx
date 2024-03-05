import logoImage from "#/icons/logo.svg";
import { ThemeSwitcher } from "@components";
import { ReactNode } from "react";
import styles from "./Header.module.scss";

export const Header = (): ReactNode => {
  return (
    <header className={styles.headerContainer}>
      <img className={styles.headerLogo} src={logoImage} alt="logo image" />
      <h1 className={styles.headerTitle}>
        <span className={styles.headerContent}>to</span>
        <span className={styles.headerContent}>do</span>
      </h1>
      <ThemeSwitcher />
    </header>
  );
};
