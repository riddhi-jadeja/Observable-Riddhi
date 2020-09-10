import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { messageService } from '@/_services';
import { HomePage } from '@/HomePage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.subscription = messageService.getMessage().subscribe(message => {
            if (message) {
                this.setState({ data: message.text });
            } else {
                this.setState({ data: "" });
            }
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const { messages } = this.state;
        return (
            <div id="wrapper">
                <div className="top-header">
                    Dashboard
                </div>
                <div className="top-section">
                    <img src="src/temp.jpg" />
                    <div className="content">
                        <span>{this.state.data.temperature} &#8451;</span> Temperature
                    </div>
                </div>
                <div className="top-section">
                    <img src="src/air.jpg" />
                    <div className="content">
                        <span>{this.state.data.air_pressure} mm</span> Air Pressure
                    </div>
                </div>
                <div className="top-section">
                    <img src="src/humidity.jpg" />
                    <div className="content">
                        <span>{this.state.data.humidity}</span> Humidity
                    </div>
                </div>
                <Route path="/" component={HomePage}/>
            </div>
        );
    }
}

export {App};
