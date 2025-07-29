import { Page, Heading, Disclaimer } from "./DisclaimerPage.styles";

const DisclaimerPage = () => (
  <Page>
    <Heading>Disclaimer</Heading>
    <Disclaimer>
      Sorry to disappoint you, but this was a fake online store that I built to
      practice React development. Good luck on your shopping endeavours!
      <br />
      <br />
      P.S. Shop responsibly!
    </Disclaimer>
  </Page>
);

export default DisclaimerPage;
