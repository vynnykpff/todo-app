import { ThemeConstants } from "@constants";
import { Button } from "@components";
import { ThemeContext } from "@providers";
import { ReactNode, useContext } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = (): ReactNode => {
  const { type, setType } = useContext(ThemeContext);

  return (
    <Button
      className={styles.switchThemeButton}
      onClick={() => setType(prevState => (prevState === ThemeConstants.LIGHT ? ThemeConstants.DARK : ThemeConstants.LIGHT))}
    >
      {type === ThemeConstants.LIGHT ? <BiMoon /> : <BiSun />}
    </Button>
  );
};
