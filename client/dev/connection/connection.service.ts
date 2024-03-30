import { AppService } from '../app.service.js'
import { ConnectionTypes } from '../enums/connectionTypes.enum.js'
import { Events } from '../enums/events.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { TaskStatuses } from '../enums/TaskStatuses.enum.js'
import { Task } from '../tasks/Task.js'
import { log } from '../utils/log.js'


export class ConnectionService {

	private connectionType: string | undefined

	private static ip: string | undefined

	constructor() {
		this.checkConnectionType()
		this.checkIP()
		// @ts-ignore
		window.receiveMessageFromJava = this.receiveDataFromJava
	}

	public getConnectionType = () => { return this.connectionType }

	public setConnectionType = (type: ConnectionTypes) => {
		this.connectionType = type
		localStorage.setItem("connectionType", type)
		log(LogLevels.INFO, "Connection has changed to: " + type)
	}

	public static setIP = (ip: string) => {
		ConnectionService.ip = ip
		localStorage.setItem("ip", ip)
		log(LogLevels.INFO, "IP has changed to: " + ip)
	}

	private checkConnectionType = () => {
		const savedType = localStorage.getItem("connectionType")
		if (!savedType) {
			this.connectionType = ConnectionTypes.Rest
			return
		}
		this.connectionType = savedType as keyof typeof ConnectionTypes
	}

	private checkIP = () => {
		const storedIP = localStorage.getItem("ip")
		if (!storedIP) return
		ConnectionService.ip = storedIP.replaceAll('"', '') as string
	}

	public emitServer = (config: Record<string, any>) => {
		switch (this.connectionType) {
			case ConnectionTypes.Rest:
				this.emitRestServer(config)
				break
			case ConnectionTypes.Sockets:
				this.getTask(config)
				break
		}
	}

	private getTask = (config: Record<string, any>) => {
		AppService.emit(Events.GetTask, config)
	}

	public onPostTask = (task: Task) => {
		if (task.getStatus() === TaskStatuses.Unexecuted) {
			this.emitSocketServer(task)
		} else {
			this.resolveTask(task)
		}
	}

	private emitSocketServer = (task: Task) => {
		// @ts-ignore
		window.cefQuery({ request: task.toJSONString(), onSuccess: (_) => { } })
		log(LogLevels.INFO, "Message to client has been sent. Message: " + task.toJSONString)
	}

	private receiveDataFromJava = (dataStr: string) => {
		const data = JSON.parse(dataStr)
		log(LogLevels.INFO, "Get message from client. Message: " + dataStr)
		AppService.emit(Events.FetchTask, data)
	}

	private resolveTask = (task: Task) => {
		const status = task.getStatus()
		if (!task || status === TaskStatuses.Unexecuted) {
			log(LogLevels.ERROR, "Cannot resolve task properly, because it doesn't exist or unexecuted")
			return
		}
		const response = task.getResponse()
		if (!response) {
			log(LogLevels.ERROR, "Cannot resolve task properly, because there is no response")
			return
		}
		if (status === TaskStatuses.Successfull) {
			task.getOnSuccess()(response)
		} else {
			task.getOnError()(response)
		}
		log(LogLevels.INFO, "Task " + task.getID + " has been successfully resolved.")
	}

	private emitRestServer = (config: Record<string, any>) => {
		const str = JSON.stringify(config.data)

		if (!ConnectionService.ip) { return }

		$.ajax({
			url: `http://${ConnectionService.ip}:8080/${config.eventName}`,
			type: "POST",
			data: str,
			contentType: 'application/json',
			success: (response) => {
				config.onSuccess(response)
			},
			error: (xhr, status, error) => {
				config.onError(xhr.responseText)
			},
		})
	}
}