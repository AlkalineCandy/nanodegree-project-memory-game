/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



document.addEventListener('DOMContentLoaded', function (event) {

    // Initial variables 

    let cards = Array.from(document.getElementsByClassName('card'));
    let deck = document.querySelector('.deck');
    let openCards = [];
    let counter = 0;


    // Setting up the cards for the game

    let shuffledCards = shuffle(cards);
    setCards();


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


    function setCards() {

        for (let i = 0; i < shuffledCards.length; i++) {
            deck.appendChild(shuffledCards[i]);
        }

    };


    // Click function for playing; also compares the cards to see if they match 

    let playFunc = function (event) {
        showCard(event);
        addToOpenCards(event);
        counterFunc(event);


        if (openCards.length === 2 && openCards[0].firstElementChild.isEqualNode(openCards[1].firstElementChild)) {
            lockMatch(event);
            removeFromArray(openCards, 2);

        } else if (openCards.length === 2 && !openCards[0].firstElementChild.isEqualNode(openCards[1].firstElementChild)) {
            flipBack(event);
            removeFromArray(openCards, 2);

        }

    };

    // Functions called upon a click 


    let showCard = function (event) {
        return event.target.classList.add('open', 'show');
    };

    let addToOpenCards = function (event) {
        return openCards.push(event.target);
    };


    let lockMatch = function (event) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards[0].removeEventListener('click', playFunc);
        openCards[1].removeEventListener('click', playFunc);

    };

    let flipBack = function (event) {

        window.setTimeout(function () { // sets the time after which incorrect cards will be flipped back

            cards.forEach(card => {
                card.classList.remove('open', 'show');
            })

        }, 800);
    }


    let removeFromArray = function (arr, item) { // function that removes 2 items from the openCards array at once 
        for (var i = 0; i < item; i++) {
            arr.pop();
        }

    };

    let counterFunc = function (event) {

        counter += 1;
        return document.querySelector('.moves').innerHTML = counter;

    };

    // Event listener: making cards clickable 

    for (let j = 0; j < shuffledCards.length; j++) {

        shuffledCards[j].addEventListener('click', playFunc);

    }

}); // closes the DOMContentLoaded event listener 



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */