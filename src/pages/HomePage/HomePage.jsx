import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { Carousel } from "@/components";
import { Page } from "@/styles";
import {
  HeroSection,
  HeroText,
  HeroHighlight,
  CTALink,
} from "./HomePage.styles";

const HomePage = () => {
  const { productsData, setAppPosition } = useOutletContext();

  useEffect(() => setAppPosition(AppPosition.HOME), [setAppPosition]);

  return (
    <Page>
      <Carousel productsData={productsData} />
      <HeroSection>
        <HeroText>
          I can't believe it's not
          <br />
          <HeroHighlight>BUYABLE</HeroHighlight>
        </HeroText>
        <CTALink to="/shop">Explore Products</CTALink>
      </HeroSection>
    </Page>
  );
};

export default HomePage;
