import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyUser } from "../../axios/userAxios";
import { toast } from "react-toastify";
import { Container, Spinner, Stack } from "react-bootstrap";

const VerifyEmailPage = () => {
  const [emailVerifying, setEmailVerifying] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  // grab the url parmas

  const [params] = useSearchParams();

  const userEmail = params.get("e");
  const token = params.get("id");

  const navigate = useNavigate();

  // function to verify email

  const verifyEmail = async () => {
    const result = await verifyUser({ userEmail, token });
    setEmailVerifying(false);

    // if user is not verified

    if (result?.status === "error") {
      setEmailVerifying(false);
      toast.error(result.message);
    }

    // if success

    setEmailVerified(true);
  };
  // call api to verify user on page load

  useEffect(() => {
    if (userEmail && token) {
      // verify email
      verifyEmail();
    }
  }, [token, userEmail]);

  return (
    <Container>
      {emailVerifying && (
        <Stack
          gap={4}
          className="vh-100 justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="primary" role="status" />

          <p>Verifying email, Please wait ....</p>
        </Stack>
      )}

      {emailVerified && (
        <Stack
          gap={2}
          className="vh-100 justify-content-center align-items-center"
        >
          <div className="my-4">
            <lord-icon
              src="https://cdn.lordicon.com/twsqddew.json"
              trigger="in"
              delay="100"
              state="in-reveal"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>

          <p>Email successfully verified, You can login now.</p>

          <Link to="/" className="btn btn-lg btn-outline-primary">
            Login Now
          </Link>
        </Stack>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
