const addNoteBg = document.querySelector('.add-note-background');
const openAddNote = document.querySelector('.open-modal-button');
const cancelBtn = document.querySelector('.cancel-btn');
const allNotes = document.querySelector('.all-notes');
const textarea = document.querySelector('.note-textarea');
const input = document.querySelector('.note-textarea');
const createBtn = document.querySelector('.create-btn');


const notes = [];


class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.id = Math.random();
  }
}

window.addEventListener('DOMContentLoaded', getNotes);
cancelBtn.addEventListener('click', hideAddNote);
openAddNote.addEventListener('click', showAddNote);
createBtn.addEventListener('click', createNote);
allNotes.addEventListener('click', editNote);

//Create Note
function createNote(event) {
  event.preventDefault();

  let inputValue = input.value;
  let textareavalue = textarea.value;

  if (!inputValue.length && !textareavalue.length) {
    alert('You have to provide a title and a description')
    return;
  }

  const note = new Note(inputValue, textareavalue);

  const markup =
    `<div class='note-container'>
    <span hidden>${note.id}</span>
      <div class='note-header'>
        <h2 class='note-title'>${inputValue}</h2>
      </div>
      <div class='note-body'>
        <p class='note-description'>${textareavalue}</p>
      </div>
      <div class='note-footer'>
        <div class='edit-note'>
          <i class='fas fa-pen'></i>
        </div>
        <div class='delete-note'>
          <i class='fas fa-trash'></i>
        </div>
      </div>
    </div>`;

  allNotes.insertAdjacentHTML('beforeend', markup);


  notes.push(note);
  input.value = '';
  textarea.value = '';
  getNotes();
  hideAddNote(event);

}

//Edit Note

function editNote(evt) {

  if (evt.target.classList.contains('edit-note')) {
    const noteContainer = evt.target.parentElement.parentElement;
    const header = addNoteBg.querySelector('h2');
    header.innerText = 'Edit Note';
    createBtn.innerText = 'Update Note';
    const id = noteContainer.querySelector('span').innerText;
    editBtn = addNoteBg.querySelector('.edit-btn')

    const note = notes.find((nt) => {
      return nt.id === Number(id);
    });

    input.value = note.title;
    textarea.value = note.description;

    showAddNote();
  }
}

function hideAddNote(evt) {
  evt.preventDefault();
  addNoteBg.style.display = 'none';
}


function showAddNote() {
  addNoteBg.style.display = 'grid';
}

function getNotes() {
  if (!notes.length) {
    allNotes.innerHTML = '<h2>There are currently no notes available</h2>';
  } else {
    const noNote = allNotes.querySelector('h2');
    noNote.style.display = 'none';
  }
}

