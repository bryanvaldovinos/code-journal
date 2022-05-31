/* global data */

var picInput = document.querySelector('#photo');
var img = document.querySelector('img');
var contact = document.querySelector('#code-form');

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

}

picInput.addEventListener('input', subSrc);
contact.addEventListener('submit', submit);
