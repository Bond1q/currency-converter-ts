import React, { FC } from 'react';

interface IInputListElem {
	fullName: string;
	initials: string;
	setActiveName(name: string): void;
}

const InputListElem: FC<IInputListElem> = ({ fullName, initials, setActiveName }) => {
	const imgUrl: string = `flags/${initials}.png`


	return (
		<div className='listElem' onClick={() => setActiveName(initials.toLowerCase())}>
			<div className="smallRow">
				<img src={imgUrl} alt="" />
				<div className="initials">{initials}</div>
			</div>
			<div className="fullName">{fullName}</div>
		</div>
	);
};

export default React.memo(InputListElem);