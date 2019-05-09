export default class Workshop {
    constructor(workshop) {
        this._name = workshop.name.toUpperCase();
        this._spots = workshop.spots;
        this._duration = workshop.duration;
        this._fDate = new Date(workshop.fDate);
        this._sDate = new Date(workshop.sDate);
        this._participants = workshop.participants;
        this._id = workshop.id;
    }

    get sDate() {
        return this._sDate;
    }

    get name() {
        return this._name;
    }

    get spots() {
        return this._spots;
    }

    get duration() {
        return this._duration;
    }

    get id() {
        return this._id;
    }

    getStartDateAsString() {
        let date =
            this._sDate.getDate() +
            "/" +
            this._sDate.getMonth() +
            "/" +
            this._sDate.getFullYear();

        return date;
    }

    getFinishDateAsString() {
        let date =
            this._fDate.getDate() +
            "/" +
            this._fDate.getMonth() +
            "/" +
            this._fDate.getFullYear();

        return date;
    }

    get participants() {
        return this._participants;
    }

    set participants(participants) {
        this._participants = participants;
    }
}