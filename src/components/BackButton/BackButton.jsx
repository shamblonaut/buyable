import { ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";

import { AppPosition } from "@/utils/constants";
import { getPositionRoute } from "@/utils/helpers";

import { ButtonLink } from "./BackButton.styles";

const BackButton = ({ appPosition }) => (
  <ButtonLink to={getPositionRoute(appPosition)}>
    <ChevronLeft />
  </ButtonLink>
);

Navigator.propTypes = {
  appPosition: PropTypes.oneOf(Object.values(AppPosition)),
};

export default BackButton;
