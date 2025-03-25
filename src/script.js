document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.querySelector("#bookList");
  const bookName = document.querySelector("#bookName");
  const authorName = document.querySelector("#authorName");
  const errormessage = document.querySelector("#errormessage");

  let books = JSON.parse(localStorage.getItem("books")) || []; // books dizisini burada tanımlıyoruz
  let editingIndex = null; // Düzenleme yapılacak kitabın index'ini tutacağız

  // Kitapları localStorage'a kaydetme
  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Kitap eklerken veya düzenlerken
  document.querySelector("#addBook").addEventListener("click", function () {
    const bookNameValue = bookName.value.trim();
    const authorNameValue = authorName.value.trim();

    if (bookNameValue === "" || authorNameValue === "") {
      errormessage.textContent = "Kitap adı ve yazar adı boş olamaz.";
      errormessage.style.color = "red"; // Hata mesajı rengini kırmızı yap
      return;
    }

    errormessage.textContent = ""; // Hata mesajını temizle

    // Eğer düzenleme yapılacaksa, düzenle
    if (editingIndex !== null) {
      books[editingIndex] = {
        bookName: bookNameValue,
        authorName: authorNameValue,
      };
      editingIndex = null; // Düzenleme işlemi tamamlandıktan sonra index'i sıfırla
    } else {
      // Yeni kitap ekle
      const newBook = { bookName: bookNameValue, authorName: authorNameValue };
      books.push(newBook);
    }

    saveBooks(); // Kitapları localStorage'a kaydet
    renderBooks(); // Kitapları tekrar listele

    // Inputları temizle
    bookName.value = "";
    authorName.value = "";
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

  // Kitapları listeye render etme
  function renderBooks() {
    bookList.innerHTML = ""; // Kitapları listelemeden önce temizle

    books.forEach((book, index) => {
      const bookItem = document.createElement("li");
      bookItem.innerHTML = `
        <span>${book.bookName}</span> - 
        <span>${book.authorName}</span>
        <button class="delete-btn" data-index="${index}">Sil</button>
        <button class="edit-btn" data-index="${index}">Düzenle</button>
      `;
      bookList.appendChild(bookItem);
    });
  }

  // Kitap düzenleme işlemi
  bookList.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
      const index = event.target.dataset.index;
      const book = books[index];

      // Düzenleme formuna mevcut bilgileri taşı
      bookName.value = book.bookName;
      authorName.value = book.authorName;

      // Düzenlenecek kitabın index'ini tut
      editingIndex = index;
    }
  });

  // Sayfa yüklendiğinde kitapları render et
  renderBooks();
});
