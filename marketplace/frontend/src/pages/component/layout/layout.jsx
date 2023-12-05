import React, { Children } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
