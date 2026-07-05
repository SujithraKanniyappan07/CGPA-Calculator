// ======================================================
// GPA & CGPA Calculator
// Script: script.js
// Purpose:
// - Display semester subjects
// - Save grades
// - Calculate GPA & CGPA
// - Manage temporary courses
// ======================================================

// ------------------------------------------------------
// Global Variables
// ------------------------------------------------------

// Stores GPA result for each semester
let semesterResults = {};

// Stores temporary courses added by the user
let extraCourses = {};

// Stores selected grades for each semester
let semesterGrades = {};
// Reusable Grade Options
const gradeOptions = `
    <option value="">Select Grade</option>
    <option value="10">S</option>
    <option value="9">A+</option>
    <option value="8">A</option>
    <option value="7">B+</option>
    <option value="6">B</option>
    <option value="5">C</option>
    <option value="0">U</option>
    <option value="0">SA</option>
`;


// ------------------------------------------------------
// Display Semester
// ------------------------------------------------------
function showSemester(sem) {

    // Highlight active semester button
    const buttons = document.querySelectorAll(".sem-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    buttons[sem - 1].classList.add("active");

    // Check whether semester data exists
    if (!semesters[sem]) {

        document.getElementById("content").innerHTML = `
            <h2>Semester ${sem}</h2>
            <p>Semester ${sem} data is not available yet.</p>
        `;

        return;
    }

    // Create semester table
    let html = `
        <h2>Semester ${sem}</h2>

        <div class="table-responsive">
        <table class="subjects-table">
            <tr>
                <th>S.No</th>
                <th>Subject</th>
                <th>Credits</th>
                <th>Grade</th>
            </tr>
    `;

    semesters[sem].forEach((subject, index) => {

        html += `
            <tr>
                <td class="center">${index + 1}</td>

                <td class="left">
                    ${subject.name}
                </td>

                <td class="center">
                    ${subject.credits}
                </td>

                <td class="center">
                    <select class="grade" onchange="saveGrades(${sem})">
                        ${gradeOptions}
                    </select>
                </td>
            </tr>
        `;

    });

    html += `
        </table>
        </div>

        <br><br>

        <button
            onclick="calculateGPA(${sem})"
            class="calculate-btn">

            Calculate GPA

        </button>

        <br>

        <button
            onclick="showAddCourseForm(${sem})"
            class="add-course-btn">

            + Add Temporary Course

        </button>

        <div id="courseForm"></div>

        <div id="result"></div>
    `;

    document.getElementById("content").innerHTML = html;

    displayExtraCourses(sem);

    // Restore previously selected grades
    if (semesterGrades[sem]) {

        const grades = document.querySelectorAll(".grade");

        grades.forEach((grade, index) => {
            grade.value = semesterGrades[sem][index];
        });

    }
}


// Load Semester 1 by default
showSemester(1);


// ------------------------------------------------------
// Save Selected Grades
// ------------------------------------------------------
function saveGrades(sem) {

    semesterGrades[sem] = [];

    document.querySelectorAll(".grade").forEach(grade => {
        semesterGrades[sem].push(grade.value);
    });

}


// ------------------------------------------------------
// Show Temporary Course Form
// ------------------------------------------------------
function showAddCourseForm(sem) {

    let html = `

        <div class="course-form">

            <h3>➕ Add Temporary Course</h3>

            <div class="course-row">

                <div class="input-group">
                    <label>Course Name</label>

                    <input
                        type="text"
                        id="courseName"
                        placeholder="Enter Course Name">
                </div>

                <div class="input-group">
                    <label>Credits</label>

                    <input
                        type="number"
                        id="courseCredits"
                        min="1"
                        max="10"
                        placeholder="Credits">
                </div>

                <div class="input-group">
                    <label>Grade</label>
                    <select id="courseGrade">
                        ${gradeOptions}
                    </select>                    
                </div>

            </div>

            <button
                onclick="addCourse(${sem})"
                class="save-course-btn">

                Add Course

            </button>

            <div id="extraCourseList"></div>

        </div>
    `;

    document.getElementById("courseForm").innerHTML = html;

}
// ------------------------------------------------------
// Add Temporary Course
// ------------------------------------------------------
function addCourse(sem) {

    const name = document.getElementById("courseName").value.trim();

    const credits = Number(
        document.getElementById("courseCredits").value
    );

    const grade = Number(
        document.getElementById("courseGrade").value
    );

    const gradeLetter =
        document.getElementById("courseGrade").options[
            document.getElementById("courseGrade").selectedIndex
        ].text;

    // Validation
    if (
        name === "" ||
        credits <= 0 ||
        isNaN(credits) ||
        isNaN(grade)
    ) {
        alert("Please fill all details.");
        return;
    }

    // Create semester array if it doesn't exist
    if (!extraCourses[sem]) {
        extraCourses[sem] = [];
    }

    // Store course
    extraCourses[sem].push({
        name: name,
        credits: credits,
        grade: grade,
        gradeLetter: gradeLetter
    });

    // Refresh list
    displayExtraCourses(sem);

    // Clear form
    document.getElementById("courseName").value = "";
    document.getElementById("courseCredits").value = "";
    document.getElementById("courseGrade").value = "";

}


// ------------------------------------------------------
// Display Temporary Courses
// ------------------------------------------------------
function displayExtraCourses(sem) {

    let html = "";

    if (extraCourses[sem] && extraCourses[sem].length > 0) {

        html += `
            <h3 style="margin-top:25px">
                Temporary Courses
            </h3>
            <div class="table-responsive">
            <table class="subjects-table">

                <tr>
                    <th>Course</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
        `;

        extraCourses[sem].forEach((course, index) => {

            html += `
                <tr>

                    <td class="left">
                        ${course.name}
                    </td>

                    <td class="center">
                        ${course.credits}
                    </td>

                    <td class="center">
                        ${course.gradeLetter}
                    </td>

                    <td class="center">

                        <button
                            onclick="deleteCourse(${sem}, ${index})"
                            class="delete-btn">

                            Delete

                        </button>

                    </td>

                </tr>
            `;

        });

        html += `
            </table>
            </div>
        `;

    }

    document.getElementById("extraCourseList").innerHTML = html;

}


// ------------------------------------------------------
// Delete Temporary Course
// ------------------------------------------------------
function deleteCourse(sem, index) {

    extraCourses[sem].splice(index, 1);

    displayExtraCourses(sem);

}


// ------------------------------------------------------
// Calculate Semester GPA
// ------------------------------------------------------
function calculateSemester(sem) {

    let totalCredits = 0;
    let totalGradePoints = 0;

    const grades = document.querySelectorAll(".grade");

    // Save grades
    semesterGrades[sem] = [];

    grades.forEach(grade => {
        semesterGrades[sem].push(grade.value);
    });

    // Ensure every subject has a grade
    for (let grade of grades) {

        if (grade.value === "") {
            return null;
        }

    }

    // Calculate grade points
    grades.forEach((grade, index) => {

        const gradePoint = Number(grade.value);
        const credit = semesters[sem][index].credits;

        totalCredits += credit;
        totalGradePoints += gradePoint * credit;

    });

    // Include temporary courses
    if (extraCourses[sem]) {

        extraCourses[sem].forEach(course => {

            totalCredits += course.credits;

            totalGradePoints +=
                course.grade * course.credits;

        });

    }

    return {
        credits: totalCredits,
        gradePoints: totalGradePoints,
        gpa: (totalGradePoints / totalCredits).toFixed(2)
    };

}
// ------------------------------------------------------
// Calculate GPA
// ------------------------------------------------------
function calculateGPA(sem) {

    const result = calculateSemester(sem);

    if (result == null) {
        alert("Please select a grade for all subjects.");
        return;
    }

    const totalCredits = result.credits;
    const totalGradePoints = result.gradePoints;
    const gpa = result.gpa;

    // Store semester result for CGPA calculation
    semesterResults[sem] = {
        totalGradePoints: totalGradePoints,
        credits: totalCredits
    };

    // Display GPA Result
    document.getElementById("result").innerHTML = `
        <div class="stats-container">

            <div class="stat-card">
                <div class="stat-label">🎯 GPA</div>
                <div class="stat-value">${gpa}</div>
            </div>

            <div class="stat-card">
                <div class="stat-label">📚 Credits</div>
                <div class="stat-value">${totalCredits}</div>
            </div>

            <div class="stat-card">
                <div class="stat-label">⭐ Grade Points</div>
                <div class="stat-value">${totalGradePoints}</div>
            </div>

        </div>
    `;

    // Refresh CGPA Dashboard
    updateSummary();

}


// ------------------------------------------------------
// Update GPA Dashboard / CGPA Summary
// ------------------------------------------------------
function updateSummary() {

    let html = `
        <div class="summary-card">

            <h2>📊 GPA Dashboard</h2>

            <div class="summary-grid">
    `;

    let grandGradePoints = 0;
    let grandCredits = 0;

    // Display all semesters
    for (let i = 1; i <= 8; i++) {

        if (semesterResults[i]) {

            const semesterGPA = (
                semesterResults[i].totalGradePoints /
                semesterResults[i].credits
            ).toFixed(2);

            html += `
                <div class="semester-card">

                    <h3>Semester ${i}</h3>

                    <div class="semester-gpa">
                        ${semesterGPA}
                    </div>

                    <p>
                        ${semesterResults[i].credits} Credits
                    </p>

                </div>
            `;

            grandGradePoints += semesterResults[i].totalGradePoints;
            grandCredits += semesterResults[i].credits;

        } else {

            html += `
                <div class="semester-card pending">

                    <h3>Semester ${i}</h3>

                    <div class="semester-gpa">
                        --
                    </div>

                    <p>Pending</p>

                </div>
            `;

        }

    }

    // Close summary grid
    html += `
            </div>
    `;

    // Overall CGPA
    if (grandCredits > 0) {

        const cgpa = (
            grandGradePoints / grandCredits
        ).toFixed(2);

        html += `
            <div class="cgpa-card">

                <div class="cgpa-item">
                    <div class="cgpa-title">
                        🎓 Overall CGPA
                    </div>
                </div>

                <div class="cgpa-item">
                    <div class="cgpa-number">
                        ${cgpa}
                    </div>
                </div>

                <div class="cgpa-item">
                    <div>
                        Total Credits Completed :
                        <strong>${grandCredits}</strong>
                    </div>
                </div>

            </div>
        `;

    }

    html += `
        </div>
    `;

    document.getElementById("summary").innerHTML = html;

}
