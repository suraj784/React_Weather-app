import React, { Component } from "react";

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            city: 'Chiplun',
            temp: '30',
            description: 'Humid',
            wind: '0.39',
            apik: "0d95ec873ead25a457545222c4a64693"
        };
    }
    // Celsius = Kelvin - 273.15
    conversion(val) {
        return (val - 273.15).toFixed(2);
    }

    myChangeHandler = (event) => {
        this.setState({ inputVal: event.target.value });
    }

    mySubmitHandler = async (event) => {event.preventDefault();
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputVal}&appid=${this.state.apik}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.cod === 200) {
                this.setState({
                    city: data.name,
                    temp: this.conversion(data.main.temp),
                    description: data.weather[0].description,
                    wind: data.wind.speed
                });
            } else {
                alert('You entered the wrong city name');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <section className="main">
                    <section className="inputs">
                        <form onSubmit={this.mySubmitHandler}>
                            <input 
                                type="text"  
                                placeholder="Enter any city..." 
                                id="cityinput" 
                                value={this.state.inputVal}
                                onChange={this.myChangeHandler}
                            />
                            <input 
                                type="submit" 
                                value="Submit" 
                                id="add"
                            />
                        </form>
                    </section>
                    <section className="display">
                        <div className="wrapper">
                            <h2 id="cityoutput">Weather of <span>{this.state.city}</span></h2>
                            <p id="description">Sky Condition: <span>{this.state.description}</span></p>
                            <p id="temp">Temperature: <span>{this.state.temp} °C</span></p>
                            <p id="wind">Wind Speed: <span>{this.state.wind} km/h</span></p>
                        </div>
                    </section>
                </section>
            </div>
        );
    }
}

export default Weather;
