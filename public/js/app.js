console.log('Client Side JS loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('p.errorMsg');
const messageTwo = document.querySelector('p.weatherForecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(search.value))
        .then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error;
                }else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
    ;
});