function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start bg-linear-to-t from-sky-500 to-indigo-500">
      <div className="w-full h-auto px-6.25 py-2 bg-white shadow-md border-b border-gray-200">
        <p>App Bar</p>
      </div>
      <div className="w-full h-full max-h-[calc(100vh-41px)] overflow-y-auto p-6.25 flex flex-col items-start justify-start">
        <div className="min-h-screen"></div>
      </div>
    </div>
  )
}

export default Home