import { Model, Param } from "./Types";

export const testParams: Param[] = [
	{ id: 1, name: "Назначение", type: "string" },
	{ id: 2, name: "Длина", type: "string" },
	{ id: 3, name: "Размер", type: "number" },
	{
		id: 4,
		name: "Цвет",
		type: "select",
		options: ["Красный", "Синий", "Зеленый"],
	},
	{ id: 5, name: "Скидка", type: "string" },
];

export const testModel: Model = {
	paramValues: [
		{ paramId: 1, value: "повседневное" },
		{ paramId: 2, value: "макси" },
		{ paramId: 3, value: "42" },
		{ paramId: 4, value: "Синий" },
	],
	colors: [],
};
