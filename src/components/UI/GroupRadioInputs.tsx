type Option = {
	value: string;
	setter: () => void;
	defaultChecked?: boolean;
}

type Props = {
	name: string;
	options: Option[];
}

const GroupRadioInputs = ({ name, options }: Props) => {
	return (
		<div className="group inline-flex w-min bg-slate-100 rounded-lg p-1
				overflow-hidden has-focus-visible:ring-2 has-focus-visible:ring-blue-500">
			{options.map((option) => (
				<div key={option.value}>
					<input className="peer sr-only"
						type="radio" name={name} id={option.value} defaultChecked={option.defaultChecked}
						onChange={() => option.setter()} />
					<label
						className="inline-block h-full px-2 rounded-md cursor-pointer transition-all text-slate-500
							peer-checked:bg-white peer-checked:text-slate-900 peer-checked:font-medium peer-checked:shadow-sm "
						htmlFor={option.value} >
						<span>{option.value[0].toUpperCase() + option.value.slice(1)}</span>
					</label>
				</div>
			))}
		</div>
	)
}

export { GroupRadioInputs };