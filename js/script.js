// Global variables 
const studentsPerPage = 9;
const studentListUL = document.querySelector('.student-list');
const linkListUL = document.querySelector('.link-list');
const header = document.querySelector("header");


// Dynamically creating search bar. Creating a variable to capture the header element. Then, inserting the HTML search bar content within the header.
const searchBar = () => {
    const header = document.querySelector("header");
    const searchHTML = `<label for="search" class="student-search">
                           <span>Search by name</span>
                           <input id="search" placeholder="Search by name...">
                           <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                        </label>`;

    header.insertAdjacentHTML("beforeend", searchHTML);
}

// Creating the function that controls how many students are shown per page. Creating a start and end variable, and setting the student list to an empty string. This way, when we load a new page, we are not showing content from previous page. A for loop is created that will loop over the length of the array. If the index is greater or equal to start variable, and less than or equal to the end variable, we generate an HTML structure that returns the values from the keys of our array. Then, we insert this HTML into our studentList variablem for it to be shown on the page.
const showPage = (list, page) => {
    const startIndex = (page * studentsPerPage) - studentsPerPage;
    const endIndex = (page * studentsPerPage) - 1;

    studentListUL.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            const html = `<li class="student-item cf">
                              <div class="student-details">
                                 <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture of ${list[i].name.title} ${list[i].name.first} ${list[i].name.last}">
                                 <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                 <span class="email"> ${list[i].email}</span>
                              </div>
                              <div class="joined-details">
                                 <span class="date">Joined ${list[i].registered.date}</span>
                              </div>
                           </li>`;

            studentListUL.insertAdjacentHTML("beforeend", html);
        }

    }

}


// This function generates the buttons for our project. We dynamically create the buttons based of the length of the array divided by how many students we want shown on the page. Each button is attached to an event listener. When clicked, the button will receive an active class, and we call the showPage function above. This function will then display the specific indexes of students from the array (based on the number of the button)
const addPagination = (list) => {
    const numOfButtons = Math.ceil(list.length / studentsPerPage);
    linkListUL.innerHTML = '';

    for (let i = 1; i <= numOfButtons; i++) {
        const buttonHTML = `<li>
                        <button type="button">${i}</button>
                     </li>`;

        linkListUL.insertAdjacentHTML("beforeend", buttonHTML);
    }

    linkListUL.querySelector("button").classList.add("active");
    linkListUL.addEventListener("click", (e) => {
        const activeButton = linkListUL.querySelector(".active");
        const buttonClicked = e.target.closest("button");

        if (activeButton && buttonClicked) {
            activeButton.classList.remove("active");
        }

        if (buttonClicked) {
            buttonClicked.classList.add("active");
            showPage(list, buttonClicked.innerHTML);
        }
    });
}

// This section handles the search logic for the search field. I created a function that takes an element as a parameter. 
const searchLogic = (element) => {
    const searchResults = [];

    for (let i = 0; i < data.length; i++) {
        const studentName = data[i].name.first.toLowerCase() + ' ' + data[i].name.last.toLowerCase();

        if (studentName.includes(element)) {
            searchResults.push(data[i]);
        }
    }

    if (searchResults.length > 0) {
        addPagination(searchResults);
        showPage(searchResults, 1);
    } else {
        studentListUL.innerHTML = '<h3>No results found</h3>';
        linkListUL.innerHTML = '';
    }
}

header.addEventListener("click", () => {
 const input = document.querySelector("input").value.toLowerCase();
 searchLogic(input);
});

header.addEventListener("keyup", () => {
    const input = document.querySelector("input").value.toLowerCase();
    searchLogic(input);
});



// Calling created functions
searchBar();
addPagination(data);
showPage(data, 1);