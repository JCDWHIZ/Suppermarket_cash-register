import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          {/* Add your loading spinner here */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        <p className="text-center">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
