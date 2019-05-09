import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CURRENCY_NAMES = {
    'SEK':'Swedish krona',
    'USD': 'US dollar',
    'JPY': 'Japanese yen',
    'BGN': 'Bulgarian lev',
    'CZK': 'Czech koruna',
    'DKK': 'Danish krone',
    'GBP': 'Pound sterling',
    'HUF': 'Hungarian forint',
    'PLN': 'Polish zloty',
    'RON': 'Romanian leu',
    'CHF': 'Swiss franc',
    'ISK': 'Icelandic krona',
    'NOK': 'Norwegian krone',
    'HRK': 'Croatian kuna',
    'RUB': 'Russian rouble',
    'TRY': 'Turkish lira',
    'AUD': 'Australian dollar',
    'BRL': 'Brazilian real',
    'CAD': 'Canadian dollar',
    'CNY': 'Chinese yuan renminbi',
    'HKD': 'Hong Kong dollar',
    'IDR': 'Indonesian rupiah',
    'ILS': 'Shekel',
    'INR': 'Indian rupee',
    'KRW': 'South Korean won',
    'MXN': 'Mexican peso',
    'MYR': 'Malaysian ringgit',
    'NZD': 'New Zealand dollar',
    'PHP': 'Philippine peso',
    'SGD': 'Singapore dollar',
    'THB': 'Thai baht',
    'ZAR': 'South African rand',
    'EUR': 'Euro',
};

const LOOK_UP = new Map(Object.entries(CURRENCY_NAMES));

class Statics extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            base: '',
            rates: {},
            from: '',
            till: '',
            startDate: new Date(),
            endDate: new Date(),
         };
    }
  
   componentDidUpdate() {
        if(this.state.base && this.state.from && this.state.till) {
            const url = `https://api.exchangeratesapi.io/history?start_at=${this.state.from}&end_at=${this.state.till}&base=${this.state.base}`;
            fetch(url, { signal: this.abortController.signal })
                .then((response) => { return response.json()})
                .then(data => {this.setState({rates: data.rates})})
                .catch(error => console.log(error)); 
       }
    }

    abortController = new window.AbortController();

    componentWillUnmount = () => this.abortController.abort();

    changeBase = (e) => {
        this.setState({base: e.target.value});
    }

    changeStartDate = (e) => {
        let date = new Date(e).toISOString().split("T")[0];
        this.setState({startDate: e, from: date});
    }

    changeEndDate = (e) => {
        let date = new Date(e).toISOString().split("T")[0];
        this.setState({endDate: e, till: date});
    }
    
    renderCodes() {
        return(Object.entries(CURRENCY_NAMES).map((item, i) => (<option value={item[0]} key={i}>{item[1]}</option>)));
    }


    renderStatics() {
        return (
            Object.entries(this.state.rates).map((item, i) => 
                <div key={i} className="tableContainer">
                    <table className="ratesTable ">
                        <thead>
                            <tr>
                                <th colSpan='4'className="date">{item[0]}</th>
                            </tr>
                            <tr>
                                <th>Flag</th>
                                <th>Currency</th>
                                <th>Currency code</th>
                                <th>Exchange rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(item[1]).filter(item => item[0] !== 'ILS')  // exclude Israel 
                                .map((item, i) => 
                                <tr key={i}>
                                    <td><img key={item[0]} src={require(`../../image/${item[0]}.jpg`)} alt="" className="flag" /></td>
                                    <td>{LOOK_UP.get(item[0])}</td>
                                    <td>{item[0]}</td>
                                    <td>{item[1].toFixed(2)}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>)
        );

    }

    render() {
        return (
            <div className="static">
                <h1>HISTORICAL RATES</h1>
                <p>In this page you can get the historical rates for any curreny and for any day since 1999.</p>
                <div className="selection">
                    <div>
                        <label>Base currency </label>
                        <select onChange={this.changeBase}>
                            <option value="">Base currency</option>
                            {this.renderCodes()}              
                        </select>
                    </div>
                    <div>
                        <label>From </label>
                        <DatePicker 
                            dateFormat='yyyy-MM-dd'
                            selected={this.state.startDate}
                            onChange={this.changeStartDate}
                        />
                    </div>
                    <div>
                        <label>Till </label>
                        <DatePicker 
                            dateFormat='yyyy-MM-dd'
                            selected={this.state.endDate}
                            onChange={this.changeEndDate}
                        />
                    </div>
                </div>
                <div>
                    {this.renderStatics()}
                </div>
            </div>
        );
    }
}
export default Statics;
