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

export interface ICurNamesToProps {
	initials: string;
	fullName: string;
}

const Container: FC = () => {

	const [currenciesNames, setCurrencies] = useState<ICurrencyName>({});
	const [currenciesRates, setCurrenciesRates] = useState<ICurrencyRate>({});
	const [activeCurrencyName, setActiveCurrencyName] = useState<string>('usd')
	const [activeCurrencyCount, setActiveCurrencyCount] = useState<number>(0)
	const [currenciesToProps, setCurrenciesToProps] = useState<ICurrencyToProps[]>([])
	const [curNamesToProps, setCurNamesToProps] = useState<ICurNamesToProps[]>([])
	const [isListActive, setIsListActive] = React.useState<boolean>(false);

	useEffect(() => {
		const getCurrenciesNames = async () => {
			try {
				const list = await axios.get<ICurrencyName>('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json')
				setCurrencies(list.data)
				const curNames: ICurNamesToProps[] = []
				for (let key in list.data) {
					if (key.length < 4 && key !== 'ada') {
						curNames.push({ initials: key, fullName: list.data[key] })

					}
				}
				setCurNamesToProps(curNames)
			} catch (error) {
				alert(error)
			}
		}

		getCurrenciesNames()

	}, []);

	useEffect(() => {
		if (activeCurrencyName !== '') {
			const getCurrenciesRates = async (curName: string) => {


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
		for (let key in currenciesNames) {
			if (key.length < 4 && key !== 'ada') {
				currencies.push({
					initials: key, name: currenciesNames[key],
					rate: currenciesRates[key] ? currenciesRates[key] * activeCurrencyCount : 0
				})
			}
		}
		setCurrenciesToProps(currencies)

	}, [currenciesRates, currenciesNames, activeCurrencyCount]);





	const currencies: Array<ICurrencyToProps> = [];
	const isListActiveHandler = () => {
		if (isListActive) {
			setIsListActive(false)
		}
	}

	return (
		<div onClick={isListActiveHandler} className="allWindow">
			<div onClick={isListActiveHandler} className='container'>
				<div className="inputs">
					<Inputs initials={activeCurrencyName} setActiveName={setActiveCurrencyName}
						count={activeCurrencyCount} setAtiveCount={setActiveCurrencyCount}
						currenciesNames={curNamesToProps} isListActive={isListActive} setIsListActive={setIsListActive}
					/>
				</div>
				<div className="currenciesRatesContainer">
					{currenciesToProps.map((cur, index) => {
						return <CurrencyRate key={index} initials={cur.initials} name={cur.name} rate={cur.rate} />
					})}
				</div>

			</div>
		</div>
	);
};

export default Container;