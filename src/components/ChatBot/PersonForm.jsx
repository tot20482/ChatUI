import { useState } from "react";

const PersonForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    hometown: "",
    occupation: "",
    organization: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc";
    }
    
    if (!formData.age.trim()) {
      newErrors.age = "Tuổi là bắt buộc";
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0 || parseInt(formData.age) > 150) {
      newErrors.age = "Tuổi phải là số từ 0 đến 150";
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = "Tổ chức là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create query string from form data
      let query = `Tìm kiếm thông tin về ${formData.name}, ${formData.age} tuổi`;
      
      if (formData.gender) {
        query += `, giới tính ${formData.gender}`;
      }
      
      if (formData.hometown) {
        query += `, quê quán ${formData.hometown}`;
      }
      
      if (formData.occupation) {
        query += `, chức vụ ${formData.occupation}`;
      }
      
      query += `, làm việc tại ${formData.organization}`;
      
      onSubmit(query);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      hometown: "",
      occupation: "",
      organization: ""
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Tìm kiếm thông tin cá nhân
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row - Name and Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Tuổi <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Nhập tuổi"
              min="0"
              max="150"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>
        </div>

        {/* Second Row - Gender and Hometown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender Field */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Chọn giới tính (tùy chọn)</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Hometown Field */}
          <div>
            <label htmlFor="hometown" className="block text-sm font-medium text-gray-700 mb-1">
              Quê quán
            </label>
            <input
              type="text"
              id="hometown"
              name="hometown"
              value={formData.hometown}
              onChange={handleChange}
              placeholder="Nhập quê quán (tùy chọn)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Third Row - Occupation and Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Occupation Field */}
          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
              Chức vụ / Vị trí
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Nhập chức vụ hoặc vị trí (tùy chọn)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Organization Field */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
              Tổ chức <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Nhập tên tổ chức"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.organization ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.organization && (
              <p className="text-red-500 text-xs mt-1">{errors.organization}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang tìm kiếm...
              </span>
            ) : (
              "Tìm kiếm"
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="flex-1 sm:flex-none bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Đặt lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm; 