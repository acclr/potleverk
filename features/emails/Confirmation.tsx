import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

const Font = ({ webFont, fontStyle = "normal", fontFamily, fontWeight = 400, fallbackFontFamily }) => {
  const src = webFont ? `src: url(${webFont.url}) format(${webFont.format});` : "";

  return (
    <style>
      {`
          @font-face {
              font-style: ${fontStyle};
              font-family: ${fontFamily};
              font-weight: ${fontWeight};
              mso-font-alt: ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily};
              ${src}
          }

          * {
              font-family: ${fontFamily}, ${
                Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(", ") : fallbackFontFamily
              };
          }
          `}
    </style>
  );
};

export default function GenericEmail({ subject, body }) {
  return (
    <Html>
      <Font
        webFont="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@500;600&display=swap"
        fontFamily="'Darker Grotesque'"
        fallbackFontFamily="sans-serif"
        fontStyle="normal"
        fontWeight={600}
      />

      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Tack för ditt meddelande!</Text>
          <Text style={paragraph}>Vi återkommer så snart vi kan, oftast inom 24h.</Text>
          {/* {Object.entries(body).map(([key, value]) => (
            <Text key={key} style={paragraph}>
              {key}: {value as string}
            </Text>
          ))} */}
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#fff"
};

const container = {
  margin: "0 auto",
  padding: "21px 21px 21px 21px",
  width: "580px",
  maxWidth: "100%"
};

const heading = {
  fontSize: "36px",
  lineHeight: "1.15",
  fontWeight: "600",
  color: "#000"
};

const paragraph = {
  fontSize: "21",
  lineHeight: "1.5",
  color: "#black"
};
