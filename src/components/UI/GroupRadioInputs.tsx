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
      <div className="flex w-min bg-slate-300 rounded-md overflow-hidden mt-2 mb-6">
				{options.map((option) => (
					<div key={option.value}>
						<input className="peer sr-only"
							type="radio" name={name} id={option.value} defaultChecked={option.defaultChecked}
							onChange={() => option.setter()}/>
						<label className="inline-block h-full px-2 peer-checked:bg-slate-400 cursor-pointer transition-all"
							htmlFor={option.value} >
							<span>{option.value.toUpperCase()}</span>
						</label>
					</div>
				))}
			</div>
    )
}

export { GroupRadioInputs };