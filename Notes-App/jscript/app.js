shownotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  let addtitle = document.getElementById("addtitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myobj={
    title:addtitle.value,
    text:addtxt.value
  }
  // console.log(myobj);
  notesObj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  addtitle.value = "";
  console.log(notesObj);
  shownotes();
});
//add notes
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `    <div id="notes" class="row container-fluid">
        <div class="noteCard card my-2 mx-2" style="width: 18rem">
  
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="deletebtn btn btn-primary">Delete Node</button>
          </div>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to Show Here!! Use "ADD A NODE" section above to add notes`
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}

let searchtxt = document.getElementById("searchtxt");
searchtxt.addEventListener("input", function () {

  let inputVal = searchtxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
