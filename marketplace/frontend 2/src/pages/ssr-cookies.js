import React from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const Home = () => {
  return <div>page content</div>;
};

export const getServerSideProps = ({ req, res }) => {
  setCookie("test", "value", { req, res, maxAge: 60 * 6 * 24 });
  getCookie("test", { req, res });
  getCookies({ req, res });
  deleteCookie("test", { req, res });

  return { props: {} };
};

export default Home;
