import React, { FC } from 'react';
import { numberWithSpaces } from '../assets/numberWuthSpace';
import { ICurNamesToProps, IInputs } from '../assets/constants';
import InputListElem from './InputListElem';

const Inputs: FC<IInputs> = (props) => {
	const imgUrl: string = `flags/${props.initials}.png`
	const [curNameDiv, setCurNameDiv] = React.useState<string>(props.initials)
	const [curRateInput, setCurRateInput] = React.useState<string>('')
	const [listInput, setListInput] = React.useState<string>('')
	const [currenciesNames, setCurrenciesNames] = React.useState<ICurNamesToProps[]>(props.currenciesNames)

	const changeListInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListInput(e.target.value)
		setCurrenciesNames(props.currenciesNames.filter(elem => elem.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1 || elem.initials.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1))
	}
	const changeRateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const valStr: string = (e.target.value.replace(/\s/g, ""))
		const valNum: number = +(valStr)
		setCurRateInput(valStr)

		if (valNum >= 0) {
			props.setAtiveCount(valNum)
		}
	}

	const findCurInListHandler = (e: React.MouseEvent) => {
		e.stopPropagation()
	}
	const onBlurFindList = () => {
		setTimeout(() => {
			setListInput('')
			setCurrenciesNames(props.currenciesNames)
		}, 1000);

	}
	React.useEffect(() => {
		setCurNameDiv(props.initials)
		setCurrenciesNames(props.currenciesNames)
	}, [props.initials, props.currenciesNames]);

	return (
		<div>
			<div className="form">
				<div className="countInput">
					<input placeholder='Enter the number'
						onChange={changeRateInputHandler} value={numberWithSpaces(curRateInput)} type="text" />
				</div>
				<div className="currency">
					<div onClick={() => props.setIsListActive(!props.isListActive)} className="initials">
						<div className="curName">{curNameDiv}</div>
						<div className="flag">
							<img src={imgUrl} alt="" />
						</div>
					</div>
					<div className={props.isListActive ? "list" : "list noDisplatList"}>
						<div onClick={findCurInListHandler} className="findCurInList">
							<input placeholder='Find currency'
								onChange={changeListInputHandler} value={listInput}
								onBlur={onBlurFindList}
								type="text" />
						</div>
						{currenciesNames.map((elem, index) => {
							return <InputListElem
								fullName={elem.fullName} initials={elem.initials}
								key={index} setActiveName={props.setActiveName}
							/>
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Inputs);