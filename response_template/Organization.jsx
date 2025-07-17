import mockData from "../mocks";

const Organization = ({ setIsOrganization }) => {
  const orgList = Array.isArray(mockData)
    ? mockData[0].org_risk_analysis
    : mockData.org_risk_analysis;
  return (
    <div
      className="
            fixed inset-0 z-50  
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm 
            cursor-pointer
          "
      onClick={() => setIsOrganization(false)}
    >
      <div
        className="flex flex-col justify-between items-center relative w-[60%] rounded-xl bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap justify-center gap-12">
          <div className="grid grid-cols-2 gap-y-12 gap-x-14 w-full place-items-center">
            {orgList.map((item, idx) => (
              <div key={item.entry_id} className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-gray-800">
                  Tội {idx + 1}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-600 text-center uppercase leading-snug">
                  {item.organization_name}
                </p>
                <div className="w-24 h-1 bg-black my-2" />
                <p className="text-center text-md text-gray-700 leading-snug">
                  {item.characteristics.violation_type}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsOrganization(false)}
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

export default Organization;