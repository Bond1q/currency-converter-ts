import axios from 'axios';
import React, { FC, useState, useEffect } from 'react';
import '../styles/container.scss'
import CurrencyRate from './CurrencyRate';
import Inputs from './Inputs';

interface ICurrencyName {
	[key: string]: string;
}
interface ICurrencyRate {
	[key: string]: number;
}

interface ICurrencyToProps {
	initials: string;
	name: string;
	rate: number;
}

const Container: FC = () => {

	const [currenciesNames, setCurrencies] = useState<ICurrencyName>({});
	const [currenciesRates, setCurrenciesRates] = useState<ICurrencyRate>({});
	const [activeCurrencyName, setActiveCurrencyName] = useState<string>('usd')
	const [activeCurrencyCount, setActiveCurrencyCount] = useState<number>(0)
	const [currenciesToProps, setCurrenciesToProps] = useState<ICurrencyToProps[]>([])

	useEffect(() => {
		const getCurrenciesNames = async () => {
			try {
				const list = await axios.get<ICurrencyName>('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json')
				setCurrencies(list.data)
			} catch (error) {
				alert(error)
			}
		}
		getCurrenciesNames()
	}, []);

	useEffect(() => {
		if (activeCurrencyName !== '') {
			const getCurrenciesRates = async (curName: string) => {
				console.log(activeCurrencyName);

				try {
					const list = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curName}.json`)

					setCurrenciesRates(list.data[curName])
				} catch (error) {
					alert(error)
				}
			}
			getCurrenciesRates(activeCurrencyName)
		}


	}, [activeCurrencyName]);

	useEffect(() => {
		const currencies: Array<ICurrencyToProps> = [];
		// if (Object.keys(currenciesRates).length === 0) {
		// 	for (let key in currenciesNames) {
		// 		if (key.length < 4 && key !== 'ada') {
		// 			currencies.push({ initials: key, name: currenciesNames[key], rate: 0 })
		// 		}

		// 	}
		// } else {
		// console.log(activeCurrencyCount);

		for (let key in currenciesNames) {
			if (key.length < 4 && key !== 'ada') {
				// console.log(currenciesRates[key] ? currenciesRates[key] * activeCurrencyCount : 0);

				currencies.push({ initials: key, name: currenciesNames[key], rate: currenciesRates[key] ? currenciesRates[key] * activeCurrencyCount : 0 })
			}
		}
		// }
		setCurrenciesToProps(currencies)

	}, [currenciesRates, currenciesNames, activeCurrencyCount]);





	const currencies: Array<ICurrencyToProps> = [];


	return (
		<div className='container'>
			<div className="inputs">
				<Inputs initials={activeCurrencyName} setActiveName={setActiveCurrencyName}
					count={activeCurrencyCount} setAtiveCount={setActiveCurrencyCount}
				/>
			</div>
			<div className="currenciesRatesContainer">
				{currenciesToProps.map((cur, index) => {
					return <CurrencyRate key={index} initials={cur.initials} name={cur.name} rate={cur.rate} />
				})}
			</div>

		</div>
	);
};

export default Container;