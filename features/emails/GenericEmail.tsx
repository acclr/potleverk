import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import Font from "./Font";

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
          <Text style={heading}>{subject}</Text>

          {Object.entries(body).map(([key, value]) => (
            <Text key={key} style={paragraph}>
              <strong>{key}</strong>: {value as string}
            </Text>
          ))}
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#fff",
  fontFamily: "'Darker Grotesque', Helvetica, sans-serif"
};

const container = {
  margin: "0 auto",
  padding: "21px 28px",
  width: "580px",
  background: "rgba(0,0,0, 0.05)",
  maxWidth: "100%",
  borderRadius: "8px"
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.15",
  fontWeight: "700",
  color: "#000"
};

const paragraph = {
  fontSize: "21",
  lineHeight: "1.618",
  color: "#black",
  borderBottom: "1px solid rgba(0,0,0, 0.05)",
  margin: "0",
  paddingBottom: "6px",
  paddingTop: "6px"
};

const messageTitle = {
  fontSize: "21",
  fontWeight: "bold",
  lineHeight: "1.5"
};

const messageCopy = {
  display: "block",
  padding: "16px 16px 16px 16px",
  background: "#eee"
};
