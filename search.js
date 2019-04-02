const searchBar = document.querySelector('input');
const queryField = document.querySelector('input');
let searchParameters = {
  action: 'query',
  list: 'search',
  origin: '*',
  format: 'json'
};
let result;
let outputElement = document.querySelector('.results');

const outputResults = results => {
  results = results.query.search;
  // console.log(results.query.search[0].snippet);
  outputElement.innerHTML = '';
  for (let i = 0; i < results.length; i++) {
    console.log(results[i].snippet);
    const result = `
    <a class="result-anchor" href="https://en.wikipedia.org/wiki/${results[i]
      .title}">
      <div class="result">
        <h1>${results[i].title}</h1>
        <p>&quot;${results[i].snippet} ...&quot;</p>
      </div>
    </a>`;

    outputElement.innerHTML += result;
  }
};


function sendData(data) {
  return new Promise(function(resolve, reject) {
    var XHR = new XMLHttpRequest();
    XHR.responseType = 'json';
    var urlEncodedData = '';
    var urlEncodedDataPairs = [];
    var name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for (name in data) {
      urlEncodedDataPairs.push(
        encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
      );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // Define what happens on successful data submission
    XHR.onload = function() {
      if (XHR.status === 200 && XHR.readyState === 4) {
        console.log('XHR resolve');
        resolve(XHR.response);
      } else {
        reject(Error(XHR.statusText));
      }
    };
    XHR.onerror = error => reject(Error('Network error.'));
    // Set up our request
    XHR.open('POST', 'https://en.wikipedia.org/w/api.php');

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Finally, send our data.
    console.log(urlEncodedData);
    XHR.send(urlEncodedData);
  });
}

searchBar.addEventListener('keyup', function(e) {
  if (searchBar.value != '' && e.keyCode === 13) {
    searchParameters.srsearch = queryField.value;
    sendData(searchParameters).then(results => outputResults(results));
  }
});
searchBar.addEventListener('click', function() {
  searchBar.classList.add('open');
  searchBar.classList.remove('collapsed');
});
