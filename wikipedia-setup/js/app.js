//select elements

const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

const base = "https://en.wikipedia.org/w/api.php";
const url = "?action=query&format=json&origin=*&list=search&srsearch=";

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const value = search.value;
  if (value === '') {
    showFeedback('plz enter a valid search value')
  } else {
    search.value = "";
    // ajax
    ajaxWiki(value);
  }

})
function showFeedback(text){
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(()=>feedback.classList.remove('showItem'), 3000);
}

// ajaxWiki

function ajaxWiki(search) { 
  // loading

    output.innerHTML = "";
    loading.classList.add("showItem");
    console.log(search);
    //output.innerHTML = ""
 }

