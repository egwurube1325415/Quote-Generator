const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show Loading
// function loading() {
//   loader.hidden = false;
//   quoteContainer.hidden = true;
// };

// // HIde Loading
// function complete() {
//   if(!loader.hidden) {
//     quoteContainer.hidden = false;
//     loader.hidden = true;
//   }
// }

// Get Quote From API
async function getQuote() {
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // If the Author is unknown, add "unknown"
    if ( data.quoteAuthor ==='') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce the font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    //stop loader, show quote
    //complete();
  } catch (error) {
    getQuote();
    //console.log('Whoops no jokes', error);
  }
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuote;