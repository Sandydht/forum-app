import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../api/auth.api'
import { setSecureItem } from '../utils/secureStorage.utils'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from "react"
import Visibility24pxGray300Icon from '../assets/images/svg/visibility_24px_gray_300.svg'
import VisibilityOff24pxGray300Icon from '../assets/images/svg/visibility_off_24px_gray_300.svg'

type LoginForm = {
  username: string
  password: string
}

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()
  const navigate = useNavigate()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  } 

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      if (!captchaToken) return

      const response = await loginAction(data.username, data.password)

      setSecureItem('accessToken', response.data.accessToken)
      setSecureItem('refreshToken', response.data.refreshToken)

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="w-full h-full min-h-screen pt-50 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <form className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-auto">
          <p className="text-left text-[22px] text-black">Login Page</p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label className="text-left text-[14px] font-semibold">Username <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px] outline-none"
              placeholder="Username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                maxLength: {
                  value: 50,
                  message: 'Username cannot exceed 50 characters'
                },
                pattern: {
                  value: /^[\w]+$/,
                  message: 'Username cannot contain special characters'
                }
              })}
            />
            {errors.username && <p className="text-left text-[12px] text-red-500">{errors.username.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label className="text-left text-[14px] font-semibold">Password <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <div className="w-full h-auto flex items-center justify-between rounded-lg border-2 border-gray-300 overflow-hidden px-4">
              <input
                className="w-full h-auto py-2 cursor-text text-left text-[14px] outline-none"
                placeholder="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { 
                    value: 8, 
                    message: "Password must be at least 8 characters"
                  },
                  validate: { 
                    hasLetterAndNumber: (value) => /[A-Za-z]/.test(value) && /\d/.test(value) || "Password must contain both letters and numbers", 
                    noSpaces: (value) => !/\s/.test(value) || "Password must not contain space", },
                })}
              />
              <button
                type='button'
                className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 flex items-center justify-center cursor-pointer'
                onClick={handleTogglePasswordVisibility}
              >
                <img
                  className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 object-contain object-center'
                  src={isPasswordVisible ? VisibilityOff24pxGray300Icon : Visibility24pxGray300Icon}
                  alt='Toggle Password Visibility'
                />
              </button>
            </div>
            {errors.password && <p className="text-left text-[12px] text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
          {!captchaToken && (
            <p className="text-left text-[12px] text-red-500">
              Please verify that you are not a robot
            </p>
          )}
        </div>

        <div className="w-full h-auto">
          <button
            className={`w-full h-auto text-white font-bold py-2 px-4 rounded-lg text-center text-[14px] ${!captchaToken ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
            type="submit"
            disabled={isSubmitting || !captchaToken}
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login