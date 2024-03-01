function saveNote() {
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const template = document.getElementById("noteTemplate");
        const clone = document.importNode(template.content, true);
        clone.querySelector(".note-title").textContent = note.title;
        clone.querySelector(".note-content").textContent = note.content;
        notesList.appendChild(clone);
    });
}

function deleteNote() {
    const checkboxes = document.querySelectorAll('.note-checkbox:checked');
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    checkboxes.forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        notes.splice(index, 1);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function clearAllNotes() {
    localStorage.removeItem("notes");
    displayNotes();
}

function searchNotes() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        const title = note.querySelector('.note-title').textContent.toLowerCase();
        const content = note.querySelector('.note-content').textContent.toLowerCase();
        if (title.includes(searchText) || content.includes(searchText)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
}

window.onload = displayNotes;

