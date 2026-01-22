import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../api/auth.api'

type LoginForm = {
  username: string
  password: string
}

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    loginAction(data.username, data.password)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken)
        navigate('/')
      })
      .catch((error) => console.error('Login failed:', error))
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
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[12px]"
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
            <input
              className="w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 border-gray-300 text-left text-[14px]"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password && <p className="text-left text-[12px] text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="w-full h-auto">
          <button
            className="w-full h-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login