function Home() {
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
        </div>
      </div>
    </div>
  )
}

export default Home