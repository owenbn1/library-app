const BOOK_ROSTER_URL = "http://localhost:3000/books";

$.get(BOOK_ROSTER_URL).then((data) =>
  data.map((book) => {
    $("tbody").append(
      $(`
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
            <button type="button" class="btn btn-danger btn-block" onclick="deleteBook(${book.id})" >DELETE</button>
            </td>
        </tr>`)
    );
  })
);

$("#submitBook").click(function () {
  $.post(BOOK_ROSTER_URL, {
    title: $("#newBookName").val(),
    author: $("#newAuthorName").val(),
  });
});

$("#updateBook").click(function () {
    const bookId = $("#updateBookId").val();
    $.ajax(`${BOOK_ROSTER_URL}/${bookId}`, {
      type: 'PUT',
      data: {
        title: $("#updateBookName").val(),
        author: $("#updateAuthorName").val(),
      },
    });
  });

function deleteBook(id){
    $.ajax(`${BOOK_ROSTER_URL}/${id}`,{
        type: 'DELETE',
    })
}
