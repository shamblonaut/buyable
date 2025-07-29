import styled from "styled-components";
import { LucideStar } from "lucide-react";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

export const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
`;

export const Star = styled.div`
  position: relative;
`;

export const StarShell = styled(LucideStar)`
  fill: #d8d8d8;
  stroke: none;
`;

export const FillMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${(props) => props.$percentage}%;
`;

export const StarFill = styled(LucideStar)`
  max-width: min-content;
  fill: yellow;
  stroke: 1px;
`;

export const Details = styled.span`
  display: flex;
  gap: 8px;
  margin-left: 8px;
`;

export const RatingValue = styled.p`
  font-weight: 500;
`;

export const RatingCount = styled.p`
  font-weight: 300;
`;
