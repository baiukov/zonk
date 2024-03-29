import { AppService } from '../app.service.js'
import { ConnectionTypes } from '../enums/connectionTypes.enum.js'
import { Events } from '../enums/events.enum.js'
import { TaskStatuses } from '../enums/TaskStatuses.enum.js'
import { Task } from '../tasks/Task.js'


export class ConnectionService {

	private connectionType: string | undefined

	private static ip: string | undefined

	private webSocket: WebSocket | undefined

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
	}

	public static setIP = (ip: string) => {
		ConnectionService.ip = ip
		localStorage.setItem("ip", ip)
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
		console.log(this.connectionType, config)
		switch (this.connectionType) {
			case ConnectionTypes.Rest:
				this.emitRestServer(config)
				break
			case ConnectionTypes.WebSockets:
				this.emitWebSocket(config)
				break
			case ConnectionTypes.Sockets:
				this.getTask(config)
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
	}

	private receiveDataFromJava = (dataStr: string) => {
		const data = JSON.parse(dataStr)
		console.log("toresolve", data)
		AppService.emit(Events.FetchTask, data)
	}

	private resolveTask = (task: Task) => {
		const status = task.getStatus()
		if (!task || status === TaskStatuses.Unexecuted) {
			return
		}
		const response = task.getResponse()
		console.log("response", response)
		if (!response) return
		if (status === TaskStatuses.Successfull) {
			task.getOnSuccess()(response)
		} else {
			task.getOnError()(response)
		}
	}

	private emitWebSocket = (config: Record<string, any>) => {
		if (!this.webSocket || this.webSocket.CLOSED || this.webSocket.CLOSING) {
			this.connectToWebSocket()
		}

		const dataToSend = JSON.stringify(config.data)

		const messageHandler = (event: Record<string, any>) => {
			const data: string = event.data
			if (!data) return
			const messages = data.split(" ")
			const status = messages[0]
			const response = messages[1]
			if (status === TaskStatuses.Unexecuted) return
			if (status === TaskStatuses.Successfull) {
				config.onSuccess(response)
			} else {
				config.onError(response)
			}
			// this.webSocket?.close()
			// this.webSocket = undefined
		}

		const interval = setInterval(() => {
			if (!this.webSocket) return
			if (this.webSocket.CONNECTING || !this.webSocket.OPEN) return
			this.webSocket.send(`${config.eventName} ${dataToSend}`)
			this.webSocket.onmessage = messageHandler
			clearInterval(interval)
		}, 10)
	}

	private connectToWebSocket = () => {
		this.webSocket = new WebSocket(`ws://${ConnectionService.ip}:8585/api/websockets`)
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