import { useState } from 'react';
import useAuth from "../../hooks/useAuth";

function UserInfo() {
  const { user } = useAuth();
  
  // Individual field fallbacks
  const safeUser = {
    name: user?.name || "Guest",
    phone: user?.phone || "+91 9876543210",
    email: user?.email || null, // Keep null to show "Add Email" button
  };

  // Edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedName, setEditedName] = useState(safeUser.name);
  const [editedEmail, setEditedEmail] = useState(safeUser.email || "");
  
  // Loading states
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  // Handle name update
  const handleUpdateName = async () => {
    if (editedName.trim() === "" || editedName === safeUser.name) {
      setIsEditingName(false);
      setEditedName(safeUser.name);
      return;
    }

    setIsUpdatingName(true);
    try {
      // TODO: API call to update name
      // await updateUserName(editedName);
      console.log("Updating name to:", editedName);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditingName(false);
      // TODO: Update user context or refetch user data
    } catch (error) {
      console.error("Error updating name:", error);
      // TODO: Show error message to user
    } finally {
      setIsUpdatingName(false);
    }
  };

  // Handle email update
  const handleUpdateEmail = async () => {
    if (editedEmail.trim() === "" || editedEmail === safeUser.email) {
      setIsEditingEmail(false);
      setEditedEmail(safeUser.email || "");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsUpdatingEmail(true);
    try {
      // TODO: API call to update email
      // await updateUserEmail(editedEmail);
      console.log("Updating email to:", editedEmail);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditingEmail(false);
      // TODO: Update user context or refetch user data
    } catch (error) {
      console.error("Error updating email:", error);
      // TODO: Show error message to user
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  // Cancel editing
  const cancelNameEdit = () => {
    setIsEditingName(false);
    setEditedName(safeUser.name);
  };

  const cancelEmailEdit = () => {
    setIsEditingEmail(false);
    setEditedEmail(safeUser.email || "");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-green-200/50 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
            <span className="text-xl sm:text-2xl text-white">👤</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
            User Information
          </h2>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Username Field */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200/50 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm sm:text-base text-green-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">✏️</span>
                  Username
                </label>
                {!isEditingName && (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white transition-all duration-300 group"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">✏️</span>
                  </button>
                )}
              </div>
              
              {isEditingName ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your name"
                    disabled={isUpdatingName}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateName}
                      disabled={isUpdatingName}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingName ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelNameEdit}
                      disabled={isUpdatingName}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-base sm:text-lg lg:text-xl font-bold text-green-800 break-words">
                  {safeUser.name}
                </p>
              )}
            </div>
          </div>

          {/* Phone Field (Read-only) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200/50 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm sm:text-base text-gray-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  Phone Number
                </label>
                <div className="p-1.5 sm:p-2 bg-gray-200/70 backdrop-blur-sm rounded-full shadow-md cursor-not-allowed">
                  <span className="text-sm text-gray-400">🔒</span>
                </div>
              </div>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-700 break-words">
                {safeUser.phone}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Contact support to change
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border border-blue-200/50 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm sm:text-base text-blue-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  Email Address
                </label>
                {!isEditingEmail && (
                  <button
                    onClick={() => setIsEditingEmail(true)}
                    className="p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all duration-300 group"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">
                      {safeUser.email ? "✏️" : "➕"}
                    </span>
                  </button>
                )}
              </div>
              
              {isEditingEmail ? (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    disabled={isUpdatingEmail}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateEmail}
                      disabled={isUpdatingEmail}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingEmail ? "Saving..." : safeUser.email ? "Save" : "Add Email"}
                    </button>
                    <button
                      onClick={cancelEmailEdit}
                      disabled={isUpdatingEmail}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {safeUser.email ? (
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-blue-800 break-words">
                      {safeUser.email}
                    </p>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm sm:text-base text-gray-500 mb-2">No email added</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                        <span>➕</span>
                        <span>Click to add email</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Help Text */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50/50 backdrop-blur-sm rounded-xl border border-green-200/30">
          <p className="text-xs sm:text-sm text-green-700 text-center">
            <span className="font-semibold">💡 Tip:</span> Keep your information updated for better experience. 
            Phone numbers are managed by our support team for security reasons.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;