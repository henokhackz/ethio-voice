"use client";
import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";

// Sample user data
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Moderator",
  },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "User" },
];

const Users = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle user deletion
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle user editing (placeholder function)
  const handleEdit = (id: number) => {
    alert(`Edit user with id: ${id}`);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-start">Manage Users</h2>

      {/* Search bar */}
      <div className="mb-4 w-full flex justify-start">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6 text-center flex justify-between gap-2">
                    <Pen
                      size={20}
                      onClick={() => handleEdit(user.id)}
                      className="cursor-pointer text-pretty text-primary"
                    />

                    <Trash
                      size={20}
                      onClick={() => handleDelete(user.id)}
                      className="cursor-pointer text-red-300"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 px-6 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
