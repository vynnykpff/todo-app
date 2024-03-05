import { THEME } from "@/common/constants/ThemeConstats.ts";
import { Header } from "@/components/Header/Header.tsx";
import { TodoLayout } from "@/components/TodoLayout/TodoLayout.tsx";
import { ThemeContext } from "@/providers/ThemeProvider.tsx";
import { ReactNode, useContext, useEffect } from "react";

export const App = (): ReactNode => {
  const { type } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.dataset.theme = type;
    localStorage.setItem(THEME, type);
  }, [type]);

  return (
    <>
      <Header />
      <TodoLayout />
    </>
  );
};
