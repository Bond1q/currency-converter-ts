export interface ICurrencyName {
	[key: string]: string;
}
export interface ICurrencyRate {
	[key: string]: number;
}

export interface ICurrencyToProps {
	initials: string;
	name: string;
	rate: number;
	isVisible: boolean;
}

export interface ICurNamesToProps {
	initials: string;
	fullName: string;
}

export interface IInputs {
	initials: string;
	count: number;
	isListActive: boolean;
	setIsListActive(isActive: boolean): void
	setActiveName(name: string): void;
	setAtiveCount(count: number): void;
	currenciesNames: ICurNamesToProps[];
}

export interface ICurrencyRateProps {
	initials: string;
	name: string;
	rate: number;
	isVisible: boolean
}

export interface IInputListElem {
	fullName: string;
	initials: string;
	setActiveName(name: string): void;
}
