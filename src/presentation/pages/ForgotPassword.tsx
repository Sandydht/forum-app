import RequestForgotPasswordLink from "../components/RequestForgotPasswordLink";
import UpdatePassword from "../components/UpdatePassword"
import { useSearchParams } from "react-router-dom";

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (token) return <UpdatePassword />
  else return <RequestForgotPasswordLink />
}

export default ForgotPassword