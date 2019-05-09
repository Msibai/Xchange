import React, { Component } from 'react';

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

class Rates extends Component {
    constructor(props) {
        super(props);
            this.state = {
                date: '',
                base: '',
                rate: [],
        }
        this.changeBase = this.changeBase.bind(this);
        this.renderCodes = this.renderCodes.bind(this);
        this.renderRates = this.renderRates.bind(this);
    }
   
// Using Euro as base curency when the page is loaded
    componentDidMount() {
        const url = `https://api.exchangeratesapi.io/latest?base=EUR`;
        fetch(url)
            .then((response) => { return response.json()})
            .then((data) => {this.setState({
                                rate: Object.entries(data.rates),
                                date: data.date })})                           
            .catch((error) => console.log(error));
    }

// Using template strings to update the state for base currency   
    componentDidUpdate() {
        const url = `https://api.exchangeratesapi.io/latest?base=${this.state.base}`;
        fetch(url, { signal: this.abortController.signal })
            .then((response) => { return response.json()})
            .then((data) => {this.setState({
                                rate: Object.entries(data.rates),
                                date: data.date })})                           
            .catch((error) => console.log(error));
    }

    abortController = new window.AbortController();

    componentWillUnmount = () => this.abortController.abort();

    changeBase = (e) => {
        this.setState({base: e.target.value});
    }

    renderRates() {
        return(
            <div className="tableContainer">
                <p>Updated: {this.state.date}</p>
                <table className="ratesTable">
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Currency</th>
                            <th>Currency code</th>
                            <th>Exchange rate</th>
                        </tr>
                    </thead>
                    {this.state.rate.filter(item => item[0] !== 'ILS') // exclude Israel 
                        .map((item, i) => (
                                <tbody key={i}>
                                    <tr>
                                        <td><img key={item[0]} src={require(`../../image/${item[0]}.jpg`)} alt="" className="flag" /></td>
                                        <td>{LOOK_UP.get(item[0])}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1].toFixed(2)}</td>
                                    </tr>
                                </tbody>
                        ))}
                </table>
            </div>   
        );
    }

    renderCodes() {
        return(
            Object.entries(CURRENCY_NAMES).filter(item => item[0] !== 'EUR') // Exclude Euro because its already there
                .map((item, i) => (<option value={item[0]} key={i}>{item[1]}</option>))    
        );
    }

    render() {
        return (
            <div>
                <div>
                    <h1>CURRENCY RATES</h1>
                    <p>Here you can find foreign exchange rates for different currencies. All rates are obtained from <b>European Central Bank.</b></p>
                    <p>Please note that rates are quoted against the Euro by default, but you can change it by choesing another base currency</p>
                    <label style={{margin: "1rem"}}><b>Base Currency</b></label>
                    <select onChange={this.changeBase}>
                        <option value="EUR">Euro</option>
                        {this.renderCodes()}              
                    </select>
                </div>                  
                {this.renderRates()}
            </div>
        );
    }
}
 
export default Rates;
