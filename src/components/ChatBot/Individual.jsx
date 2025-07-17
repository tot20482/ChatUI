const Individual = ({ setIsIndividual, individualData }) => {
  if (!individualData) return null;
  
  const personEntries = Object.entries(individualData);
  
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
        className="flex flex-col justify-between items-center relative w-[70%] max-h-[80vh] rounded-xl bg-white p-10 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Phân tích rủi ro Cá nhân</h2>
        
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {personEntries.map(([personName, violations], personIdx) => (
            <div key={personName} className="w-full mb-8 border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                {personName}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(violations).map(([violationType, details], idx) => (
                  <div key={violationType} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Tội {idx + 1}
                    </h4>
                    <div className="w-20 h-1 bg-green-500 my-2" />
                    <p className="text-center text-sm text-gray-700 leading-snug mb-2">
                      <strong>Loại:</strong> {violationType}
                    </p>
                    <p className="text-center text-sm text-gray-600 mb-2">
                      <strong>Vai trò:</strong> {details.customer_role}
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      <strong>Tình trạng:</strong> {details.legal_status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setIsIndividual(false)}
          className="
                mt-6 mx-auto block px-6 py-2 rounded-md
                bg-red-500 text-white font-semibold
                transition-all hover:brightness-110
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