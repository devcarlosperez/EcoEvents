import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main
        className={`transition-all duration-300 ${
          isMenuOpen ? "blur-sm" : ""
        }`}
      >
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

