import { Badge, Col, Container, Image, Row, Stack } from "react-bootstrap";
import logo from "../../assets/logo.png";
import SignupForm from "../../components/Signup/signupForm";

const SignupPage = () => {
  return (
    <Container>
      <Row className="vh-100">
        <Col className="d-flex">
          <Stack className="justify-content-center align-items-center">
            <Image src={logo} height={300} width={300} />
            <Stack direction="horizontal" className="justify-content-center">
              <h3 className="mx-2">Gadget Galaxy</h3>
              <Badge bg="info">ADMIN</Badge>
            </Stack>
            <pre>Where innovation meets imagination</pre>
          </Stack>
        </Col>

        <Col className="d-flex justify-content-center align-items-center">
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
