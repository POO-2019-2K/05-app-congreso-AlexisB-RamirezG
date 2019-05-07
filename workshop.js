export default class Workshop {
    constructor(workshop) {
        this._name = workshop.name.toUpperCase();
        this._spots = workshop.spots;
        this._duration = workshop.duration;
        this._fDate = workshop.fDate;
        this._sDate = workshop.sDate;
        this._participants = [];
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

    getStartDateAsString() {
        let splitDate = this._sDate.split("-");
        console.log(splitDate);
        let startDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];

        return startDate;
    }

    getFinishDateAsString() {
        let splitDate = this._fDate.split("-");
        console.log(splitDate);
        let finishDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];

        return finishDate;
    }

    get participants() {
        return this._participants;
    }

    set participants(participants) {
        this._participants = participants;
    }
}