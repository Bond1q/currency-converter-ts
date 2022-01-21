import React, { FC } from 'react';
import { numberWithSpaces } from '../assets/numberWuthSpace';
interface ICurrencyRateProps {
	initials: string;
	name: string;
	rate: number;
}


const CurrencyRate: FC<ICurrencyRateProps> = ({ initials, name, rate }) => {
	const imgUrl: string = `flags/${initials}.png`
	return (
		<div className='currencyRate' >
			<div className="initials">
				<div className="flag">

					<img src={imgUrl} alt="" />
				</div>
				<div>{initials.toUpperCase()}</div>
			</div>
			<div className="smallRow">
				<div className="fullName">{name}</div>
				<div className="rate">{numberWithSpaces(rate.toFixed(2))}</div>
			</div>
		</div>
	);
};

export default CurrencyRate;