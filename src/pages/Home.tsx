import { useEffect, useState } from "react"
import { getUserProfileAction } from "../api/user.api";

interface UserProfile {
  id: string;
  username: string;
  fullname: string;
}

function Home() {
  const [user, setUser] = useState<UserProfile | null>(null)

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfileAction()
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  useEffect(() => {
    (async () => {
      if (!user) {
        await fetchUserProfile()
      }
    })()
  }, [user])

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      <div className="w-full h-auto px-6.25 py-4 bg-white shadow-md border-b border-gray-200 bg-linear-to-t from-sky-500 to-indigo-500">
        <p className="text-left text-[16px] font-semibold line-height-[24px] text-white">
          Forum App
        </p>
      </div>
      <div className="w-full h-full max-h-[calc(100vh-57px)] overflow-y-auto p-6.25 flex flex-col items-start justify-start">
        <div className="min-h-screen">
          <p>{user?.fullname}</p>
        </div>
      </div>
    </div>
  )
}

export default Home