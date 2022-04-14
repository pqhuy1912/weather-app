const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const search = $('.search')
const city = $('.city')
const country = $('.country')
const time = $('.time')
const temperature = $('.value')
const desc = $('.desc')
const visibility = $('.visibility p')
const wind = $('.wind p')
const cloud = $('.cloud p')
const body = document.body

async function changeWeather(value){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    try {
        const res = await fetch(url)
        if(res && res.ok === false){
            throw new Error('Vui lòng nhập chính xác tên Thành Phố !!!')
        }
        const data = await res.json()
        
        city.innerText = data.name
        country.innerText = data.sys.country
        time.innerText = new Date().toLocaleString()

        const temp = Math.round(data.main.temp)
        temperature.innerText = temp
        temp < 20 ? body.className = 'cold' : body.className = 'hot'

        desc.innerText = data.weather[0].main
        visibility.innerText = data.visibility + ' (m)'
        wind.innerText = data.wind.speed + ' (m/s)'
        cloud.innerText = data.clouds.all + ' (%)'
        console.log(data)
    } catch (error) {
        alert(error.message)
    }
}

search.onkeyup = function(e){
    if(e.keyCode === 13){
        changeWeather(this.value.trim())
        this.value = ''
    }
}
changeWeather('ha noi')