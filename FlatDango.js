let films= [];

document.addEventListener('DOMContentLoaded', async() => {
  films=await fetchAndAppend();
  movieCollectionFunction(films)   
    });
function movieCollectionFunction(films){
    const liIds = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15'];

    films.forEach((film, index) => {
    const liElement = document.getElementById(liIds[index]);  
    liElement.addEventListener('click',() => {  
    const h1Element = document.querySelector('.container h1');
    const pElement = document.querySelector('p#description');
    let ticketsLeftElement = document.querySelector('span#One')
    const timespanElement = document.querySelector('span#Second')
    const runtimeElement = document.querySelector('h3#runtime')
    const imgElement = document.querySelector('.container img');
    const buttonElement = document.querySelector('.container button');
  
    h1Element.textContent=(film.title).toUpperCase();
    timespanElement.textContent=`${film.showtime}`;
    ticketsLeftElement.textContent=`${film.capacity-film.tickets_sold} Only!`;
    ticketsLeftElement.style.setProperty('color', 'red');
    runtimeElement.textContent=`${film.runtime} minutes.`;
    pElement.textContent = film.description;
    imgElement.src = `${film.poster}`

    buttonElement.addEventListener('click', () => {updateTicketsSold(film)});
    });
});
}
// function showMovieByClicking(film){

// }
function fetchAndAppend(){
  return fetch(`http://localhost:3000/films`)
  .then(res=>res.json())
  .then(data=> data   )
  .catch(error => {
  console.error('Error occurred while fetching data:', error);
  }); 
 }
    
function updateTicketsSold(film){
  const newTicketsSold = film.tickets_sold +=1;
  const patchData = {
  tickets_sold: newTicketsSold
  };
  const patchMethod = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
  },
  body: JSON.stringify(patchData)
  }
  fetch(`http://localhost:3000/films/${film.id}`,patchMethod)
    .then(res => res.json())
    .then(data => {
    ticketsLeftElement = document.querySelector('span#One')
    if (film.tickets_sold < film.capacity) {
    film.tickets_sold = newTicketsSold;
    ticketsLeftElement.textContent = `${film.capacity-film.tickets_sold} Only!`;}
    else if(film.tickets_sold === film.capacity ||film.capacity>= newTicketsSold) {
      const buttonElement = document.querySelector('.container button');
      buttonElement.disabled = true;  // Disable the button when sold out
      ticketsLeftElement.textContent = 'Sold Out';
    };   
  })
  .catch(error => {
    console.log('An error occurred while updating the toy:', error);
  });
}
