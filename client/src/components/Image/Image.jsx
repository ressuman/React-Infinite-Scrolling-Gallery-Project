import PropTypes from "prop-types";

export const Image = ({ url, image }) => {
  return (
    <div className="image-item">
      <img src={url} alt={image.alt_description} />
    </div>
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};
