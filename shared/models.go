package shared


type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	FullName string `json:"full_name"`
}

type Character struct {
	CharacterId   int    `json:"id"`
	CharacterName string `json:"name"`
	Attack        int    `json:"attack"`
	Defense       int    `json:"defense"`
	Health        int    `json:"health"`
	Stamina       int    `json:"stamina"`
	Strength      int    `json:"strength"`
	Agility       int    `json:"agility"`
	Wisdom        int    `json:"wisdom"`
	Charisma      int    `json:"charisma"`
	UserId        int    `json:"uid"`
}

type Characters struct {
	Characters []Character `json:"characters"`
}

type Item struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

type Response struct {
	Message string
}


