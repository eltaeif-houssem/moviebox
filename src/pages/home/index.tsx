import React from "react";
import Layout from "@components/layout";
import Backdrop from "./Backdrop";
import "@styles/pages/home/home.css";
import Footer from "@components/footers/Footer";

const index: React.FC = () => {
  return (
    <Layout>
      <div className="home-page">
        <Backdrop />
        <Footer />
      </div>
    </Layout>
  );
};

export default index;
