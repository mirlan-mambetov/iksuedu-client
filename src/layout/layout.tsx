import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Сдать тест</title>
        <meta
          name="description"
          content="Добро пожаловать на сдачу теста онлайн"
        />
      </Helmet>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="px-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
