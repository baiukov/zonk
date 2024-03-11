import { TaskStatuses } from '../enums/TaskStatuses.enum'

export class Task {

	private id: number
	private originData: Object | null
	private responseData: string | null
	private eventName: string
	private onError: Function
	private onSuccess: Function
	private status: TaskStatuses

	constructor(id: number, config: Record<string, any>) {
		this.id = id
		this.originData = config.data
		this.onError = config.onError
		this.onSuccess = config.onSuccess
		this.eventName = config.eventName
		this.responseData = null
		this.status = TaskStatuses.Unexecuted
	}

	public getID = () => { return this.id }
	public getStatus = () => { return this.status }
	public getOriginData = () => { return this.originData }
	public getEventName = () => { return this.eventName }
	public getResponse = () => { return this.responseData }
	public getOnError = () => { return this.onError }
	public getOnSuccess = () => { return this.onSuccess }

	public setID = (id: number) => { this.id = id }
	public setStatus = (isResolved: TaskStatuses) => { this.status = isResolved }
	public setOriginData = (originData: Object | null) => { this.originData = originData }
	public setEventName = (eventName: string) => { this.eventName = eventName }
	public setResponse = (response: string | null) => { this.responseData = response }
	public setOnError = (onError: Function) => { this.onError = onError }
	public setOnSucces = (onSucces: Function) => { this.onSuccess = onSucces }

	public toJSONString = () => {
		const json = {
			taskID: this.id,
			commandName: this.eventName,
			status: this.status,
			data: this.originData,
		}
		return json
	}

}