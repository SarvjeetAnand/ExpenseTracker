const ConfirmationModal = ({ 
  show, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmLabel = "Confirm", 
  confirmVariant = "primary" 
}) => {
  if (!show) return null;

  const getConfirmButtonStyles = () => {
    if (confirmVariant === "danger") {
      return "bg-red-500 hover:bg-red-600 text-white";
    }
    return "bg-blue-500 hover:bg-blue-600 text-white";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex sm:items-center items-center sm:justify-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg transition-colors ${getConfirmButtonStyles()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;