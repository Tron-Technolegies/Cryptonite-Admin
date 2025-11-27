import React from "react";

const Users = () => {
  const dummyUsers = [
    { id: 1, name: "Aswin Binaj", email: "aswin@gmail.com", phone: "9876543210" },
    { id: 2, name: "Parvathi Nair", email: "parvathi@gmail.com", phone: "9544332211" },
    { id: 3, name: "Mohammed Shafi", email: "shafi@gmail.com", phone: "8089001122" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      <div className="bg-white shadow-md rounded-lg border overflow-hidden">
        <table className="w-full border-collapse">
          
          {/* Table Header */}
          <thead className="bg-(--primary-color) text-black">
            <tr>
              <th className="p-4 text-left border-b">ID</th>
              <th className="p-4 text-left border-b">Name</th>
              <th className="p-4 text-left border-b">Email</th>
              <th className="p-4 text-left border-b">Phone</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b">{user.id}</td>
                <td className="p-4 border-b">{user.name}</td>
                <td className="p-4 border-b">{user.email}</td>
                <td className="p-4 border-b">{user.phone}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;
