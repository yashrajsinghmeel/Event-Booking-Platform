// src/components/Input.jsx
function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6132] focus:border-[#2F6132] outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
      />
    </div>
  );
}

export default Input;
