/* global data */

var img = document.querySelector('img');
var contact = document.querySelector('#code-form');
var uList = document.querySelector('ul');
var entriesPage = document.querySelector('a[href="#entries"]');
var titleInput = document.querySelector('#title');
var picInput = document.querySelector('#photo');
var notesInput = document.querySelector('#notes');

function subSrc(e) {
  img.setAttribute('src', e.target.value);
}

function submit(event) {
  if (data.editing === null) {
    event.preventDefault();
    var userInput = {
      title: contact.elements.title.value,
      photoURL: contact.elements.piclink.value,
      Notes: contact.elements.notes.value,
      EntryId: data.nextEntryId
    };

    data.entries.unshift(userInput);
    data.nextEntryId++;
    singleEntry();
    data.view = 'entries';
  } else {
    data.editing.Notes = contact.elements.notes.value;
    data.editing.photoURL = contact.elements.piclink.value;
    data.editing.title = contact.elements.title.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].EntryId === data.editing.EntryId) {
        uList.replaceWith(entryTree(data.editing));
      }
    }
  }

  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  contact.reset();
  viewSwap();
}

function entryTree(entry) {

  var lista = document.createElement('li');
  lista.setAttribute('class', 'row margin-btm');

  var col = document.createElement('div');
  col.setAttribute('class', 'column-half margin-btm');
  lista.appendChild(col);

  var foto = document.createElement('img');
  foto.setAttribute('src', entry.photoURL);
  foto.setAttribute('class', 'width-100');
  col.appendChild(foto);

  var piece = document.createElement('div');
  piece.setAttribute('class', 'column-half font-sans');
  lista.appendChild(piece);

  var title = document.createElement('h3');
  var titleText = document.createTextNode(entry.title);
  title.setAttribute('class', 'margin-top margin-bottom inline');
  piece.appendChild(title);
  title.appendChild(titleText);

  var pen = document.createElement('i');
  pen.setAttribute('class', 'fa-solid fa-pen right editTarget');
  pen.setAttribute('data-entry-id', entry.EntryId);
  piece.appendChild(pen);

  var notas = document.createElement('p');
  var notaEntry = document.createTextNode(entry.Notes);
  piece.appendChild(notas);
  notas.appendChild(notaEntry);

  return lista;
}

function singleEntry() {
  uList.prepend(entryTree(data.entries[0]));
}

function allEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    uList.append(entryTree(data.entries[i]));
  }
}

var view = document.querySelector('div[data-view="entry-form"]');
var viewTwo = document.querySelector('div[data-view="entries"]');
var newButt = document.querySelector('#new');

function viewSwap() {
  event.preventDefault();
  if (data.view === 'entry-form') {
    view.className = '';
    viewTwo.className = 'hidden';
  } else if (data.view === 'entries') {
    view.className = 'hidden';
    viewTwo.className = '';
  }
}

function toEntries(event) {
  view.className = 'hidden';
  viewTwo.className = '';
  contact.reset();
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
  mainH.textContent = 'New Entry';
}

function backToEntry(event) {
  view.className = '';
  viewTwo.className = 'hidden';
  data.editing = null;
  mainH.textContent = 'New Entry';
}

var mainH = document.querySelector('#main-head');
// var updateView = document.querySelector('div[data-view="update"');

function updateEntry(evento) {
  var dirID = evento.target.getAttribute('data-entry-id');
  if (event.target.matches('.editTarget')) {
    view.className = '';
    viewTwo.className = 'hidden';

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].EntryId.toString() === dirID) {
        data.editing = data.entries[i];
      }
    }
    titleInput.value = data.editing.title;
    picInput.value = data.editing.photoURL;
    notesInput.value = data.editing.Notes;
    img.setAttribute('src', data.editing.photoURL);
    mainH.textContent = 'Update Entry';
    // updateView.className = 'container';
  }
}

picInput.addEventListener('input', subSrc);
contact.addEventListener('submit', submit);
window.addEventListener('DOMContentLoaded', allEntries);
newButt.addEventListener('click', backToEntry);
uList.addEventListener('click', updateEntry);
entriesPage.addEventListener('click', toEntries);
