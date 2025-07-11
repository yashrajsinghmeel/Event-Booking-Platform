// src/components/Button.jsx
function Button({ text, onClick, disabled = false }) {
  return (
    <div className="group">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] text-white py-3 px-4 rounded-lg font-semibold group-hover:bg-[linear-gradient(to right, rgba(47,97,50,1), rgba(171,137,33,1))] focus:ring-4 focus:ring-[#60c9655e] transition-all duration-200 transform hover:scale-105 hover:cursor-pointer hover:shadow-xl"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
