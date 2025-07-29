import { ChevronLeft } from "lucide-react";

import { getPositionRoute } from "@/utils/helpers";

import { ButtonLink } from "./BackButton.styles";

const BackButton = ({ appPosition }) => (
  <ButtonLink to={getPositionRoute(appPosition)}>
    <ChevronLeft />
  </ButtonLink>
);

export default BackButton;
