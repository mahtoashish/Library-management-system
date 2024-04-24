document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    addBtn.addEventListener("click", addBook);
});

async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    try {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        });

        if (response.ok) {
            alert('Book added successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Error adding book: ${errorMessage}`);
        }
    } catch (err) {
        console.error('Error adding book:', err);
        alert('Error adding book. Please try again later.');
    }
}
