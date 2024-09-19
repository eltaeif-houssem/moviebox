import React, { useEffect, useState } from "react";
import movieService from "@/services/movie.service";
import { IMovieList } from "@interfaces/movie.interface";
import Layout from "@components/layout";
import Backdrop from "./Backdrop";
import "@styles/pages/home/home.css";

const index: React.FC = () => {
  return (
    <Layout>
      <div className="home-page">
        <Backdrop />
      </div>
    </Layout>
  );
};

export default index;
