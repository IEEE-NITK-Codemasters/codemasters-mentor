export default function FullScreenSpinner() {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
        <div
          className="animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-500 h-16 w-16"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );
  }
  