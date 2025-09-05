import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export function GenericMail({ title, props }) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>{title}</Text>
          {Object.entries(props).map(([key, value]) => (
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
  backgroundColor: "#ffffff"
};

const container = {
  margin: "0 auto",
  padding: "21px 21px 21px 21px",
  width: "580px",
  maxWidth: "100%"
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.15",
  fontWeight: "700",
  color: "#000"
};

const paragraph = {
  fontSize: "21",
  lineHeight: "1.5",
  color: "#333"
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
