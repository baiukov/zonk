import { AppService } from '../app.service.js'
import { ConnectionTypes } from '../enums/connectionTypes.enum.js'
import { Events } from '../enums/events.enum.js'
import { Task } from '../tasks/Task.js'
import { ConnectionService } from './connection.service.js'

/*
	Třída ConnectionController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class ConnectionController {

	// uložení služby připojení
	private connectionService: ConnectionService

	constructor(connectionService: ConnectionService) {
		this.connectionService = connectionService

		// registrace eventu nastavení typu připojení
		AppService.on(Events.SetConnectionType, (type: ConnectionTypes) => {
			this.connectionService.setConnectionType(type)
		})

		// registrace eventu pro posílání zprávy na nějaký server
		AppService.on(Events.EmitServer, (config: Record<string, any>) => {
			this.connectionService.emitServer(config)
		})

		// registrace eventu nastavení ip adresy
		AppService.on(Events.SetIP, (ip: string) => {
			this.connectionService.setIP(ip)
		})

		// registrace eventu, který je vyvolán po nalezení úkolu
		AppService.on(Events.PostTask, (task: Task) => {
			this.connectionService.onPostTask(task)
		})

		AppService.on(Events.SendCloseMessage, () => {
			this.connectionService.setCloseMessage()
		})
	}

}