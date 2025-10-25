const addCommentBtn = document.getElementById('addComment');
const commentList = document.getElementById('commentList');

addCommentBtn.addEventListener('click', () => {
    const userName = document.getElementById('userName').value.trim();
    const userComment = document.getElementById('userComment').value.trim();

    if (userName === "" || userComment === "") {
        alert("Vänligen fyll i både namn och kommentar!");
        return;
    }

    // Skapa ett nytt kommentar-element
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `<strong>${userName}</strong>: ${userComment}`;

    // Lägg till kommentaren i listan
    commentList.appendChild(commentDiv);

    // Töm fälten
    document.getElementById('userName').value = '';
    document.getElementById('userComment').value = '';
});