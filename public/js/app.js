console.log('Client side js is up and running');

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const seachValue = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const location = seachValue.value;
    
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent =  data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forcast;
            }
        });
    })

})
