import React from 'react';
import logo from './logo.svg';
import Info from './Components/Info';
import Form from './Components/Form';
import WeatherInfo from './Components/WeatherInfo';

const api_key = 'e4fd0785996a823eb7cf7351baff8d08';

class App extends React.Component{

  state = {
    /*temp: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    error: undefined*/
    temp: '',
    city: '',
    country: '',
    sunset: '',
    error: ''
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
    const data = await api_url.json();
    if(data.cod === "404"){
      this.setState({
        temp: '',
        city: '',
        country: '',
        sunset: '',
        error: "City " + city + " have not found"
      });
      return;
    }

    if(city){
      let temperature = Math.floor(data.main.temp - 273.15);

      let sunset = (data.sys.sunset)*1000;
      let date = new Date(sunset);
      let sunsetTime = date.toLocaleTimeString();

      this.setState({
        temp: temperature,
        city: data.name,
        country: data.sys.country,
        sunset: sunsetTime,
        error: undefined
      });
    }
    else{
      this.setState({
        temp: '',
        city: '',
        country: '',
        sunset: '',
        error: "Please enter the city name"
      });
    }
  }

  render(){
    return (
        <div className="wrapper">
        <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 info">
                  <Info />
                </div>
                <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather}/>
                <WeatherInfo
                  temp= {this.state.temp}
                  city= {this.state.city}
                  country= {this.state.country}
                  sunset= {this.state.sunset}
                  error = {this.state.error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
