let books = [
    {
      title: "Harry Potter",
      author: "JK ROwling",
      genre: "Mystery",
      pages: 300,
      read: true,
      id: 1597750494860,
    },
    {
      title: "Twilinght",
      author: "Catherine Harddwicke",
      genre: "Romance",
      pages: 430,
      read: false,
      id: 1597750494860,
    },
    {
      title: "Haivola",
      author: "Malagasy Author",
      genre: "Education",
      pages: 111,
      read: true,
      id: 1597750494860,
    },
  ];
  
  // add an element to the list with the form
  // The element is added on the list
  // reset the form after submission
  // Not add an empty element
  // delete an element
  // edit the state of an element
  // save new element to local storage
  // save the new state of object in local storage
  // form validation?
  
  const tableList = document.querySelector("tbody");
  const form = document.querySelector("form");
  
  const showBooks = () => {
    const html = books
      .map((book) => {
        return `
          <tr>
              <td class="left">${book.title}</td>
              <td>${book.author}</td>
              <td>${book.genre}</td>
              <td>${book.pages}</td>
              <td>
                <button value="${
                  book.id
                }" class="check" aria-label="Update read attribute of ${
          book.title
        }">
                  <img ${book.read ? "" : "hidden"} 
                      src="./images/checked.svg" 
                      alt="the book ${book.title} is read">
                  <img ${book.read ? "hidden" : ""} 
                      src="./images/unchecked.svg" 
                      alt="the book ${book.title} is not read yet">
                </button>
              </td>
              <td>
                <button value="${
                  book.id
                }" class="delete" aria-label="Delete book ${book.title}">
                  <img 
                      src="./images/trash.svg" 
                      alt="Delete ${book.title} from the list">
                </button>
              </td>
          </tr>
            `;
      })
      .join("");
    tableList.innerHTML = html;
  };
  
  // showBooks();
  
  const addBook = (e) => {
    e.preventDefault();
    console.log(e);
    const formEl = e.currentTarget;
    const newBook = {
      title: formEl.title.value,
      author: formEl.author.value,
      genre: formEl.genre.value,
      pages: formEl.pages.value,
      read: formEl.read.value === "true",
      id: Date.now(),
    };
    books.push(newBook);
    tableList.dispatchEvent(new CustomEvent("listUpdated"));
    formEl.reset();
  };
  
  //event delegation
  
  const handleClick = (e) => {
    console.log(e.target);
    //update the attribute
    const checkBtn = e.target.closest("button.check");
  
    //if the check button is exist
    if (checkBtn) {
      const id = Number(checkBtn.value);
      updateRead(id);
      console.log("UPDATE THAT BOOK PLEASE");
    }
    //delete a book list
    const deleteBtn = e.target.closest("button.delete");
    //if the delete button is clicked
    if (deleteBtn) {
      const id = Number(deleteBtn.value);
      deleteBook(id);
      console.log("DELETE THAT BOOK PLEASE");
    }
  };
  
  const deleteBook = (id) => {
    books = books.filter((book) => book.id !== id);
    tableList.dispatchEvent(new CustomEvent("listUpdated"));
  };
  
  const updateRead = (id) => {
    console.log("UPDATE", id);
    const bookToUpdate = books.find((book) => book.id === id);
    //object and the array are passed by reference ( and not by value)
    bookToUpdate.read = !bookToUpdate.read;
    tableList.dispatchEvent(new CustomEvent("listUpdated"));
  };
  
  //When we reload, we want to look them inside the local sorage and put
  const initLocalStorage = () => {
    const bookLs = JSON.parse(localStorage.getItem("books"));
    console.log("hello", bookLs);
    if (!bookLs) {
      books = [];
    } else {
      books = bookLs;
    }
    tableList.dispatchEvent(new CustomEvent("listUpdated"));
  };
  
  //We want to update the local storage each time we update, delete the list of book
  const updateLocalStorage = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };
  
  form.addEventListener("submit", addBook);
  tableList.addEventListener("listUpdated", showBooks);
  tableList.addEventListener("listUpdated", updateLocalStorage);
  tableList.addEventListener("click", handleClick);
  window.addEventListener("DOMContentLoaded", showBooks);
  