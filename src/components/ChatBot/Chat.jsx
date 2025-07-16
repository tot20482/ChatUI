import up from "../../assets/up-arrow.png";

export default function Chat() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="mb-8 w-full flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Bạn muốn hỏi cái gì?</h1>
      </div>
      <div className="flex flex-row justify-between items-center w-[60%] bg-primary-600 rounded-2xl gap-4 mt-4 border-[1px] border-gray-200 shadow">
        <div className="w-full h-full p-4">
          <textarea
            placeholder="Hãy nhập câu hỏi của bạn..."
            className="font-normal text-[14px] text-primary-500 h-[60px] w-full px-4 rounded-l-2xl bg-primary-600 no-focus focus:outline-none focus:ring-0 overflow-auto custom-scrollbar-navbar resize-none"
          />
        </div>
        <button className="cursor-pointer mr-4 flex justify-center items-center w-[40px] h-[40px] rounded-full bg-primary-400 aspect-square bg-gray-100">
          <img src={up} alt="icon up" className="w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
}
