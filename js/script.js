

const studentsPerPage = 9;
const studentListUL = document.querySelector('.student-list');
const linkListUL = document.querySelector('.link-list');

const searchBar = () => {
   const header = document.querySelector("header");
   const searchHTML = `<label for="search" class="student-search">
     <span>Search by name</span>
     <input id="search" placeholder="Search by name...">
     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   
   header.insertAdjacentHTML("beforeend", searchHTML);
   }
   

const showPage = (list, page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = (page * studentsPerPage) - 1;
 
   studentListUL.innerHTML = '';

   for (let i = 0; i < list.length; i++ ) {
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


const input = document.getElementById("search");
console.log(input, 'in');

// const searchBarFunctionality = () => {
   // const input = document.getElementById("search");
   
   input.addEventListener("keyup", () => {
      const searchResults = [];
      const userInput = input.value.toLowerCase();

      for (let i = 0; i < data.length; i++) {
         const studentName = data[i].name.first.toLowerCase() + ' ' + data[i].name.last.toLowerCase();
        

         console.log(studentName);
         console.log(userInput, 'user input');

         if (studentName.includes(userInput)) {
            searchResults.push(data[i]);
         }
      }

      if (searchResults > 0) {
         addPagination(searchResults);
         showPage(searchResults, 1);
      } else {
         studentListUL.innerHTML = '<h3>No results found</h3>';
         linkListUL.innerHTML = '';
      }

   });

// }


searchBar();
addPagination(data);
showPage(data, 1);

// searchBarFunctionality();