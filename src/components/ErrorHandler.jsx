import { useState, useEffect } from 'react';

/**
 * ErrorHandler component for displaying backend error messages
 * @param {Object} props
 * @param {Object} props.responseData - The response data from the API
 * @param {Function} props.onDismiss - Optional callback when error is dismissed
 */
const ErrorHandler = ({ responseData, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    // Check if responseData contains an error message
    if (responseData && 
        responseData.response && 
        responseData.response.message && 
        !responseData.success) {
      setErrorMessage(responseData.response.message);
      setVisible(true);
    } else {
      setVisible(false);
      setErrorMessage('');
    }
  }, [responseData]);
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };
  
  if (!visible || !errorMessage) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto z-50 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Lỗi từ hệ thống</h3>
          <div className="mt-1 text-sm text-red-700">
            {errorMessage}
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-auto flex-shrink-0 bg-red-50 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorHandler; 