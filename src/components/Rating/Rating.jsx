import { getRatingArray } from "@/utils/helpers";

import {
  Container,
  Stars,
  Star,
  StarShell,
  FillMask,
  StarFill,
  Details,
  RatingValue,
  RatingCount,
} from "./Rating.styles";

const Rating = ({ rating, count }) => {
  return (
    <Container>
      <Stars>
        {getRatingArray(rating).map((starValue, index) => (
          <Star key={index}>
            <StarShell />
            <FillMask $percentage={starValue * 100}>
              <StarFill />
            </FillMask>
          </Star>
        ))}
      </Stars>
      <Details>
        <RatingValue>{rating}</RatingValue>
        <RatingCount>({count})</RatingCount>
      </Details>
    </Container>
  );
};

export default Rating;
