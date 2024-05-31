import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image } from "../Image/Image";

export const Images = () => {
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_PROXY_LOCAL_HOST_PORT
        }/api/photos?per_page=${perPage}&page=${page}`
      );
      const newImages = response.data;
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="images">
      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          fetchImages();
        }}
        hasMore={true}
        loader={
          <div>
            <h4>Loading...</h4>
            <img
              src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
              alt="loading"
            />
          </div>
        }
      >
        <div className="image-grid" style={{ marginTop: "30px" }}>
          {images?.map((image, index) => (
            <Image url={image.urls.regular} image={image} key={index} />
          ))}
        </div>
      </InfiniteScroll>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
    </div>
  );
};
