interface LanguageConfig {
	[key: string]: {
		[key: string]: string
	}
}

export const languageConfig: LanguageConfig = {
	"ENG": {
		name: "Nickname",
		room: "Room name",
		go: "Go",
		ip: "Ip",
		players: "Players",
		goal: "Goal",
		start: "Start",
		pts: "pts",

		playerAlreadyExists: "Player already exists",
		playerDoesntExist: "Player is not found",
		roomDoesntExist: "Room is not found",
		defaultError: "Some issue has happened",
		roomIsFull: "Room is full"
	},

}