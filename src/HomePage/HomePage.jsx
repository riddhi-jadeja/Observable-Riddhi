import React from 'react';
import Emitter from '../_services/emitter';  
import { messageService } from '@/_services';

class HomePage extends React.Component {
    state = { 
        temperature: '24.2', 
        air_pressure:'12',
        humidity:'345',
        temperature_emitted_time: new Date().getTime(),
        air_pressure_emitted_time: new Date().getTime(),
        humidity_emitted_time: new Date().getTime()
    };
    componentDidMount() {
        Emitter.on('data', data => this.displayObject(data));
        setTimeout(()=>{
            this.emitData();
        },500)
        const interval = setInterval(() => {
            let current_time = new Date().getTime();
            let last_temp_emitted = (current_time - this.state.temperature_emitted_time);
            let last_pressure_emitted = (current_time - this.state.air_pressure_emitted_time);
            let last_humidity_emitted = (current_time - this.state.humidity_emitted_time);
            if(last_temp_emitted > 1000)
                this.setState({temperature:"N/A"})  
            if(last_pressure_emitted > 1000)
                this.setState({air_pressure:"N/A"})
            if(last_humidity_emitted > 1000)
                this.setState({humidity:"N/A"})
            this.emitData();
        }, 5000);
    }

    componentWillUnmount() {
        Emitter.off('data');
    }
    displayObject(data) {
        messageService.sendMessage(data);
    }

    clearMessages() {
        messageService.clearMessages();
    }
    emitData () {
        Emitter.emit('data', this.state);
    }

    render() {
        return (
            <div className="form-block">
                <div>
                    <h3>Temperature</h3>
                    <input type="text" value={this.state.temperature === "N/A" ? "" : this.state.temperature} onChange={(e) => this.setState({temperature: e.target.value,temperature_emitted_time: new Date().getTime()},()=> this.emitData())} />
                </div>
                <div>
                    <h3>Air Pressure</h3>
                    <input type="text" value={this.state.air_pressure === "N/A" ? "" : this.state.air_pressure} onChange={(e) => this.setState({air_pressure: e.target.value,air_pressure_emitted_time: new Date().getTime()},()=> this.emitData())} />
                </div>
                <div>
                    <h3>Humidity</h3>
                    <input type="text" value={this.state.humidity === "N/A" ? "" : this.state.humidity} onChange={(e) => this.setState({humidity: e.target.value,humidity_emitted_time: new Date().getTime()},()=> this.emitData())} />
                </div>
            </div>
        );
    }
}

export { HomePage };