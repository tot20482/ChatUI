import { useState } from "react";

const NewsPopup = ({ isOpen, onClose, newsData, loading }) => {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-[80%] max-h-[80vh] rounded-xl bg-white p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Bài báo liên quan</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Đang tải bài báo...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {newsData ? (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Media ID: {newsData.media_id || 'N/A'}
                </h4>
                <div className="text-sm text-gray-600">
                  {newsData.content ? (
                    <div>
                      {typeof newsData.content === 'string' ? (
                        <p className="whitespace-pre-wrap">{newsData.content}</p>
                      ) : (
                        <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(newsData.content, null, 2)}
                        </pre>
                      )}
                    </div>
                  ) : (
                    <p>Không có nội dung chi tiết</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Không có dữ liệu</p>
            )}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

const Organization = ({ setIsOrganization, organizationData }) => {
  const [newsPopup, setNewsPopup] = useState({ isOpen: false, data: null, loading: false, error: null });
  
  if (!organizationData) return null;
  
  const orgEntries = Object.entries(organizationData);
  
  const handleViolationClick = async (mediaId, violationType) => {
    setNewsPopup({ isOpen: true, data: null, loading: true, error: null });
    
    try {
      const response = await fetch(`http://localhost:8000/media/${mediaId}`);
      const result = await response.json();
      
      if (response.ok && result.success) {
        setNewsPopup({ 
          isOpen: true, 
          data: result, 
          loading: false, 
          error: null 
        });
      } else {
        const errorMessage = result.error || `Failed to fetch media: ${response.statusText}`;
        console.error('Failed to fetch media:', errorMessage);
        setNewsPopup({ 
          isOpen: true, 
          data: null, 
          loading: false, 
          error: errorMessage 
        });
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setNewsPopup({ 
        isOpen: true, 
        data: null, 
        loading: false, 
        error: error.message 
      });
    }
  };
  
  const closeNewsPopup = () => {
    setNewsPopup({ isOpen: false, data: null, loading: false, error: null });
  };
  
  return (
    <>
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
          className="flex flex-col justify-between items-center relative w-[70%] max-h-[80vh] rounded-xl bg-white p-10 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Phân tích rủi ro Tổ chức</h2>
          
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {orgEntries.map(([orgName, violations], orgIdx) => (
              <div key={orgName} className="w-full mb-8 border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
                  {orgName}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(violations).map(([violationType, details], idx) => (
                    <div 
                      key={violationType} 
                      className="flex flex-col items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleViolationClick(details.media_id, violationType)}
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Vi phạm {idx + 1}
                      </h4>
                      <div className="w-20 h-1 bg-red-500 my-2" />
                      <p className="text-center text-sm text-gray-700 leading-snug mb-2">
                        <strong>Loại:</strong> {violationType}
                      </p>
                      <p className="text-center text-sm text-gray-600 mb-2">
                        <strong>Vai trò:</strong> {details.customer_role}
                      </p>
                      <p className="text-center text-sm text-gray-600 mb-2">
                        <strong>Tình trạng:</strong> {details.legal_status}
                      </p>
                      <p className="text-xs text-blue-500 mt-2">
                        Click để xem bài báo
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setIsOrganization(false)}
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
      
      <NewsPopup 
        isOpen={newsPopup.isOpen}
        onClose={closeNewsPopup}
        newsData={newsPopup.data}
        loading={newsPopup.loading}
      />
      
      {/* Error handling */}
      {newsPopup.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-70">
          <p className="text-sm">Lỗi: {newsPopup.error}</p>
          <button 
            onClick={() => setNewsPopup(prev => ({ ...prev, error: null }))}
            className="text-xs underline mt-1"
          >
            Đóng
          </button>
        </div>
      )}
    </>
  );
};

export default Organization; 