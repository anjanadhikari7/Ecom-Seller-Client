import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import forgotImage from "../../assets/forgotImage.png";

import { useState } from "react";

import OTPForm from "../../components/ResetPassword/OTPForm";
import EmailForm from "../../components/ResetPassword/EmailForm";

const ResetEmailPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <Container>
      <Row className="vh-100">
        <Col className="d-flex">
          <Stack className="justify-content-center align-items-center">
            <h2>Forgot Password?</h2>
            <Image src={forgotImage} height={300} width={300} />
            <Stack direction="horizontal" className="justify-content-center">
              <h3 className="mx-2">ECOM DEN</h3>
              <Badge bg="info">ADMIN</Badge>
            </Stack>
            <pre>
              Empowering Your E-Commerce Empire: Manage, Analyze, and Thrive.
            </pre>
          </Stack>
        </Col>
        {isEmailSent ? (
          <OTPForm />
        ) : (
          <EmailForm setIsEmailSent={setIsEmailSent} />
        )}
      </Row>
    </Container>
  );
};

export default ResetEmailPage;
