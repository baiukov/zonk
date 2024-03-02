import { v4 as uuidv4 } from 'uuid'

export class Task {

	private id: string
	private commandName: string

	private result: string | undefined

	constructor(commandName: string) {
		this.id = uuidv4()
		console.log(this.id)
		this.commandName = commandName
	}

}