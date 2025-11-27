export default function UserLists({ users }) {
  return (
    <tbody>
      {users.map((u) => (
        <tr key={u._id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3">{u._id}</td>
          <td className="px-4 py-3">{u.name}</td>
          <td className="px-4 py-3">{u.email}</td>

          <td className="px-4 py-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                u.role === "Admin" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
              }`}
            >
              {u.role}
            </span>
          </td>

          <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>

          <td className="px-4 py-3">
            <button className="text-blue-600 hover:underline mr-3">Edit</button>
            <button className="text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
