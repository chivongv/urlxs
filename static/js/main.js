const myForm = document.getElementById('myForm');
const btn_copy = document.getElementById('btn_copy');

myForm.addEventListener('submit', e => {
  e.preventDefault();
  shortenUrl();
});

btn_copy.addEventListener('click', () => copyUrl());

function shortenUrl(){
  let longUrl = document.getElementById('input').value;
  let copyText=document.getElementById('copyText');

  const xhr = new XMLHttpRequest();
  xhr.open("POST", '/api/shorten', true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      let data = this.responseText;
      copyText.value = JSON.parse(data).shortUrl;
    }
  }

  xhr.send(JSON.stringify({ longUrl }));

}

function copyUrl(){
  let copyText =document.getElementById('copyText');

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");

}
