export default class Participant {
    constructor(participant) {
        this._name = participant.name;
        this._birthday = participant.birthday;
        this._email = participant.email;
        this._id = participant.id;
    }
    
    get name() {
        return this._name;
    }

    get birthday() { 
        return this._birthday;
    }

    get email() {
        return this._email;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
}