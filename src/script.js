document.querySelector("#addBook").addEventListener("click", function () {
  const bookList = document.querySelector("#bookList");
  const bookNameInput = document.querySelector("#bookName");
  const authorNameInput = document.querySelector("#authorName");
  const errormessage = document.querySelector("#errormessage");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Kitapları localStorage'a kaydetme
  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Kitapları listeye render etme
  function renderBooks() {
    bookList.innerHTML = ""; // Kitapları listelemeden önce temizle
    books.forEach((book, index) => {
      const bookItem = document.createElement("li");
      bookItem.innerHTML = `
                <span>${book.bookName}</span> - 
                <span>${book.authorName}</span>
                <button class="delete-btn" data-index="${index}">Sil</button>
            `;
      bookList.appendChild(bookItem);
    });
  }

  // Kitap eklerken
  addBook.addEventListener("click", function () {
    
  const bookName = bookNameInput.value.trim();
  const authorName = authorNameInput.value.trim();

  if (bookName === "" || authorName === "") {
    errormessage.textContent = "Kitap adı ve yazar adı boş olamaz.";
    errormessage.style.color = "red"; // Hata mesajı rengini kırmızı yap
    return; // Hata durumunda fonksiyonu sonlandır
  }

  errormessage.textContent = ""; // Hata mesajını temizle

  // Yeni kitap objesini oluştur
  const newBook = { bookName, authorName };

  books.push(newBook); // Kitapları diziye ekle
  saveBooks(); // Kitapları localStorage'a kaydet
  renderBooks(); // Kitapları tekrar listele

  // Inputları temizle
  bookNameInput.value = "";
  authorNameInput.value = "";
});

// Kitap silme işlemi
bookList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.dataset.index;
    books.splice(index, 1); // Kitabı listeden çıkar
    saveBooks(); // Güncellenmiş listeyi kaydet
    renderBooks(); // Kitapları tekrar render et
  }
});

// Sayfa yüklendiğinde kitapları render et
renderBooks();
});

