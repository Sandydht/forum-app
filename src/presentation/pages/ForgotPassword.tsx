import RequestForgotPasswordLink from "../components/RequestForgotPasswordLink";
import UpdatePassword from "../components/UpdatePassword"
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from '../store/hooks'
import { useEffect, useState } from "react";
import { validatePasswordResetToken } from "../store/auth/authThunks";
import AuthMapper from "../../infrastructure/mappers/AuthMapper";
import type { ValidatePasswordResetTokenRequest } from "../../infrastructure/dto/request/ValidatePasswordResetTokenRequestDto";

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();
  const [invalidToken, setInvalidToken] = useState<boolean>(true)

  useEffect(() => {
    const validateToken = async (token: string) => {
      try {
        const payload: ValidatePasswordResetTokenRequest = { token }
        await dispatch(validatePasswordResetToken(AuthMapper.toValidatePasswordResetTokenDomain(payload))).unwrap()
        setInvalidToken(false)
      } catch (error) {
        console.error('Login failed:', error)
        setInvalidToken(true)
      }
    }

    if (token) validateToken(token)
  }, [token, dispatch])

  if (token) return <UpdatePassword invalidToken={invalidToken} />
  else return <RequestForgotPasswordLink />
}

export default ForgotPassword