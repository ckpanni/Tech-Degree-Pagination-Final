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

// This section handles the search logic for the search field. First, I create an empty searchResults array to store the new set of filtered search results. Then, I select the input element within the dynamically generated search field. I loop through the data, and create a new studentName variable that concatenate the first and last name values from the student objects. If the studentName exists in the input value, I will push the objects into the new array. If there is one or more objects in the new array, I call the addPagination function, and the showPage function, to show the new data. If there's no data in the array, then we show a message, and clear the rest of the content from the page. 
const searchLogic = () => {
    const searchResults = [];
    const input = document.querySelector("input").value.toLowerCase();

    for (let i = 0; i < data.length; i++) {
        const studentName = data[i].name.first.toLowerCase() + ' ' + data[i].name.last.toLowerCase();

        if (studentName.includes(input)) {
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

// I bind an event listener to the header, which is the parent of the search field. I then call the searchLogic function created above.Since the search field is dynamically generated, I need to bind functionality to its parent element, so that its values bubble up to the parent. I created two event listeners for click and keyup. This handles a user being able to write in the search field, and copy paste into the search field. 
header.addEventListener("click", () => {
 searchLogic();
});

header.addEventListener("keyup", () => {
    searchLogic();
});



// Calling created functions
searchBar();
addPagination(data);
showPage(data, 1);