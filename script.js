let notes = [];
let notesJSON = localStorage.getItem("notesInStorage");
let loadedNotes = JSON.parse(notesJSON);
if (loadedNotes != null) {
  notes = loadedNotes;
}
let notesTitle = [];
let notesTitleJSON = localStorage.getItem("notesTitleInStorage");
let loadedNotesTitle = JSON.parse(notesTitleJSON);
if (loadedNotesTitle != null) {
  notesTitle = loadedNotesTitle;
}

let trashCan = [];
let trashCanJSON = localStorage.getItem("trashCanInStorage");
let loadedTrashCan = JSON.parse(trashCanJSON);
if (loadedTrashCan != null) {
  trashCan = loadedTrashCan;
}
let trashCanTitle = [];
let trashCanTitleJSON = localStorage.getItem("trashCanTitleInStorage");
let loadedTrashCanTitle = JSON.parse(trashCanTitleJSON);
if (loadedTrashCanTitle != null) {
  trashCanTitle = loadedTrashCanTitle;
}

// RENDER NOTES

function renderNotes(arrayNote, arrayTitle) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  for (let index = 0; index < arrayNote.length; index++) {
    const note = arrayNote[index];
    const title = arrayTitle[index];
    contentRef.innerHTML += getNoteTemplate(note, title, index);
  }
}

// notizen hinzufügen

function addNewInput() {
  let noteInputRef = document.getElementById("inputTag");
  let noteInput = noteInputRef.value;

  let titelTagRef = document.getElementById("titelTag");
  let noteTitle = titelTagRef.value;

  if (noteInput.length < 1) {
    return;
  }
  if (noteTitle.length < 1) {
    notesTitle.push("");
    localStorage.setItem("notesTitleInStorage", JSON.stringify(notesTitle));
  } else {
    notesTitle.push(noteTitle);
    localStorage.setItem("notesTitleInStorage", JSON.stringify(notesTitle));
  }
  notes.push(noteInput);
  localStorage.setItem("notesInStorage", JSON.stringify(notes));

  renderNotes(notes, notesTitle);
  document.getElementById("inputTag").value = "";
  document.getElementById("titelTag").value = "";
}

document
  .getElementById("inputNoteButton")
  .addEventListener("click", addNewInput);

// delete notes

function deleteNote(index) {
  let deletedNote = notes.splice(index, 1)[0];
  let deletedTitle = notesTitle.splice(index, 1)[0];
  trashCan.push(deletedNote);
  trashCanTitle.push(deletedTitle);
  if (notes.length <= 0) {
    localStorage.setItem("trashCanInStorage", JSON.stringify(trashCan));
    localStorage.setItem(
      "trashCanTitleInStorage",
      JSON.stringify(trashCanTitle)
    );
    localStorage.removeItem("notesInStorage");
    localStorage.removeItem("notesTitleInStorage");
  } else {
    localStorage.setItem("trashCanInStorage", JSON.stringify(trashCan));
    localStorage.setItem(
      "trashCanTitleInStorage",
      JSON.stringify(trashCanTitle)
    );
    localStorage.setItem("notesInStorage", JSON.stringify(notes));
    localStorage.setItem("notesTitleInStorage", JSON.stringify(notesTitle));
  }

  renderNotes(notes, notesTitle);
}

// ###########################################################################

const body = document.querySelector("body");

body.addEventListener("load", renderNotes(notes, notesTitle));

// add note with keydown bei enter key

const inputTagRef = document.getElementById("inputTag");
inputTagRef.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewInput();
  }
});

// ##########################################################################

// open trash can div

const trashCanContainerRef = document.getElementById("trashCanContainer");
const trashCanOpenButtonRef = document.getElementById("trashCanOpenButton");
trashCanOpenButtonRef.addEventListener("click", openTrashContainer);

function openTrashContainer() {
  trashCanContainerRef.classList.remove("d-none");
  renderTrashNotes(trashCan, trashCanTitle);
  trashCanContainerRef.classList.remove("opacity-zero");
}

// render trash notes

function renderTrashNotes(arrayTrash, arrayTrashTitle) {
  let trashCanContentRef = document.getElementById("trashCanContent");
  trashCanContentRef.innerHTML = "";
  for (let index = 0; index < arrayTrash.length; index++) {
    const trashNote = arrayTrash[index];
    const trashTitle = arrayTrashTitle[index];
    trashCanContentRef.innerHTML += getTrashNoteTemplate(
      trashNote,
      trashTitle,
      index
    );
  }
}

// close trash can div

const trashCanCloseButtonRef = document.getElementById("trashCanCloseButton");
trashCanCloseButtonRef.addEventListener("click", closeTrashContainer);

function closeTrashContainer() {
  trashCanContainerRef.classList.add("opacity-zero");
  setTimeout(() => {
    trashCanContainerRef.classList.add("d-none");
  }, 310);
}

// mark trash note

function markTrashNote(element) {
  element.classList.toggle("marked-trash-note");
  const trashNoteDiv = element.querySelectorAll("div div")[2];

  if (trashNoteDiv) {
    trashNoteDiv.classList.toggle("marked");
  }
}

// clear trash can completly

const clearTrashCanButtonRef = document.getElementById("clearTrashCanButton");
clearTrashCanButtonRef.addEventListener("click", clearTrashCanComplete);

function clearTrashCanComplete() {
  trashCan = [];
  trashCanTitle = [];
  // localStorage.setItem("trashCanInStorage", JSON.stringify(trashCan));
  localStorage.removeItem("trashCanInStorage");
  localStorage.removeItem("trashCanTitleInStorage");
  renderTrashNotes(trashCan, trashCanTitle);
}

// delete marked trash

const deleteTrashButtonRef = document.getElementById("deleteTrashButton");
deleteTrashButtonRef.addEventListener("click", deletMarkedTrash);

function deletMarkedTrash() {
  let markedTrash = document.querySelectorAll(".marked");

  markedTrash.forEach((element) => {
    let index = trashCan.indexOf(element.innerHTML);

    trashCan.splice(index, 1);
    trashCanTitle.splice(index, 1);
  });

  localStorage.setItem("trashCanInStorage", JSON.stringify(trashCan));
  localStorage.setItem("trashCanTitleInStorage", JSON.stringify(trashCanTitle));
  renderTrashNotes(trashCan, trashCanTitle);
  if (trashCan.length <= 0) {
    localStorage.removeItem("trashCanInStorage");
    localStorage.removeItem("trashCanTitleInStorage");
  }
}

// reuse marked trash

const reuseTrashNoteButtonRef = document.getElementById("reuseTrashNoteButton");
reuseTrashNoteButtonRef.addEventListener("click", reuseMarkedTrash);

function reuseMarkedTrash() {
  let markedTrash = document.querySelectorAll(".marked");

  markedTrash.forEach((element) => {
    let index = trashCan.indexOf(element.innerHTML);
    notes.push(element.innerHTML);
    notesTitle.push(trashCanTitle[index]);
    trashCan.splice(index, 1);
    trashCanTitle.splice(index, 1);
  });
  localStorage.setItem("notesInStorage", JSON.stringify(notes));
  localStorage.setItem("notesTitleInStorage", JSON.stringify(notesTitle));
  localStorage.setItem("trashCanInStorage", JSON.stringify(trashCan));
  localStorage.setItem("trashCanTitleInStorage", JSON.stringify(trashCanTitle));
  renderTrashNotes(trashCan, trashCanTitle);
  renderNotes(notes, notesTitle);
  if (trashCan.length <= 0) {
    localStorage.removeItem("trashCanInStorage");
    localStorage.removeItem("trashCanTitleInStorage");
  }
}
