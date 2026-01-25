function ResendVerficiationCodeForgotPassword({ resendCode, changeEmailAddress }: { resendCode: () => void, changeEmailAddress: () => void }) {
  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <div className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
          <p className="text-left text-[22px] text-black leading-7">Forgot Password</p>
          <p className="text-left text-[14px] text-black leading-5">you will receive an email with a verification code to reset your password. Please chech your inbox</p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2.5">
          <button
            type="button"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
            onClick={resendCode}
          >
            Resend verification code
          </button>

          <button
            type="button"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer text-blue-500 border-2 border-blue-500 hover:border-blue-600 hover:text-blue-600"
            onClick={changeEmailAddress}
          >
            Change Email Address
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResendVerficiationCodeForgotPassword