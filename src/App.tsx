import React, { useState } from "react";
import styles from "./App.module.css";
import { ParamInputProps, ParamValue, Props } from "./Types";
import { testModel, testParams } from "./mock";

// Эта функция возвращает инпут в зависимости от переданнго типа
const ParamInput: React.FC<ParamInputProps> = ({
	param,
	value,
	isEditing,
	onChange,
	onStartEdit,
	onStopEdit,
	showToast,
}) => {
	if (!isEditing) {
		return (
			<div
				onClick={() => {
					if (showToast) return;
					onStartEdit();
				}}
			>
				{value || "..."}
			</div>
		);
	}

	if (param.type === "select") {
		return (
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onStopEdit}
				autoFocus
			>
				{param.options?.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	}

	return (
		<input
			type={param.type === "number" ? "number" : "text"}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onBlur={onStopEdit}
			autoFocus
		/>
	);
};

// Это основной компонент карточки
const ParamEditor: React.FC<Props> = ({ params, model }) => {
	const [paramValues, setParamValues] = useState<ParamValue[]>(
		params.map((param) => ({
			paramId: param.id,
			value:
				model.paramValues.find((pv) => pv.paramId === param.id)
					?.value || "",
		}))
	);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [showToast, setShowToast] = useState(false);

	const handleParamChange = (paramId: number, value: string) => {
		setParamValues((prev) =>
			prev.map((pv) =>
				pv.paramId === paramId ? { ...pv, value } : pv
			)
		);
	};

	const handleGetModelClick = () => {
		setShowToast(true);
		console.table(paramValues);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	};

	return (
		<div className={styles["cards-container"]}>
			<div className={styles["param-editor__card"]}>
				<h2 className={styles["param-editor__title"]}>
					Карточка модели
				</h2>
				<div className={styles["param-editor__container"]}>
					{params.map((param) => {
						const value =
							paramValues.find(
								(pv) => pv.paramId === param.id
							)?.value || "";

						return (
							<div
								key={param.id}
								className={styles["param-editor__grid"]}
							>
								{param.name}
								<div
									className={
										styles[
											"param-editor__input-wrapper"
										]
									}
								>
									<ParamInput
										param={param}
										value={value}
										isEditing={
											editingId === param.id
										}
										onChange={(newValue) =>
											handleParamChange(
												param.id,
												newValue
											)
										}
										onStartEdit={() =>
											setEditingId(param.id)
										}
										onStopEdit={() =>
											setEditingId(null)
										}
										showToast={showToast}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<button
					className={styles["param-editor__button"]}
					onClick={handleGetModelClick}
					disabled={showToast}
				>
					Получить модель
				</button>
			</div>

			{showToast && (
				<div
					className={`${styles["param-editor__card"]} ${styles["param-editor__json"]}`}
				>
					📑 Модель скопирована в консоль
					<pre>{JSON.stringify(paramValues, null, 5)}</pre>
				</div>
			)}
		</div>
	);
};

function App() {
	return (
		<div className={styles["main-wrapper"]}>
			<div className={styles["hint"]} title="Это просто подсказка :D">
				Для редактирования значения поля - нажмите на него 👆
			</div>
			<ParamEditor params={testParams} model={testModel} />
		</div>
	);
}

export default App;
