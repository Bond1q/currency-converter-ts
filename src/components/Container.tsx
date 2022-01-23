import axios from 'axios';
import React, { FC, useState, useEffect } from 'react';
import '../styles/container.scss'
import CurrencyRate from './CurrencyRate';
import Inputs from './Inputs';
import { ICurrencyName, ICurrencyRate, ICurrencyToProps, ICurNamesToProps } from '../assets/constants'
const Container: FC = () => {
	const oldCurrencies: string[] = ['ada', 'zmk', 'byr', 'ltl', 'lvl'];
	const [currenciesNames, setCurrencies] = useState<ICurrencyName>({});
	const [currenciesRates, setCurrenciesRates] = useState<ICurrencyRate>({});
	const [activeCurrencyName, setActiveCurrencyName] = useState<string>('usd')
	const [activeCurrencyCount, setActiveCurrencyCount] = useState<number>(0)
	const [currenciesToProps, setCurrenciesToProps] = useState<ICurrencyToProps[]>([])
	const [curNamesToProps, setCurNamesToProps] = useState<ICurNamesToProps[]>([])
	const [isListActive, setIsListActive] = React.useState<boolean>(false);
	const [containerInput, setContainerInput] = useState<string>('')
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
			const isVisible: boolean = (containerInput.trim() != '' ? (key.toLowerCase().indexOf(containerInput.toLowerCase()) != -1
				|| currenciesNames[key].toLowerCase().indexOf(containerInput.toLowerCase()) != -1) : true
			)
			if (key.length < 4 && !oldCurrencies.includes(key)) {
				currencies.push({
					initials: key, name: currenciesNames[key],
					rate: currenciesRates[key] ? currenciesRates[key] * activeCurrencyCount : 0,
					isVisible: isVisible
				})
			}
		}
		setCurrenciesToProps(currencies)

	}, [currenciesRates, currenciesNames, activeCurrencyCount]);





	const isListActiveHandler = () => {
		if (isListActive) {
			setIsListActive(false)
		}
	}

	const containerInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currencies: Array<ICurrencyToProps> = [];
		setCurrenciesToProps(currenciesToProps.map(cur => {
			if (cur.initials.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
				|| cur.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
			) {
				cur.isVisible = true;
				return cur
			} else {
				cur.isVisible = false;
				return cur
			}
		}

		))
		setContainerInput(e.target.value)
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
					<div className="findInRatesContainer">
						<input placeholder='Find currency'
							onChange={containerInputHandler} value={containerInput} type="text" />

					</div>
					{currenciesToProps.map((cur, index) => {
						return <CurrencyRate key={index} initials={cur.initials} name={cur.name} rate={cur.rate}
							isVisible={cur.isVisible}
						/>
					})}
				</div>

			</div>
		</div>
	);
};

export default React.memo(Container);