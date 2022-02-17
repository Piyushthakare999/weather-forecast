let city;
const apiKey = '1e6255ebf9fea5c3b503b5cb118b941d'
let s = false;
if (screen.width <= "800") {
    s = true;
    // console.log("true")
    // console.log(screen.width)
}

function change1() {
    // document.getElementById("week").style.transform="scale(0)";
    // document.getElementById("wdetail").style.transform="scale(1)";
    document.getElementById("wdetail").style.display = "flex";
    document.getElementById("week").style.display = "none";
    let element = document.querySelector('#btnwd::before')
    // let style = window.getComputedStyle(element, '::before')
    // style.left="60%"
    // console.log(style)
}
function change2() {
    // document.getElementById("wdetail").style.transform="scale(0)";
    // document.getElementById("week").style.transform="scale(1)";
    document.getElementById("week").style.display = "flex";
    document.getElementById("wdetail").style.display = "none";

}
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // console.log(e)
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









function getlocation() {
    // console.log(navigator.getlocation)
    if (navigator.geolocation) {
        // alert("hi")
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
        weatherDetails(data)
        weekdata(data)
    });
}
function onError(error) {
    alert("error in getting location")
}




function getcity1() {
    city = document.querySelector(".search-container>input").value;
    if (city !== "") {
        getcity(city)
    }
    else {
        alert("enter valid city")
    }
}
function getcity2() {
    city = document.querySelector("#welcome>input").value;
    if (city !== "") {
        getcity(city)
    }
    else {
        alert("enter valid city")
    }
}

function getcity(city) {

    requestApi(city);
}

function requestApi(city) {
    // console.log(city)
    let api1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetch(api1).then(response => response.json()).then(result => getll(result));

    // fetch(api).then(response=>console.log(response.json()));
    // let lon=
    // let api2=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}`
    // fetch(api2).then(response=>console.log(response.json()));
}
function getll(info) {
    if (info.cod === "404") {
        alert("enter valid name")
    }
    else {
        // console.log(info.name)
        document.getElementById("cityname").innerText = info.name + "," + info.sys.country;
        let lat = info.coord.lat;
        let lon = info.coord.lon;
        // displayLocation(lat,lon)
        let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
        fetch(api2).then(res => res.json()).then(data => {
            console.log(data)
            weatherDetails(data)
            weekdata(data)
        });
    }
}




function weatherDetails(info) {
    document.querySelector("#intro").style.display = "none";
    document.querySelector("#main").style.display = "flex";
    // const { description, id } = info.weather[0];
    const { feels_like, humidity, pressure, temp, uvi, dew_point, dt, sunrise, sunset,wind_speed } = info.current;
    // console.log(feels_like)
    //basic area

    // getting time of country
    let timezone = info.timezone_offset
    // let newt=inttime(timezone)
    let d = new Date()
    // console.log/(d)
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var atlanta = (utc + (1000 * timezone))
    // console.log(atlanta)
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
    // let sr=window.moment(sunrise).tz(info.timeZone).format("hh:mm ")

    document.getElementById("Wind-speed").innerText = `${wind_speed}`

    // document.getElementById("Sunset").innerText = `${sunset}`
    let x = Math.floor(`${temp}`)
    document.querySelector("#temp>span").innerText = x


    console.log(convertTZ(sunrise,info.timezone))
    // getting image accordinglay
    setimage("icon", id);


}

function inttime(timezone){
    let d = new Date()
    // let timezone = info.timezone_offset
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var atlanta = (utc + (1000 * timezone))
    return atlanta;
    // let t = window.moment(atlanta).format("hh:mm a, DD MMM ")

}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

function weekdata(data) {

    for (let i = 0; i < 7; i++) {
        let day = data.daily[i].dt;
        let a = window.moment(day * 1000).format("DD");
        // console.log(a)
        let b = window.moment(day * 1000).format("ddd");
        document.getElementById(`date${i + 1}`).innerText = a + " - " + b;
        // document.getElementById(`day${i + 1}`).innerText=b 

        document.getElementById(`td${i + 1}a`).innerText = data.daily[i].temp.day;
        document.getElementById(`td${i + 1}b`).innerText = data.daily[i].uvi;
        document.getElementById(`td${i + 1}c`).innerText = data.daily[i].humidity;
        let id2 = data.daily[i].weather[0].id;
        setimage(`day${i + 1}`, id2)
    }
}



function setimage(dom, id) {
    console.log(id, dom)
    if (!s) {
        // document.body.style.background = "#a2d5fd"
    }

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
                document.getElementById("main1").style.backgroundImage = "url(assets/tqjq_z70r_170504.jpg)"
                document.body.style.backgroundImage="url(assets/tqjq_z70r_170504.jpg)"
                document.body.className="body2"
            // document.getElementById("main1").style.color = "white"
            // document.getElementById("detail").style.color = "white"
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


{/* <div class="arc">
</div>
<h1><span>LOADING</span></h1> */}