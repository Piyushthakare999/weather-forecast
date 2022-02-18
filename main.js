let city;
let apiKey=api_key;
let s = false;
if (screen.width <= "800") {
    s = true;
}
// togglr between weather details and 7 days
function change1() {
    document.getElementById("wdetail").style.display = "flex";
    document.getElementById("week").style.display = "none";
    let a=document.getElementById("btnwd").classList.contains("btnactive")
    let b=document.getElementById("btnweek").classList.contains("btnactive")
    if(!a){
        document.getElementById("btnwd").classList.add("btnactive")
        document.getElementById("btnweek").classList.remove("btnactive")
    }
}
function change2() {
    document.getElementById("week").style.display = "flex";
    document.getElementById("wdetail").style.display = "none";
    let a=document.getElementById("btnwd").classList.contains("btnactive")
    let b=document.getElementById("btnweek").classList.contains("btnactive")
    if(!b){
        document.getElementById("btnweek").classList.add("btnactive")
        document.getElementById("btnwd").classList.remove("btnactive")
    }

}
// on enter btn enable search
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        city = document.querySelector(".search-container>input").value;
        let city2 = document.querySelector("#welcome>input").value;
        if (city === "" && city2 === "") {
            alert("enter valid city")
        }
        else {
            if (city !== "") {
                getcity(city)
            }
            else {
                getcity(city2)
            }
        }
    }
})


// get device location

function getlocation() {
    console.log("debvice location data: "+navigator.getlocation)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        alert("your browser doesn't support geolocation")
    }
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    let api3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    fetch(api3).then(res => res.json()).then(data => {
        console.log(data)
        weatherDetails(data)
        weekdata(data)
    });
}
function onError(error) {
    alert("error in getting location")
}


// get city from nav search bar
function getcity1() {
    city = document.querySelector(".search-container>input").value;
    if (city !== "") {
        getcity(city)
    }
    else {
        alert("enter valid city")
    }
}
// get city from intro search bar
function getcity2() {
    city = document.querySelector("#welcome>input").value;
    if (city !== "") {
        getcity(city)
    }
    else {
        alert("enter valid city")
    }
}
// forwording city to api
function getcity(city) {
    requestApi(city);
}

// forwording api data
function requestApi(city) {
    console.log("enterd city: "+city)
    let api1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetch(api1).then(response => response.json()).then(result => getll(result));
}

// getting lon lat to forword another api (main api)
function getll(info) {
    if (info.cod === "404") {
        alert("enter valid name")
    }
    else {
        document.getElementById("cityname").innerText = info.name + "," + info.sys.country;
        let lat = info.coord.lat;
        let lon = info.coord.lon;
        let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
        fetch(api2).then(res => res.json()).then(data => {
            console.log(data)
            weatherDetails(data)
            weekdata(data)
        });
    }
}


// updating info 

function weatherDetails(info) {
    document.querySelector("#intro").style.display = "none";
    document.querySelector("#main").style.display = "flex";
    const { feels_like, humidity, pressure, temp, uvi, dew_point, dt, sunrise, sunset,wind_speed } = info.current;
    //basic area

    // getting time of country
    let timezone = info.timezone_offset
    let d = new Date()
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var atlanta = (utc + (1000 * timezone))
    let t = window.moment(atlanta).format("hh:mm a, DD MMM ")
    document.getElementById("datentime").innerText = t
    document.getElementById("des").innerText = info.current.weather[0].description

    //detail area
    let id = info.current.weather[0].id;
    document.getElementById("feelslike").innerText = `${feels_like}`
    document.getElementById("humidity").innerText = `${humidity}`
    document.getElementById("pressure").innerText = `${pressure}`
    document.querySelector("#temperature span").innerText = `${temp}`
    document.getElementById("uvi").innerText = `${uvi}`
    document.getElementById("dew_point").innerText = `${dew_point}`

    document.getElementById("Wind-speed").innerText = `${wind_speed}`

    let x = Math.floor(`${temp}`)
    document.querySelector("#temp>span").innerText = x

    // getting image accordinglay
    setimage("icon", id);
}


// week data(7 day)
function weekdata(data) {

    for (let i = 0; i < 7; i++) {
        let day = data.daily[i].dt;
        let a = window.moment(day * 1000).format("DD");
        let b = window.moment(day * 1000).format("ddd");
        document.getElementById(`date${i + 1}`).innerText = a + " - " + b;

        document.getElementById(`td${i + 1}a`).innerText = data.daily[i].temp.day;
        document.getElementById(`td${i + 1}b`).innerText = data.daily[i].uvi;
        document.getElementById(`td${i + 1}c`).innerText = data.daily[i].humidity;
        let id2 = data.daily[i].weather[0].id;
        setimage(`day${i + 1}`, id2)
    }
}

// updating images

function setimage(dom, id) {
    console.log(id, dom)

    if (id === 800) {
        document.querySelector(`#${dom} img`).src = "assets/clearsky.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/clearwR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/clearw.jpg)"
                document.body.style.backgroundImage="url(assets/clearw.jpg)"
                document.body.className="body2"

            }
        }
    }
    else if (id >= 200 && id <= 232) {
        document.querySelector(`#${dom} img`).src = "assets/thunderstorm.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/thunderwR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/9zrt_utdi_190210.jpg)"
                document.getElementById("detail").style.color = "white"
                document.body.style.backgroundImage="url(assets/9zrt_utdi_190210.jpg)"
                document.body.className="body2"

            }
        }
    }
    else if (id >= 600 && id <= 622) {
        document.querySelector(`#${dom} img`).src = "assets/snow.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/snowR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/free-snow.jpg)"
                document.body.style.backgroundImage="url(assets/free-snow.jpg)"
                document.body.className="body2"
            }
        }
    }
    else if (id >= 701 && id <= 781) {
        document.querySelector(`#${dom} img`).src = "assets/mist.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/mistwR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/eric-muhr-Fs-bcmsV-hA-unsplash.jpg)"
                document.body.style.backgroundImage="url(assets/eric-muhr-Fs-bcmsV-hA-unsplash.jpg)"
                document.body.className="body2"
            }
        }
    }
    else if (id >= 801 && id <= 804) {
        document.querySelector(`#${dom} img`).src = "assets/clouds.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/cloudwR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/cloudw.jpg)"
                document.body.style.backgroundImage="url(assets/cloudw.jpg)"
                document.body.className="body2"
            }
        }
    }
    else if (id >= 300 && id <= 321) {
        document.querySelector(`#${dom} img`).src = "assets/drizzle.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/drizzlewR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/drizzle.jpg)"
                document.body.style.backgroundImage="url(assets/drizzle.jpg)"
                document.body.className="body2"
            }
        }
    }

    else if (id >= 500 && id <= 531) {
        document.querySelector(`#${dom} img`).src = "assets/rain.png"
        if (dom === "icon") {
            if (s) {
                document.body.style.backgroundImage = "url(assets/rainywR.jpg)"
            }
            else {
                document.getElementById("main1").style.backgroundImage = "url(assets/rainyweather.jpg)"
                document.body.style.backgroundImage="url(assets/rainyweather.jpg)"
                document.body.className="body2"
            }
        }
    }

}
