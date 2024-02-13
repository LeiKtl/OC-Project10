import PropTypes from "prop-types";

import "./style.scss";

const PeopleCard = ({ imageSrc, imageAlt, position, name }) => (
    <div className="PeopleCard">
      <div className="PeopleCard__imageContainer">
        <img className="PeopleCard__image" data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      </div>
      <div className="PeopleCard__descriptionContainer">
        <div data-testid="card-name-testid" className="PeopleCard__name">{name}</div>
        <div data-testid="card-position-testid" className="PeopleCard__position">{position}</div>
      </div>
    </div>
  );

PeopleCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

PeopleCard.defaultProps = {
  imageAlt: "",
}

export default PeopleCard;
