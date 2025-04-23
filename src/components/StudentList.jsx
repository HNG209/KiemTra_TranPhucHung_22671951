import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: '10A1', age: 16 },
    { id: 2, name: 'Tran Thi B', class: '10A2', age: 17 },
    { id: 3, name: 'Le Van C', class: '11B1', age: 18 },
  ]);

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">📚 Danh sách sinh viên</h2>
      <div className="overflow-hidden rounded-xl border border-blue-200 shadow">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Lớp</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Tuổi</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-blue-900 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 text-gray-800 font-medium">{student.name}</td>
                <td className="px-6 py-4 text-gray-700">{student.class}</td>
                <td className="px-6 py-4 text-gray-700">{student.age}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-sm transition"
                    onClick={() => handleDelete(student.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 italic">Không có sinh viên nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
