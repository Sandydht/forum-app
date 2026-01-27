import { useState } from "react"
import { useForm } from 'react-hook-form'
import Visibility24pxGray300Icon from '../assets/images/svg/visibility_24px_gray_300.svg'
import VisibilityOff24pxGray300Icon from '../assets/images/svg/visibility_off_24px_gray_300.svg'
import { Link } from "react-router-dom"
import ArrowBack24pxBlackIcon from "../assets/images/svg/arrow_back_24px_black.svg"
import { useSearchParams } from "react-router-dom";
import type { ResendPasswordResetTokenRequestDto } from "../../infrastructure/dto/request/ResendPasswordResetTokenRequestDto"
import { useAppDispatch } from '../store/hooks'
import { resendPasswordResetToken } from "../store/auth/authThunks"
import AuthMapper from "../../infrastructure/mappers/AuthMapper"

type UpdatePasswordForm = {
  newPassword: string
  retypeNewPassword: string
}

function UpdatePassword() {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(false)
  const [isReTypePasswordVisible, setIsReTypePasswordVisible] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<UpdatePasswordForm>()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch()

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible)
  }
  const handleToggleReTypePasswordVisibility = () => {
    setIsReTypePasswordVisible(!isReTypePasswordVisible)
  }

  const onSubmit = async (formData: UpdatePasswordForm) => {
    try {
      if (!token) return

      
      console.log('Update password to:', formData, token)
    } catch (error) {
      console.error('Update password failed:', error)
    }
  }

  const handleResendPasswordResetToken = async () => {
    try {
      if (!token) return

      const payload: ResendPasswordResetTokenRequestDto = {
        token
      }

      await dispatch(resendPasswordResetToken(AuthMapper.toResendPasswordResetTokenDomain(payload))).unwrap()
    } catch (error) {
      console.error('Resend password reset token failed:', error)
    }
  }

  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <form className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start" onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <div className="w-full h-auto flex items-center justify-start gap-2">
          <Link to="/login" className="text-blue-500 hover:underline text-[14px] leading-5">
            <img 
              src={ArrowBack24pxBlackIcon}
              alt="Arrow back icon"
              className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
            />
          </Link>
          <p className="text-left text-[22px] text-black leading-7">New Credentials</p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="newPassword" className="text-left text-[14px] font-semibold leading-5">New Password <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <div className="w-full h-auto flex items-center justify-between rounded-lg border-2 border-gray-300 overflow-hidden px-4">
              <input
                id='newPassword'
                className="w-full h-auto py-2 cursor-text text-left text-[12px] outline-none leading-4"
                placeholder="New Password"
                type={isNewPasswordVisible ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'New Password is required',
                  minLength: {
                    value: 8,
                    message: "New Password must be at least 8 characters"
                  },
                  validate: {
                    hasLetterAndNumber: (value) => /[A-Za-z]/.test(value) && /\d/.test(value) || "New Password must contain both letters and numbers",
                    noSpaces: (value) => !/\s/.test(value) || "New Password must not contain space",
                  },
                })}
              />
              <button
                type='button'
                className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 flex items-center justify-center cursor-pointer'
                onClick={handleToggleNewPasswordVisibility}
              >
                <img
                  className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 object-contain object-center'
                  src={isNewPasswordVisible ? Visibility24pxGray300Icon : VisibilityOff24pxGray300Icon}
                  alt='Toggle Password Visibility'
                />
              </button>
            </div>
            {errors.newPassword && <p className="text-left text-[12px] text-red-500 leading-4">{errors.newPassword.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label htmlFor="retypeNewPassword" className="text-left text-[14px] font-semibold leading-5">Re-type Password <span className="text-red-500">*</span></label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <div className="w-full h-auto flex items-center justify-between rounded-lg border-2 border-gray-300 overflow-hidden px-4">
              <input
                id='retypeNewPassword'
                className="w-full h-auto py-2 cursor-text text-left text-[12px] outline-none leading-4"
                placeholder="Re-type Password"
                type={isReTypePasswordVisible ? 'text' : 'password'}
                {...register('retypeNewPassword', {
                  required: 'Re-type Password is required',
                  minLength: {
                    value: 8,
                    message: "Re-type Password must be at least 8 characters"
                  },
                  validate: {
                    hasLetterAndNumber: (value) => /[A-Za-z]/.test(value) && /\d/.test(value) || "Re-type Password must contain both letters and numbers",
                    noSpaces: (value) => !/\s/.test(value) || "Re-type Password must not contain space",
                  },
                })}
              />
              <button
                type='button'
                className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 flex items-center justify-center cursor-pointer'
                onClick={handleToggleReTypePasswordVisibility}
              >
                <img
                  className='w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 object-contain object-center'
                  src={isReTypePasswordVisible ? Visibility24pxGray300Icon : VisibilityOff24pxGray300Icon}
                  alt='Toggle Password Visibility'
                />
              </button>
            </div>
            {errors.retypeNewPassword && <p className="text-left text-[12px] text-red-500 leading-4">{errors.retypeNewPassword.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2.5">
          <button
            type="submit"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
          >
            Submit
          </button>

          <button
            type="button"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer text-blue-500 border-2 border-blue-500 hover:border-blue-600 hover:text-blue-600"
            onClick={handleResendPasswordResetToken}
          >
            Resend Verification Token
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword