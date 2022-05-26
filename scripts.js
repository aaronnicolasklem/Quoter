 const quoteContainer=document.getElementById('quote-container');
 const quoteText=document.getElementById('quote-text');
 const quoteAuthor=document.getElementById('quote-author');
 const twitterBtn=document.getElementById('btnTwitter');
 const newQuoteBtn=document.getElementById('new-quote');
 const loader=document.getElementById('loader');

 var apiQuotes=[];
 //loading
 function loading() {
     loader.hidden = false;
     quoteContainer.hidden=true;
 }
 function complete_loading(){
    loader.hidden=true;
     quoteContainer.hidden=false;
}
 
 function selectQuote() {
    loading();
    var pickaNumber= Math.floor(Math.random()*apiQuotes.length);
    var chosenQuote=apiQuotes[pickaNumber];
    quoteAuthor.textContent=chosenQuote.author;
    quoteText.textContent=chosenQuote.text;
    //if author is blank/null, make unknown
    if(!chosenQuote.author) quoteAuthor.textContent ='Unknown';
    else quoteAuthor.textContent = chosenQuote.author;
    //Determine if quote is a long quote
    if (chosenQuote.text.length>120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote'); 
    //Assign chosen quote values to page 
    
    complete_loading();
    //apiQuotes=apiQuotes.splice(pickaNumber,1);
    if(apiQuotes.length<10) getApiQuotes();
    return chosenQuote;
}

async function getApiQuotes() {
    
    const apiUrl='https://type.fit/api/quotes';
    loading();
try {
    const res = await fetch(apiUrl);
    apiQuotes= await res.json();
    console.log(`${apiQuotes.length} quotes recived`);
    
    selectQuote();
} catch (err){

}
}
function tweetQuote(){
    console.log("tweet");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Listeners
newQuoteBtn.addEventListener('click',selectQuote);
twitterBtn.addEventListener('click',tweetQuote);


//Onload, fetch quotes
getApiQuotes();