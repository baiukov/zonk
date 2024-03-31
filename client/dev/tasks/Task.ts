import { TaskStatuses } from '../enums/TaskStatuses.enum.js'

/*
	Třída Task - je třída služby entity úkolu posíláného socketovému serveru
*/
export class Task {

	// uložení identifikáčního čísla
	private id: number

	// uložení vstupních dat
	private originData: Object | null

	// uložení vystupních dat
	private responseData: string | null

	// uložení názvu příkazu k vyvolání
	private eventName: string

	// uložení metody vyvolány při zkrachování úkolu
	private onError: Function

	// uložení metody vyvolány při úspěšném splnění úkolu
	private onSuccess: Function

	// uložení stavu úkolu
	private status: TaskStatuses

	// konstruktor třídy specifikující identifikáční číslo úkolu a nastavující naparsováná vstupní data úkolu
	constructor(id: number, config: Record<string, any>) {
		this.id = id
		this.originData = config.data
		this.onError = config.onError
		this.onSuccess = config.onSuccess
		this.eventName = config.eventName
		this.responseData = null
		this.status = TaskStatuses.Unexecuted
	}

	// Gettery
	public getID = () => { return this.id }
	public getStatus = () => { return this.status }
	public getOriginData = () => { return this.originData }
	public getEventName = () => { return this.eventName }
	public getResponse = () => { return this.responseData }
	public getOnError = () => { return this.onError }
	public getOnSuccess = () => { return this.onSuccess }

	// Settery
	public setID = (id: number) => { this.id = id }
	public setStatus = (isResolved: TaskStatuses) => { this.status = isResolved }
	public setOriginData = (originData: Object | null) => { this.originData = originData }
	public setEventName = (eventName: string) => { this.eventName = eventName }
	public setResponse = (response: string | null) => { this.responseData = response }
	public setOnError = (onError: Function) => { this.onError = onError }
	public setOnSucces = (onSucces: Function) => { this.onSuccess = onSucces }

	// metoda vytvářející JSON řádek z prvku instaci třídy
	public toJSONString = () => {
		const json = {
			taskID: this.id.toString(),
			commandName: this.eventName,
			status: this.status,
			data: JSON.stringify(this.originData),
		}

		return JSON.stringify(json)
	}

}