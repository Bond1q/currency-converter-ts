import React, { FC } from 'react';
import { numberWithSpaces } from '../assets/numberWuthSpace';

interface IInputs {
	initials: string;
	count: number;
	setActiveName(name: string): void;
	setAtiveCount(count: number): void;
}

const Inputs: FC<IInputs> = (props) => {
	const [curNameInput, setCurNameInput] = React.useState<string>(props.initials)
	const [curRateInput, setCurRateInput] = React.useState<string>(props.count.toString())
	const changeNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurNameInput(e.target.value)
	}
	const changeRateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		// if(e.target.value[-1])
		// console.log(e.target.value[1]);
		// console.log(e.target.value);

		setCurRateInput(e.target.value.replace(/\s/g, ""))
	}
	const imgUrl: string = `flags/${props.initials}.png`

	return (
		<div>
			<div className="form">
				<div className="countInput">
					<input onBlur={() => props.setAtiveCount(+(curRateInput.trim()))} onChange={changeRateInputHandler} value={numberWithSpaces(curRateInput)} type="text" />
				</div>
				<div className="currency">
					<div className="initials">
						{/* <div className="name">{props.initials}</div> */}
						<input value={curNameInput.toUpperCase()} onChange={changeNameInputHandler} onBlur={() => props.setActiveName(curNameInput.toLowerCase())} type="text" />
						<div className="flag">
							<img src={imgUrl} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Inputs;