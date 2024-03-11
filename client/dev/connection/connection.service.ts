import { ConnectionTypes } from '../enums/connectionTypes.enum.js'


export class ConnectionService {

	private connectionType: ConnectionTypes = ConnectionTypes.Rest;

	private static ip: string | undefined

	private webSocket: WebSocket | undefined

	constructor() {
		this.checkIP()
	}

	public getConnectionType = () => { return this.connectionType }

	public setConnectionType = (type: ConnectionTypes) => {
		this.connectionType = type
	}

	public static setIP = (ip: string) => {
		ConnectionService.ip = ip
		localStorage.setItem("ip", ip)
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
			case ConnectionTypes.WebSockets:
				this.emitWebSocket(config)
				break
		}
	}

	private emitWebSocket = (config: Record<string, any>) => {
		if (!this.webSocket) {
			this.connectToWebSocket()
		}

		const dataToSend = JSON.stringify(config.data)

		const interval = setInterval(() => {
			if (!this.webSocket?.OPEN) return
			this.webSocket?.send(`${config.eventName} ${dataToSend}`)
			clearInterval(interval)
		}, 10)
	}

	private connectToWebSocket = () => {
		this.webSocket = new WebSocket(`ws://${ConnectionService.ip}:8585/api/websockets`)
		console.log(this.webSocket)
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