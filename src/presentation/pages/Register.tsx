import { useState, useRef } from "react"
import Visibility24pxGray300Icon from '../assets/images/svg/visibility_24px_gray_300.svg'
import VisibilityOff24pxGray300Icon from '../assets/images/svg/visibility_off_24px_gray_300.svg'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import type RegisterUserRequestDto from "../../infrastructure/dto/request/RegisterUserRequestDto"
import { registerUser } from "../store/user/userThunks"
import UserMapper from "../../infrastructure/mappers/UserMapper"

type RegisterForm = {
  username: string
  email: string
  phoneNumber: string
  fullname: string
  password: string
}

function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterForm>()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const navigate = useNavigate()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const dispatch = useAppDispatch()

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const onSubmit = async (formData: RegisterForm) => {
    try {
      if (!captchaToken) return

      const registerUserPayload: RegisterUserRequestDto = {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        fullname: formData.fullname,
        password: formData.password,
        captchaToken
      }
      await dispatch(registerUser(UserMapper.toRegisterUserDomain(registerUserPayload))).unwrap()

      reset()
      recaptchaRef.current?.reset()
      setCaptchaToken(null)

      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    }
  }

  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <form className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start" onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <div className="w-full h-auto">
          <p className="text-left text-[22px] text-black leading-7">Register Account</p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="username" className="text-left text-[14px] font-semibold leading-5">Username <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              id="username"
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px] outline-none leading-4"
              placeholder="Username"
              type="text"
              autoFocus
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
            {errors.username && <p className="text-left text-[12px] text-red-500 leading-4">{errors.username.message}</p>}
          </div>
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

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="phoneNumber" className="text-left text-[14px] font-semibold leading-5">Phone Number <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              id="phoneNumber"
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px] outline-none leading-4"
              placeholder="Phone Number"
              type="text"
              {...register('phoneNumber', {
                required: 'Phone Number is required',
                pattern: {
                  value: /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/,
                  message: 'Phone Number is invalid'
                }
              })}
            />
            {errors.phoneNumber && <p className="text-left text-[12px] text-red-500 leading-4">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="fullname" className="text-left text-[14px] font-semibold leading-5">Fullname <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              id="fullname"
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px] outline-none leading-4"
              placeholder="Fullname"
              type="text"
              {...register('fullname', {
                required: 'Fullname is required',
              })}
            />
            {errors.fullname && <p className="text-left text-[12px] text-red-500 leading-4">{errors.fullname.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="password" className="text-left text-[14px] font-semibold leading-5">Password <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <div className="w-full h-auto flex items-center justify-between rounded-lg border-2 border-gray-300 overflow-hidden px-4">
              <input
                id='password'
                className="w-full h-auto py-2 cursor-text text-left text-[12px] outline-none leading-4"
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
                    noSpaces: (value) => !/\s/.test(value) || "Password must not contain space",
                  },
                })}
              />
              <button
                type='button'
                className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 flex items-center justify-center cursor-pointer'
                onClick={handleTogglePasswordVisibility}
              >
                <img
                  className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 object-contain object-center'
                  src={isPasswordVisible ? Visibility24pxGray300Icon : VisibilityOff24pxGray300Icon}
                  alt='Toggle Password Visibility'
                />
              </button>
            </div>
            {errors.password && <p className="text-left text-[12px] text-red-500 leading-4">{errors.password.message}</p>}
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
            {isSubmitting ? 'Loading...' : 'Register'}
          </button>

          <div className='w-full h-auto flex items-center justify-between'>
            <Link to="/login" className="text-blue-500 hover:underline text-[14px] leading-5">Do you have an account? Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register