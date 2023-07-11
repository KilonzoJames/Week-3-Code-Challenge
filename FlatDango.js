let films= [];

document.addEventListener('DOMContentLoaded', async() => {
  films=await fetchAndAppend();
  movieCollectionFunction(films)   
    });
function movieCollectionFunction(films){
    const liIds = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15'];

    films.forEach((film, index) => {
    const liElement = document.getElementById(liIds[index]);  
    const imgElement = document.querySelector('.container img');
    const h1Element = document.querySelector('.container h1');
    const runtimeElement = document.querySelector('h3#runtime');
    const timespanElement = document.querySelector('span#Second');
    const buttonElement = document.querySelector('.container button');
    const pElement = document.querySelector('p#description');

    liElement.addEventListener('click',() => {  
    imgElement.src = film.poster;
    h1Element.textContent=film.title.toUpperCase();
    let remainingTickets = film.capacity -film.tickets_sold;
    runtimeElement.textContent=`${film.runtime} minutes.`;
    timespanElement.textContent=film.showtime;
    pElement.textContent = film.description;
  });
  

   
    buttonElement.addEventListener('click', () => {
      // updateTicketsSold(film)
    });
     if (index === 0) {
      liElement.click(); // Trigger click on the first liElement
    };
  });
    }

// function showMovieByClicking(film){

// }
function fetchAndAppend(){
  return fetch(`http://localhost:3000/films`)
  .then(res=>res.json())
  .then(film=> film   )
  .catch(error => {
  console.error('Error occurred while fetching data:', error);
  }); 
 }
    
function updateTicketsSold(film){
  const newTickets=film.tickets_sold+=1;
  const patchData = {
  tickets_sold: newTickets
  };
  const patchMethod = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
  },
  body: JSON.stringify(patchData)
  }
  return fetch(`http://localhost:3000/films/${film.id}`,patchMethod)
  .then(res => res.json())
  .then(() => {
    let remainingTickets = film.capacity -film.tickets_sold;
    let newRemainingTickets=remainingTickets-1;
    let ticketsLeftElement = document.querySelector('span#One');
    ticketsLeftElement.textContent = `${(newRemainingTickets)} Only!`;
    ticketsLeftElement.style.setProperty('color', 'red');
    if ((remainingTickets) === 0) {
      buttonElement.disabled = true; // Disable the button
      buttonElement.textContent = 'Sold Out'; // Update button text to "Sold Out"
        }
        })
  .catch(error => {
    console.log('An error occurred while updating films:', error);
  });
}
