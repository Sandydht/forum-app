import OtpInput from "react-otp-input"
import { useState } from "react"

function VerificationCodeForgotPassword({ resendCode }: { resendCode: () => void }) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState(false)

  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <div className="w-full h-auto p-4 max-w-150 bg-white rounded-xl shadow-lg border border-gray-200 gap-10 flex flex-col items-start justify-start">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
          <p className="text-left text-[22px] text-black leading-7">Code Verification</p>
          <p className="text-left text-[14px] text-black leading-5">Enter OTP (One tone password) sent to user@email.com</p>
        </div>

        <div className="w-full h-auto">
          <OtpInput
            value={otp}
            onChange={(val) => {
              setOtp(val)
              setError(false)
            }}
            numInputs={6}
            inputType="tel"
            containerStyle="flex gap-3 justify-center"
            inputStyle={{
              width: "56px",
              height: "56px",
              borderRadius: "8px",
              border: error ? "2px solid #ef4444" : "2px solid #e5e7eb",
              fontSize: "16px",
              textAlign: "center",
              outline: "none",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2.5">
          <button
            type="submit"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
          >
            Verify Code
          </button>

          <button
            type="button"
            className="w-full h-auto font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 cursor-pointer text-blue-500 border-2 border-blue-500 hover:border-blue-600 hover:text-blue-600"
            onClick={resendCode}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationCodeForgotPassword