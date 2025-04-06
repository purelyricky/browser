
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

// Add click-through mode toggle
document.addEventListener('keydown', (event) => {
  // Check for Ctrl+Alt+C keyboard shortcut
  if (event.ctrlKey && event.altKey && event.key === 'c') {
    api.toggleClickThrough();
  }
});

// Add listener for click-through status updates
window.api.receive && window.api.receive('click-through-status', (isClickThrough) => {
  const indicator = document.getElementById('click-through-indicator');
  if (indicator) {
    if (isClickThrough) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  }
});

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
