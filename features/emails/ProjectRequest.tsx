import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function NewProjectRequest({ name, email, phone, company, businessArea, budget, message, deadline }) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>En ny förfrågan har kommit in</Text>
          <Text style={paragraph}>Namn: {name}</Text>
          <Text style={paragraph}>Email: {email}</Text>
          <Text style={paragraph}>Telefon: {phone}</Text>
          <Text style={paragraph}>Företag: {company}</Text>
          <Text style={paragraph}>Bransch: {businessArea}</Text>
          <Text style={paragraph}>Budget: {budget}</Text>
          <Text style={paragraph}>Deadline: {deadline}</Text>
          <Text style={messageTitle}>Meddelande:</Text>
          <Text style={messageCopy}>{message}</Text>
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
