
function getNoteTemplate(note, title, index) {
  return `<div class="note-content">
            <div class="regular-note note-box" onclick="deleteNote(${index})">
              <span class="noteSpan">+</span>
              <div class="noteWrapper">
                <div class="noteHeadline">${title}</div>
                
                <div class="noteBody">${note}</div>
              </div>
            </div>
          </div>`;
}


function getTrashNoteTemplate(trashNote, trashTitle, index) {
  return `<div class="note-content" >
            <div class="regular-trash-note note-box " onclick="markTrashNote(this)">
              <div class="flex-column flex-items-start">
                <div class="noteHeadline noteTrashHeadline">${trashTitle}</div>
                <div class="noteBody noteTrashBody" accessKey="${index}">${trashNote}</div>
              </div>
            </div>
          </div>`;
}