import { useState, useRef } from "react"
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { Link } from 'react-router-dom'

type FindAccountForm = {
  email: string
}

function RequestForgotPasswordLink() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FindAccountForm>()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const onSubmit = async (data: FindAccountForm) => {
    try {
      if (!captchaToken) return
      
      console.log('data: ', data)

      reset()
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    } catch (error) {
      console.error('Registration failed:', error)
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    }
  }

  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <form className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start" onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
          <p className="text-left text-[22px] text-black leading-7">Forgot Password</p>
          <p className="text-left text-[14px] text-black leading-5">Provide your account's email  for which you want to reset your password</p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="email" className="text-left text-[14px] font-semibold leading-5">Email <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              id="email"
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px] outline-none leading-4"
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Email is invalid'
                }
              })}
            />
            {errors.email && <p className="text-left text-[12px] text-red-500 leading-4">{errors.email.message}</p>}  
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
          {!captchaToken && (
            <p className="text-left text-[12px] text-red-500 leading-4">
              Please verify that you are not a robot
            </p>
          )}
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <button
            className={`w-full h-auto text-white font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 ${isSubmitting || !captchaToken ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
            type="submit"
            disabled={isSubmitting || !captchaToken}
          >
            {isSubmitting ? 'Loading...' : 'Request Reset Password Link'}
          </button>

          <div className='w-full h-auto flex items-center justify-between'>
            <Link to="/login" className="text-blue-500 hover:underline text-[14px] leading-5">Back to Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RequestForgotPasswordLink;