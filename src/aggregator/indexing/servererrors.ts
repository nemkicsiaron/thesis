//Newly registering server already in the list as active
export class ServerAlreadyRegistered extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServerAlreadyRegistered";
    }
}

export class ServerListEmpty extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServerListEmpty";
    }
}