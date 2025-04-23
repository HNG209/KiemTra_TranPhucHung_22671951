import React from 'react';

const StudentItem = ({ student, onDelete, onEdit }) => {
  return (
    <tr className="hover:bg-blue-50 transition">
      <td className="px-6 py-4 text-gray-800 font-medium text-left">{student.name}</td>
      <td className="px-6 py-4 text-gray-700 text-left">{student.class}</td>
      <td className="px-6 py-4 text-gray-700 text-left">{student.age}</td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex gap-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-sm transition"
            onClick={() => onEdit(student)}
          >
            Sửa
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-sm transition"
            onClick={() => onDelete(student.id)}
          >
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentItem;
