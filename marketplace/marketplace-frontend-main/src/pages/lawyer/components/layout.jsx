import React, { Children } from "react";
import Navbar from "../components/navbar";
import Footer from "@/pages/component/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
