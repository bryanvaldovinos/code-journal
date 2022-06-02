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
  event.preventDefault();
  var userInput = {
    title: contact.elements.title.value,
    photoURL: contact.elements.piclink.value,
    notes: contact.elements.notes.value,
    nextEntryId: data.nextEntryId
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
  title.setAttribute('class', 'margin-top margin-bottom');
  piece.appendChild(title);
  title.appendChild(titleText);

  var notas = document.createElement('p');
  var notaEntry = document.createTextNode(entry.notes);
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

picInput.addEventListener('input', subSrc);
contact.addEventListener('submit', submit);
window.addEventListener('DOMContentLoaded', allEntries);
entryPage.addEventListener('click', backToEntry);
