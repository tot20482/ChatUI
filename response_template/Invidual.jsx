import mockData from "../mocks";

const Individual = ({ setIsIndividual }) => {
  return (
    <div
      className="
            fixed inset-0 z-50  
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm 
            cursor-pointer
          "
      onClick={() => setIsIndividual(false)}
    >
      <div
        className="flex flex-col justify-between items-center relative w-[50%] rounded-xl bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap justify-center gap-12">
          {mockData.personal_risk_analysis.map((item, index) => (
            <div
              key={item.entry_id}
              className="flex flex-col items-center mx-8"
            >
              <h3 className="text-3xl font-bold text-gray-800">
                Tội {index + 1}
              </h3>
              <div className="w-28 h-1 bg-black my-1" />
              <p className="text-center text-md text-gray-600 mt-1">
                {item.characteristics.violation_type}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsIndividual(false)}
          className="
                mt-12 mx-auto block px-6 py-2 rounded-md
                bg-red-500 text-white font-semibold
                transition-all hover:brightness-110s
                cursor-pointer
              "
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Individual;