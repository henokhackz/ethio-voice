import { PencilIcon, TrashIcon, EyeIcon } from "lucide-react";

const ManageUsers = () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-10-15",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Suspended",
      lastLogin: "2024-10-12",
    },
    // Add more user objects here
  ];

  return (
    <div className="p-5 py-12 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            className="border rounded-lg p-2 shadow-sm focus:ring bg-transparent"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-lg shadow ">
            Add New User
          </button>
        </div>
      </div>

      {/* User Table */}
      <table className="w-full table-auto bg-white shadow-md rounded-lg border border-gray-800/10">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Last Login</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-3">{user.lastLogin}</td>
              <td className="p-3 text-center space-x-2">
                <button className="text-primary ">
                  <EyeIcon className="inline-block w-5 h-5" />
                </button>
                <button className="tex-primary ">
                  <PencilIcon className="inline-block w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-500">
                  <TrashIcon className="inline-block w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">
          Previous
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
