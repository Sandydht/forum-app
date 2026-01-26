/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getUserProfile } from "../store/user/userThunks"

function Home() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile.data)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await dispatch(getUserProfile()).unwrap()
      } catch (error: any) {
        console.error('Failed to fetch user profile:', error)
      }
    }

    fetchUserProfile()
  }, [dispatch])

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      <div className="w-full h-auto px-6.25 py-4 bg-white shadow-md border-b border-gray-200 bg-linear-to-t from-sky-500 to-indigo-500">
        <p className="text-left text-[16px] font-semibold line-height-[24px] text-white">
          Forum App
        </p>
      </div>
      <div className="w-full h-full max-h-[calc(100vh-57px)] overflow-y-auto p-6.25 flex flex-col items-start justify-start">
        <div className="min-h-screen">
          <p>Home Page</p>
          <p>{profile?.fullname}</p>
        </div>
      </div>
    </div>
  )
}

export default Home