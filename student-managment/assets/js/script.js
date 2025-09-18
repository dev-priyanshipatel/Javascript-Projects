const addBtn = document.getElementById("addbtn");
const clrBtn = document.getElementById("clrbtn");
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const noData = document.getElementById("noData");

function clearData() {
  document.getElementById("name").value = "";
  document.getElementById("grid").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
  document.getElementById("female").checked = true;
}

class Student {
  constructor(name, grid, age, course, gender) {
    this.name = name;
    this.grid = grid;
    this.age = age;
    this.course = course;
    this.gender = gender;
  }
}

class StudentManagment {
  constructor() {
    this.Students = [];
    this.editIdx = -1;
  }

  addOrUpdateStudent(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const grid = document.getElementById("grid").value.trim();
    const age = document.getElementById("age").value.trim();
    const course = document.getElementById("course").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (!name.trim() || !grid.trim() || !age.trim() || course === "") {
      Swal.fire({
        icon: "error",
        text: "Please fill all required fields.",
      });
      return;
    }

    const student = new Student(name, grid, age, course, gender);

    if (this.editIdx === -1) {
      this.Students.push(student);

      Swal.fire({
        title: "Student Added",
        icon: "success",
      });
    } else {
      this.Students[this.editIdx].name = name;
      this.Students[this.editIdx].grid = grid;
      this.Students[this.editIdx].age = age;
      this.Students[this.editIdx].course = course;
      this.Students[this.editIdx].gender = gender;

      Swal.fire({
        title: "Student updated",
        icon: "success",
      });
    }
    this.editIdx = -1;
    this.showStudent();
    addBtn.innerHTML = "Add Student";
    clearData();
  }

  showStudent() {
    tableBody.innerHTML = "";

    if (this.Students.length === 0) {
      noData.style.display = "block";
    } else {
      noData.style.display = "none";
    }

    this.Students.forEach((data, idx) => {
      const row = `
                            <tr>
                                <td>${idx + 1}</td>
                                <td>${data.name}</td>
                                <td>${data.grid}</td>
                                <td>${data.age}</td>
                                <td>${this.getCourse(data.course)}</td>
                                <td>${data.gender}</td>
                                <td>
                                    <button onclick = "stuManagment.deleteStudent(${idx})"><i class="ri-delete-bin-5-line"></i></button>
                                    <button onclick ="stuManagment.editStudent(${idx})"><i class="ri-edit-line"></i></button>
                                </td>
                            </tr>`;
      tableBody.innerHTML += row;
    });
  }

  deleteStudent(idx) {
    this.Students.splice(idx, 1);
    this.showStudent();

    Swal.fire({
      title: "Deleted!",
      text: "The student has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  editStudent(idx) {
    this.editIdx = idx;
    const stu = this.Students[this.editIdx];

    document.getElementById("name").value = stu.name;
    document.getElementById("grid").value = stu.grid;
    document.getElementById("age").value = stu.age;
    document.getElementById("course").value = stu.course;
    document.querySelector(
      `input[name="gender"][value = "${stu.gender}"]`
    ).checked = true;

    addBtn.innerHTML = "Update";
    this.showStudent();
  }

  getCourse(course) {
    switch (course) {
      case "1":
        return "Full Stack Development";
      case "2":
        return "UI / UX Design";
      case "3":
        return "AI / ML";
    }
  }
}

const stuManagment = new StudentManagment();
document.addEventListener("DOMContentLoaded", function () {
  clrBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearData();
  });

  form.addEventListener("submit", function (e) {
    stuManagment.addOrUpdateStudent(e);
  });
});
