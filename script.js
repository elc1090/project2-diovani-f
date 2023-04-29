const apiKey = '9643989fb3ed9a1b382bcdcd480590cf';
const units = 'metric'; // Celsius

document.getElementById("meuBotao").addEventListener("click", function() {
  // Limpar todos os elementos existentes
  const dayElements = document.querySelectorAll('.day-card');
  dayElements.forEach(element => {
    element.remove();
  });

  var city = document.getElementById("meuTextArea").value;
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const forecast = data.list.reduce((acc, curr) => {
        const date = curr.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});

      Object.keys(forecast).forEach((date, index) => {
        const dateObj = new Date(date);
        const weekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
  
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
  
        const dayHeader = document.createElement('h3');
        dayHeader.innerText = weekday;
        dayCard.appendChild(dayHeader);
  
        forecast[date].forEach(weather => {
          const pais = data.city.country;
          const time = weather.dt_txt.split(' ')[1];
          const hour = time.split(':')[0];
          const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
          const temp = weather.main.temp.toFixed(0);
          const humidity = weather.main.humidity;
  
          const weatherBlock = document.createElement('div');
          weatherBlock.classList.add('weather-block');
  
          
          const timeBlock = document.createElement('p');

          timeBlock.classList.add('hora');
          timeBlock.innerText = `${hour}:00`;
          weatherBlock.appendChild(timeBlock);
  
          const icon = document.createElement('img');
          icon.src = iconUrl;
          weatherBlock.appendChild(icon);
  
          const tempBlock = document.createElement('p');
          tempBlock.innerText = `${temp}°C`;
          weatherBlock.appendChild(tempBlock);

          const locationElement = document.getElementById("location");
          locationElement.innerText = `${city} - ${pais}`;
  
          const humidityBlock = document.createElement('p'); 
          humidityBlock.innerText = `Chance de chuva: ${humidity}%`; 
          weatherBlock.appendChild(humidityBlock); 
  
          dayCard.appendChild(weatherBlock);
        });
  
        const dayElement = document.getElementById(`day${index+1}`);
        if (dayElement) {
          dayElement.appendChild(dayCard);
        } else {
          console.error(`Element with ID 'day${index+1}' not found`);
        }
      });
    });
});











