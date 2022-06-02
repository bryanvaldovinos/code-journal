/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('Data Info');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function local(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('Data Info:', entriesJSON);
}

window.addEventListener('beforeunload', local);
