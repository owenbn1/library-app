const BOOK_ROSTER_URL = "http://localhost:3000/books";

// Function to render books in the table
function renderBooks() {
  $.get(BOOK_ROSTER_URL).then((data) => {
    $("tbody").empty(); // Clear existing data
    data.forEach((books) => {
      $("tbody").append(
        $(`
          <tr>
              <td>${books.id}</td>
              <td>${books.title}</td>
              <td>${books.author}</td>
              <td>
              <button type="button" class="btn btn-danger form-control" onclick="deleteBook(${books.id})">DELETE</button>
              </td>
          </tr>`)
      );
    });
  });
}

// Get and render books on page load
renderBooks();

// Event listener for submitting a new book
$("#submitBook").click(function () {
  $.ajax({
    url: BOOK_ROSTER_URL,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      title: $("#newBookName").val(),
      author: $("#newAuthorName").val(),
    }),
    success: function () {
      renderBooks(); // Refresh the table after adding a new book
    },
  });
});

// Event listener for updating a book
$("#updateBookBtn").click(function () {
  const bookId = $("#updateBookId").val();
  $.ajax({
    url: `${BOOK_ROSTER_URL}/${bookId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      title: $("#updateBookName").val(),
      author: $("#updateAuthorName").val(),
    }),
    success: function () {
      renderBooks(); // Refresh the table after updating a book
    },
  });
});

// Function to delete a book
function deleteBook(id) {
  $.ajax({
    url: `${BOOK_ROSTER_URL}/${id}`,
    type: "DELETE",
    contentType: "application/json",
    success: function () {
      renderBooks();
    },
  });
}
