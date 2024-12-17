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

// Controls the filtering for our search bar. Since we have dynamically generated the search bar, we cannot attach an event listener directly to it. Instead, I am attaching an event listner to its parent, the header. I'm capturing the input element as the target. When we enter text into the input, the event propagates up to the header, and we are able to then correctly filter our data. I create an empty array to hold filtered data. I am then looping over the array, and concatinating a first and last name to lower case. The I search. If the student name is included in the user input, we push the data array index into the new array we have created. The, I am doing a check to make sure that our array has some data, and if it does, we are calling the showPage and the addPagination functions. These display the new array created from our data and what the user put it. If we don't have data in the array, we display text that tells the user no results found. Then, we clear the contents of the page, so we can start fresh.
header.addEventListener("keyup", (el) => {
    const input = el.target;
    const searchResults = [];
    const userInput = input.value.toLowerCase();

    for (let i = 0; i < data.length; i++) {
        const studentName = data[i].name.first.toLowerCase() + ' ' + data[i].name.last.toLowerCase();

        if (studentName.includes(userInput)) {
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

});


// Calling created functions
searchBar();
addPagination(data);
showPage(data, 1);