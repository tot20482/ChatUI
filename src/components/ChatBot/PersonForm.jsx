import { useState } from "react";

const PersonForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    hometown: "",
    occupation: "",
    organization: "",

    idNumber: "",
    idIssuedDate: "",
    idIssuedPlace: "",
    mobile: "",
    landline: "",
    email: "",
    immigrationStatus: "",
    residenceAddress: "",
    nationality: "",
    isCitizen: "",
    dateOfBirth: "",
    placeOfBirth: "",
    registeredAddressFrom: "",
    registeredAddressTo: "",
    currentAddress: "",
    currentProvince: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc";
    }

    // Remove age validation - no longer required
    if (
      formData.age &&
      (isNaN(formData.age) ||
        parseInt(formData.age) < 0 ||
        parseInt(formData.age) > 150)
    ) {
      newErrors.age = "Tuổi phải là số từ 0 đến 150";
    }

    // Remove organization validation - no longer required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create query string from form data
      let query = `Tìm kiếm thông tin về ${formData.name}`;

      if (formData.age) {
        query += `, ${formData.age} tuổi`;
      }

      if (formData.gender) {
        query += `, giới tính ${formData.gender}`;
      }

      if (formData.hometown) {
        query += `, quê quán ${formData.hometown}`;
      }

      if (formData.occupation) {
        query += `, chức vụ ${formData.occupation}`;
      }

      if (formData.organization) {
        query += `, làm việc tại ${formData.organization}`;
      }

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
      organization: "",

      idNumber: "",
      idIssuedDate: "",
      idIssuedPlace: "",
      mobile: "",
      landline: "",
      email: "",
      immigrationStatus: "",
      residenceAddress: "",
      nationality: "",
      isCitizen: "",
      dateOfBirth: "",
      placeOfBirth: "",
      registeredAddressFrom: "",
      registeredAddressTo: "",
      currentAddress: "",
      currentProvince: "",
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Thông tin cá nhân
      </h3>

      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Row - Name and Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tuổi
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Nhập tuổi (tùy chọn)"
                min="0"
                max="150"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.age ? "border-red-500" : "border-gray-300"
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
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="hometown"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tổ chức
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Nhập tên tổ chức (tùy chọn)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Fourth Row - CMND, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số CMND/Hộ chiếu
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="CMND hoặc Hộ chiếu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="idIssuedDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ngày cấp
              </label>
              <input
                type="date"
                id="idIssuedDate"
                name="idIssuedDate"
                value={formData.idIssuedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="idIssuedPlace"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nơi cấp
              </label>
              <input
                type="text"
                id="idIssuedPlace"
                name="idIssuedPlace"
                value={formData.idIssuedPlace}
                onChange={handleChange}
                placeholder="Nơi cấp CMND/Hộ chiếu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Fifth Row - Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Điện thoại di động
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="landline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Điện thoại cố định
              </label>
              <input
                type="text"
                id="landline"
                name="landline"
                value={formData.landline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Sixth Row - Immigration and Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="immigrationStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số thị thực/nhập cảnh (nếu có)
              </label>
              <input
                type="text"
                id="immigrationStatus"
                name="immigrationStatus"
                value={formData.immigrationStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quốc tịch
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Seventh Row - Residency Type */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tình trạng cư trú
            </label>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="citizen"
                  name="isCitizen"
                  value="Cư trú"
                  checked={formData.isCitizen === "Cư trú"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="citizen"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Cư trú
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="nonCitizen"
                  name="isCitizen"
                  value="Không cư trú"
                  checked={formData.isCitizen === "Không cư trú"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="nonCitizen"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Không cư trú
                </label>
              </div>
            </div>
          </div>

          {/* Eighth Row - Birth Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="placeOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nơi sinh
              </label>
              <input
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Ninth Row - Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="registeredAddressFrom"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Địa chỉ thường trú (Từ năm)
              </label>
              <input
                type="text"
                id="registeredAddressFrom"
                name="registeredAddressFrom"
                value={formData.registeredAddressFrom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="registeredAddressTo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Đến năm
              </label>
              <input
                type="text"
                id="registeredAddressTo"
                name="registeredAddressTo"
                value={formData.registeredAddressTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Tenth Row - Current Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="currentAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Địa chỉ cư trú hiện tại
              </label>
              <input
                type="text"
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="currentProvince"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tỉnh/Thành phố
              </label>
              <input
                type="text"
                id="currentProvince"
                name="currentProvince"
                value={formData.currentProvince}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 sticky bottom-0 bg-white pb-2">
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
    </div>
  );
};

export default PersonForm;
