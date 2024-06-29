document.addEventListener("DOMContentLoaded", function() {
    const weatherInfo = document.getElementById("weather-info");

    // Lấy tọa độ địa lý của người dùng
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        }, () => {
            weatherInfo.innerHTML = "<p>Unable to retrieve your location.</p>";
        });
    } else {
        weatherInfo.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }

    // Hàm gọi API từ server để lấy thông tin thời tiết
    function getWeather(lat, lon) {
        const url = `/api/weather?lat=${lat}&lon=${lon}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    weatherInfo.innerHTML = `<p>${data.error}</p>`;
                } else {
                    const temp = data.main.temp;
                    const weather = data.weather[0].description;
                    const city = data.name;
                    weatherInfo.innerHTML = `
                        <h2>${city}</h2>
                        <p>${temp}°C</p>
                        <p>${weather}</p>
                    `;
                }
            })
            .catch(() => {
                weatherInfo.innerHTML = "<p>Unable to fetch weather data.</p>";
            });
    }
});
