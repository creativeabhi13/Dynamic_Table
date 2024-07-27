document.addEventListener("DOMContentLoaded", () => {
    const API_URL =
        "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
    let students = [];
    let filteredStudents = [];

    const tableContainer = document.getElementById("table-container");
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");

    // Fetch and display students
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            students = data;
            filteredStudents = [...students];
            renderTable(filteredStudents);
        });

    // Render table
    function renderTable(data) {
        let html = `
            <table>
                <thead>
                    <tr>
                     <th>ID</th>
                        <th>Name</th>
                         <th>Gender</th>
                          <th>Class</th>
                             <th>Marks</th>
                             <th>Passing</th>
                        <th>Email</th>         
                        
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passingStatus = student.passing ? "Passing" : "Failed";
            html += `
                <tr>
                  <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                             <td>${student.gender}</td>
                              <td>${student.class}</td>
                                   <td>${student.marks}</td>
                                       <td>${passingStatus}</td>
                    <td>${student.email}</td>
               
                   
           
                
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = html;
    }

    // Search functionality
    function handleSearch() {
        const query = searchBar.value.toLowerCase();
        filteredStudents = students.filter(
            (student) =>
            student.first_name.toLowerCase().includes(query) ||
            student.last_name.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
        renderTable(filteredStudents);
    }

    searchButton.addEventListener("click", handleSearch);
    searchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter") handleSearch();
    });

    // Sorting functions
    document
        .getElementById("sortybyasc")
        .addEventListener("click", sortByNameAsc);

    function sortByNameAsc() {
        filteredStudents.sort((a, b) =>
            (a.first_name + " " + a.last_name).localeCompare(
                b.first_name + " " + b.last_name
            )
        );
        renderTable(filteredStudents);
    }

    document
        .getElementById("sortbydesc")
        .addEventListener("click", sortByNameDesc);

    function sortByNameDesc() {
        filteredStudents.sort((a, b) =>
            (b.first_name + " " + b.last_name).localeCompare(
                a.first_name + " " + a.last_name
            )
        );
        renderTable(filteredStudents);
    }
    document.getElementById("sortbymarks").addEventListener("click", sortByMarks);

    function sortByMarks() {
        filteredStudents.sort((a, b) => a.marks - b.marks);
        renderTable(filteredStudents);
    }

    document.getElementById("sortbypassing").addEventListener("click", filterByPassing);

    function filterByPassing() {
        filteredStudents = students.filter((student) => student.passing);
        renderTable(filteredStudents);
    }
    document.getElementById("sortbyclass").addEventListener("click", sortByClass);

    function sortByClass() {
        filteredStudents.sort((a, b) => a.class - b.class);
        renderTable(filteredStudents);
    }

    document
        .getElementById("sortbygender")
        .addEventListener("click", sortByGender);

    function sortByGender() {
        const maleStudents = students.filter(
            (student) => student.gender === "Male"
        );
        const femaleStudents = students.filter(
            (student) => student.gender === "Female"
        );

        let html = `
            <h2>Male Students</h2>
            <table>
                <thead>
                    <tr>
                   <th>ID</th>
                        <th>Name</th>
                         <th>Gender</th>
                          <th>Class</th>
                             <th>Marks</th>
                             <th>Passing</th>
                        <th>Email</th>  
                    </tr>
                </thead>
                <tbody>
        `;

        maleStudents.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passingStatus = student.passing ? "Passing" : "Failed";
            html += `
                <tr>
                <td>${student.id}</td>
                  <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                             <td>${student.gender}</td>
                              <td>${student.class}</td>
                                   <td>${student.marks}</td>
                                       <td>${passingStatus}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
            <h2>Female Students</h2>
            <table>
                <thead>
                    <tr>
                     <th>ID</th>
                        <th>Name</th>
                         <th>Gender</th>
                          <th>Class</th>
                             <th>Marks</th>
                             <th>Passing</th>
                        <th>Email</th>  
                    </tr>
                </thead>
                <tbody>
        `;

        femaleStudents.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passingStatus = student.passing ? "Passing" : "Failed";
            html += `
                <tr>
               <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                             <td>${student.gender}</td>
                              <td>${student.class}</td>
                                   <td>${student.marks}</td>
                                       <td>${passingStatus}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = html;
    }
});