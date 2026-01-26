import { useEffect, useState } from "react"
import RequestForgotPasswordLink from '../components/RequestForgotPasswordLink'
import ResendVerficiationCodeForgotPassword from "../components/ResendVerficiationCodeForgotPassword"
import VerificationCodeForgotPassword from "../components/VerificationCodeForgotPassword"
import UpdatePassword from "../components/UpdatePassword"
import { useSearchParams } from "react-router-dom";


function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [steps, setSteps] = useState<number>(1)

  useEffect(() => {
    if (token) {
      console.log("Token found:", token); 
    }
  }, [token])

  if (steps === 2) {
    return <ResendVerficiationCodeForgotPassword 
      resendCode={() => setSteps(3)} 
      changeEmailAddress={() => setSteps(1)} 
    /> 
  } else if (steps === 3) {
    return <VerificationCodeForgotPassword 
      resendCode={() => setSteps(2)}
    />
  } else if (steps === 4) {
    return <UpdatePassword />
  } else {
    return <RequestForgotPasswordLink />
  }
}

export default ForgotPassword