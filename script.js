const registrationForm = document.getElementById("RegistrationForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// Prevent page reload on form submit
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let studentId = document.getElementById("studentId").value;
    let email = document.getElementById("email").value;
    let contactNumber = document.getElementById("contactNumber").value;

    // Validate empty fields
    if (name === "" || studentId === "" || email === "" || contactNumber === "") {
        alert("Please fill the details");
        return;
    }

//  Name (only letters)
if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only letters");
    return;
}

//  Student ID only numbers
if (!/^[0-9]+$/.test(studentId)) {
    alert("Student ID should contain only numbers");
    return;
}

//  Email only
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Enter a valid email address");
    return;
}

//  Contact number 10 digits
if (!/^[0-9]{10}$/.test(contactNumber)) {
    alert("Contact number must be exactly 10 digits");
    return;
}

//create student object and add to students array
    let student = {
        name: name,
        studentId: studentId,
        email: email,
        contactNumber: contactNumber
    };

    //if edit index is null, add new student, otherwise update existing student
    if (editIndex === null){
        students.push(student)
    }else {
        students[editIndex] = student;
        editIndex = null;
    }

//save students array to local storage
    localStorage.setItem("students", JSON.stringify(students));

    showData();
    registrationForm.reset();
});

function showData() {
    studentList.innerHTML = "";

    students.forEach(function (student, index) {
        studentList.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contactNumber}</td>
            <td>
               <button onclick="editData(${index})">Edit</button>
               <button onclick="deleteData(${index})">Delete</button>
               
            </td>
        </tr>
        `;
    });
}


//remove student from array and edit local storage
function deleteData(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    showData();
}
function editData(index){
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contactNumber").value = student.contactNumber;

    editIndex = index;
}


//show on browser when page loads
window.onload = function () {
    showData();
};
