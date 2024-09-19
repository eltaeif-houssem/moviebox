import React from "react";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";

// Define the props interface
interface ImageProps {
  src?: string; // Optional URL for the image
  alt?: string; // Optional alt text for the image
  className?: string; // Optional CSS class name
}

const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, className } = props;
  return (
    <img src={`${TMDB_V3_IMAGE_API}${src}`} alt={alt} className={className} />
  );
};

export default Image;
