import Layout from "@/components/layout";
import { appContext } from "@/context";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@styles/pages/movie/movieDetails.css";

const MovieDetails: React.FC = () => {
  const context = appContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);
  return (
    <Layout dark={true}>
      <div className="movie-details-page">hey</div>
    </Layout>
  );
};

export default MovieDetails;
