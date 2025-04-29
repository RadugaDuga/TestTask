export type ParamType = "string" | "number" | "select";

type BaseParam = {
	id: number;
	name: string;
};

type StringParam = BaseParam & {
	type: "string";
};

type NumberParam = BaseParam & {
	type: "number";
};

type SelectParam = BaseParam & {
	type: "select";
	options: string[];
};

export interface Model {
	paramValues: ParamValue[];
	colors?: string[];
}

export type Param = StringParam | NumberParam | SelectParam;

export interface ParamValue {
	paramId: number;
	value: string;
}

export interface Props {
	params: Param[];
	model: Model;
}
export interface ParamInputProps {
	param: Param;
	value: string;
	isEditing: boolean;
	onChange: (value: string) => void;
	onStartEdit: () => void;
	onStopEdit: () => void;
	showToast: boolean;
}
