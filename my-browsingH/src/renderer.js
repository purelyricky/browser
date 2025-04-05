
import './index.css';

//buttons
const backButton = document.getElementById('back-button');
const forwardButton = document.getElementById('forward-button');
const reloadButton = document.getElementById('reload-button');
const searchButton = document.getElementById('search-button');
const newWindowButton = document.getElementById('new-window-button');
const goButton = document.getElementById('go');

//url field
const urlInputField = document.getElementById('url-input');

//webview
const webview = document.getElementById('webview');
let url = "";

urlInputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleUrl();
  }
});

if(!url){
    url = "https://www.google.com/";
    webview.src = url;
    urlInputField.value = url;
}

goButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleUrl();
  });

//New window button
newWindowButton.addEventListener('click', () => {
  api.newWindow();
})  

searchButton.addEventListener('click', () => {
    url = "https://www.google.com/";
    urlInputField.value = url;
    webview.src = url;
  });

backButton.addEventListener('click', () => {
    if (webview.canGoBack()) {
      webview.goBack();
    }
  });
forwardButton.addEventListener('click', () => {
    if (webview.canGoForward()) {
      webview.goForward();
    }
  });
reloadButton.addEventListener('click', () => {
    webview.reload();
  });
  
webview.addEventListener('did-navigate', (event) => {
    url = event.url;
    urlInputField.value = url;
  });  

function handleUrl() {

  let url = "";  
  const inputUrl = urlInputField.value;

  if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
    url = inputUrl;
  }else{
    url = "https://" + inputUrl;
  }
  webview.src = url;
}
