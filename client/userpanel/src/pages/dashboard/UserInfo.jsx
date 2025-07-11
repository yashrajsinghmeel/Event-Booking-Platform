import useAuth from "../../hooks/useAuth";

function UserInfo() {
  const { user } = useAuth();
  // Demo user data - in real case, you might fetch from backend
  //   console.log(user.email);
  /**
  //  In this fallback value will only be taken when the entire user object will not exist.
  const safeUser = user || {
    name: "Guest",
    phone: "+91 9876543210",
    email: "notadded@example.com",
  };
  */
// But in this , each field falls back individually 
const safeUser = {
  name: user?.name || "Guest",
  phone: user?.phone || "+91 9876543210",
  email: user?.email || "notadded@example.com",
};
  // console.log(safeUser.email);

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        👤 User Information
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Username</p>
          <p className="text-lg font-semibold text-green-800">
            {safeUser.name}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="text-lg font-semibold text-green-800">
            {safeUser.phone}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg font-semibold text-green-800">
            {safeUser.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
