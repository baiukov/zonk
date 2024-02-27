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
		players: "Players:",
		goalTitle: "Goal:",
		goal: "goal points",
		start: "Start",
		pts: "pts",
		total: "total",
		enough: "enough",
		reroll: "reroll",

		playerAlreadyExists: "Player already exists",
		playerDoesntExist: "Player is not found",
		roomDoesntExist: "Room is not found",
		defaultError: "Some issue has happened",
		roomIsFull: "Room is full",
		smthWrong: "Something went wrong",
		serverUnreachable: "Server is unreachable",
		ipIsIncorrect: "IP address is not correct"
	},

}