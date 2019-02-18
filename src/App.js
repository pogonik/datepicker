import React from 'react'
import DatePicker from './datepicker/';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: []
        }
    }

    handleDateSelect = (name, value) => {
        this.setState(state => {
            state.selected[name] = value;
            return state;
        })
    }

    render() {

        return (
            <div className="page-wrapper">
                <section className="section main">
                    <div className="container is-widescreen">

                        <DatePicker
                            language="sr-Latn-RS"
                            firstDayOfWeek={1}
                            id="picker_id_2"
                            type="vertical"
                            selected={this.state.selected['vertical'] || new Date()}
                            initMonth={new Date(2019, 2)}
                            onDateSelect={this.handleDateSelect.bind(this, 'vertical')} />

                        <DatePicker
                            language="en-US"
                            firstDayOfWeek={0}
                            id="picker_id_1"
                            type="horizontal"
                            selected={this.state.selected['horizontal'] || new Date()}
                            initMonth={new Date(2019, 4)}
                            onDateSelect={this.handleDateSelect.bind(this, 'horizontal')} />

                    </div>
                </section>
            </div>
        );
    }
}

export default App;
