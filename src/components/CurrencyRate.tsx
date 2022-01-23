import React, { FC } from 'react';
import { numberWithSpaces } from '../assets/numberWuthSpace';
import { ICurrencyRateProps } from '../assets/constants'

const CurrencyRate: FC<ICurrencyRateProps> = ({ initials, name, rate, isVisible }) => {

	const imgUrl: string = `flags/${initials}.png`
	return (
		<div className={isVisible ? 'currencyRate' : 'noDisplay'} >
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

export default React.memo(CurrencyRate);