import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [editStudent, setEditStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedClass, setSelectedClass] = useState('Tất cả');

  // Lấy danh sách sinh viên từ localStorage khi component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Hàm cập nhật localStorage mỗi khi danh sách sinh viên thay đổi
  const updateLocalStorage = (updatedStudents) => {
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    updateLocalStorage(updatedStudents);
    setSuccessMessage('🗑️ Đã xoá sinh viên thành công!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) return;
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const updatedStudents = [...students, { id: newId, ...newStudent, age: parseInt(newStudent.age) }];
    updateLocalStorage(updatedStudents);
    setNewStudent({ name: '', class: '', age: '' });
    setShowModal(false);
    setSuccessMessage('✔️ Thêm sinh viên thành công!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditStudent = () => {
    const updatedStudents = students.map(student =>
      student.id === editStudent.id ? { ...editStudent, age: parseInt(editStudent.age) } : student
    );
    updateLocalStorage(updatedStudents);
    setEditStudent(null);
    setSuccessMessage('✏️ Đã cập nhật sinh viên thành công!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const classOptions = ['Tất cả', ...new Set(students.map(s => s.class))];

  const filteredStudents = students.filter(student => {
    const matchName = student.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchClass = selectedClass === 'Tất cả' || student.class === selectedClass;
    return matchName && matchClass;
  });

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-800">📚 Danh sách sinh viên</h2>

      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-300 rounded-lg text-center font-medium">
          {successMessage}
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên sinh viên..."
          className="w-full sm:w-[48%] p-2 border border-gray-300 rounded-xl"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <select
          className="w-full sm:w-[30%] p-2 border border-gray-300 rounded-xl"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classOptions.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

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
              <th className="px-6 py-4 text-center text-sm font-bold text-blue-900 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {filteredStudents.map(student => (
              <StudentItem
                key={student.id}
                student={student}
                onDelete={handleDelete}
                onEdit={setEditStudent}
              />
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 italic">Không có sinh viên nào khớp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(showModal || editStudent) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              {editStudent ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}
            </h3>
            <input
              type="text"
              placeholder="Tên"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
              value={editStudent ? editStudent.name : newStudent.name}
              onChange={(e) => editStudent ? setEditStudent({ ...editStudent, name: e.target.value }) : setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Lớp"
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
              value={editStudent ? editStudent.class : newStudent.class}
              onChange={(e) => editStudent ? setEditStudent({ ...editStudent, class: e.target.value }) : setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <input
              type="number"
              placeholder="Tuổi"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
              value={editStudent ? editStudent.age : newStudent.age}
              onChange={(e) => editStudent ? setEditStudent({ ...editStudent, age: e.target.value }) : setNewStudent({ ...newStudent, age: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { editStudent ? setEditStudent(null) : setShowModal(false); }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Huỷ
              </button>
              <button
                onClick={editStudent ? handleEditStudent : handleAddStudent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {editStudent ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
