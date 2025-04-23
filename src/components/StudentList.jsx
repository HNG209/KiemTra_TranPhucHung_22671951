import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: '10A1', age: 16 },
    { id: 2, name: 'Tran Thi B', class: '10A2', age: 17 },
    { id: 3, name: 'Le Van C', class: '11B1', age: 18 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setSuccessMessage('🗑️ Đã xoá sinh viên thành công!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) return;
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    setStudents([...students, { id: newId, ...newStudent, age: parseInt(newStudent.age) }]);
    setNewStudent({ name: '', class: '', age: '' });
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-800">📚 Danh sách sinh viên</h2>

      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-300 rounded-lg text-center font-medium">
          {successMessage}
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium shadow"
        >
          ➕ Thêm sinh viên
        </button>
      </div>

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Thêm sinh viên mới</h3>
            <input
              type="text"
              placeholder="Tên"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Lớp"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <input
              type="number"
              placeholder="Tuổi"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Huỷ
              </button>
              <button
                onClick={handleAddStudent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
