export default class ServerAlreadyRegistered extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServerAlreadyRegistered";
    }
}