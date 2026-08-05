
const ButtonTailwind = ({ label, primary }) => {
  return (
    <button
      className={`text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ${
        primary ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-500 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonTailwind;
          