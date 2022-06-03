/* global data */

var picInput = document.querySelector('#photo');
var img = document.querySelector('img');
var contact = document.querySelector('#code-form');
var uList = document.querySelector('ul');
var entryPage = document.querySelector('a[href="#entryPage"]');

function subSrc(e) {
  img.setAttribute('src', e.target.value);
}

function submit(event) {
  var userInput = {
    title: contact.elements.title.value,
    photoURL: contact.elements.piclink.value,
    Notes: contact.elements.notes.value,
    EntryId: data.nextEntryId
  };

  data.entries.unshift(userInput);
  data.nextEntryId++;
  contact.reset();
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  singleEntry();
  data.view = 'entries';
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

function backToEntry(event) {
  view.className = '';
  viewTwo.className = 'hidden';
}

function TBD(evento) {
  // console.log(data.editing);
  // var dirID = evento.target.getAttribute('data-entry-id');
  // console.log(dirID);
  if (event.target.matches('.editTarget')) {
    view.className = '';
    viewTwo.className = 'hidden';

    // for (var i = 0; i < data.entries.length; i++) {
    //  if (data.entries[i].EntryId === dirID) {
    data.editing = 8;
    // }
  }
  // console.log(data);
  // if (data.editing === null) {
  // for (var i = 0; i < data.entries.length; i++) {
  //    if (data.entries[i].EntryId === dirID) {
  //     data.editing = 8;
  //      }
  // }
}
// }

// function NA() {
// if icon clicked
// if click matches entry id then assign that to data editing
// var bool = data.entries[0].EntryId.matches('#entry.EntryId');
// return data.entries[0].EntryId;
// return bool;
// }

picInput.addEventListener('input', subSrc);
contact.addEventListener('submit', submit);
window.addEventListener('DOMContentLoaded', allEntries);
entryPage.addEventListener('click', backToEntry);
uList.addEventListener('click', TBD);
