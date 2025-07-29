import { useOutletContext } from "react-router-dom";

import { BackButton } from "@/components";

import { Page, Heading } from "@/styles";

import { Disclaimer } from "./DisclaimerPage.styles";

const DisclaimerPage = () => {
  const { appPosition } = useOutletContext();

  return (
    <Page>
      <BackButton appPosition={appPosition} />
      <Heading>Disclaimer</Heading>
      <Disclaimer>
        Sorry to disappoint you, but this was a fake online store that I built
        to practice React development. Good luck on your shopping endeavours!
        <br />
        <br />
        P.S. Shop responsibly!
      </Disclaimer>
    </Page>
  );
};

export default DisclaimerPage;
