const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-[#38a44a] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-md text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
