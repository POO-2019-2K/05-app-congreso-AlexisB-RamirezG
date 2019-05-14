import Workshop from "./workshop.js";
import Participant from "./participant.js";

export default class Record {
    constructor(body) {
        this._workshops = [];
        this._body = body;
        //localStorage.removeItem("workshops");
        this._id = 0;

        this._initRecord();
    }

    _getFormatedDate(date) {
        let sDate = date.split("/");
        return new Date(sDate[2], sDate[1], sDate[0]);
    }

    _initRecord() {
        let listWorkshops = JSON.parse(localStorage.getItem("workshops"));
        console.log(listWorkshops);

        if (listWorkshops === null) {
            return;
        }

        listWorkshops.forEach((e, index) => {
            e.sDate = this._getFormatedDate(e.sDate);
            e.fDate = this._getFormatedDate(e.fDate);
            let notYet = document.querySelector("#not-yet");
            notYet.innerHTML = "";
            this._addToRecord(new Workshop(e));
            console.log(e.participants);
        });
    }

    _initParticipants() {

    }

    _addParticipantsToTable(participant, tblBody) {
        var rowP = document.createElement("tr");
        rowP.className = "border";

        let nameCell = document.createElement("td");
        nameCell.className = "th";
        let nameCellText = document.createTextNode(participant.name);
        nameCell.appendChild(nameCellText);
        rowP.appendChild(nameCell);

        let birthdayCell = document.createElement("td");
        birthdayCell.className = "th";
        let birthdayCellText = document.createTextNode(participant.birthday);
        birthdayCell.appendChild(birthdayCellText);
        rowP.appendChild(birthdayCell);

        let emailCell = document.createElement("td");
        emailCell.className = "th";
        let emailCellText = document.createTextNode(participant.email);
        emailCell.appendChild(emailCellText);
        rowP.appendChild(emailCell);

        let blankCell = document.createElement("td");
        blankCell.className = "th";
        rowP.appendChild(blankCell);

        let deleteBtnCell = document.createElement("th");
        deleteBtnCell.className = "th";
        let btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "x";
        btnDelete.className = "btn-delete";
        btnDelete.addEventListener("click", () => {
            tblBody.removeChild(rowP);
        });
        deleteBtnCell.appendChild(btnDelete);
        rowP.appendChild(deleteBtnCell);

        tblBody.appendChild(rowP);
    }

    _deleteRecord(wsTable, container) {
        let listWorkshops = JSON.parse(localStorage.getItem("workshops"));
        console.log(listWorkshops);

        if (listWorkshops === null) {
            return;
        }

        listWorkshops.forEach((e, index) => {
            container.removeChild(wsTable);
        });
    }

    _addParticipant(workshop, participant, tblBody, wsTable, container) {
        participant.id = workshop.id;
        workshop.spots = workshop.spots - 1;
        let objParticipant = {
            name: participant.name,
            birthday: participant.birthday,
            email: participant.email
        }
        workshop.participants.push(objParticipant);
        console.log(workshop);
        let listWorkshops = JSON.parse(localStorage.getItem("workshops"));
        let objWorkshop = {
            name: workshop.name,
            sDate: workshop.getStartDateAsString(),
            fDate: workshop.getFinishDateAsString(),
            spots: workshop.spots,
            duration: workshop.duration,
            participants: workshop.participants,
            id: this._id,
        }
        listWorkshops[workshop.id-1] = objWorkshop;
        console.log(listWorkshops);
        this._addParticipantsToTable(participant, tblBody);
        localStorage.setItem("workshops", JSON.stringify(listWorkshops));
        this._deleteRecord(wsTable, container); 
        this._initRecord();

    }

    _createForm(workshop, tblBody, wsTable, container) {
        let divBlack = document.createElement("div");
        divBlack.classList = "divBlack";

        console.log(workshop);

        this._body.appendChild(divBlack);

        let divForm = document.createElement("div")
        divForm.classList = "divForm";

        var h1Form = document.createElement("H1")
        h1Form.classList = "pt-2";
        var h1FormText = document.createTextNode("REGISTER A PARTICIPANT");
        h1Form.appendChild(h1FormText);
        divForm.appendChild(h1Form);

        let labelName = document.createElement("LABEL");
        labelName.classList = "label-dynamic-form";
        labelName.innerText = "Name:";
        divForm.appendChild(labelName);

        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        inputName.id = "inputName";
        divForm.appendChild(inputName);

        let labelBirthday = document.createElement("LABEL");
        labelBirthday.classList = "label-dynamic-form";
        labelBirthday.innerText = "Birth date:";
        divForm.appendChild(labelBirthday);

        let inputBirthday = document.createElement("input")
        inputBirthday.type = "date";
        inputBirthday.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        inputBirthday.id = "inputBirthday";
        divForm.appendChild(inputBirthday);

        let labelEmail = document.createElement("LABEL");
        labelEmail.classList = "label-dynamic-form";
        labelEmail.innerText = "Email:";
        divForm.appendChild(labelEmail);

        let inputEmail = document.createElement("input")
        inputEmail.type = "email";
        inputEmail.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        inputEmail.id = "inputEmail";
        divForm.appendChild(inputEmail);

        let btnAdd = document.createElement("input");
        btnAdd.type = "button";
        btnAdd.value = "Add";
        btnAdd.className = "btn-add-student";
        btnAdd.addEventListener("click", () => {
            let participantName = document.getElementById("inputName").value;
            let participantBirthday = document.getElementById("inputBirthday").value;
            let participantEmail = document.getElementById("inputEmail").value;

            this._body.removeChild(divBlack);
            this._body.removeChild(divForm);

            let objParticipant = {
                name: participantName,
                birthday: participantBirthday,
                email: participantEmail,
                id: workshop.id
            }

            let participant = new Participant(objParticipant);

            this._addParticipant(workshop, participant, tblBody, wsTable, container);
        });
        divForm.appendChild(btnAdd);

        let btnCancel = document.createElement("input");
        btnCancel.type = "button";
        btnCancel.value = "Cancel";
        btnCancel.className = "btn-cancel-student";
        btnCancel.addEventListener("click", () => {
            this._body.removeChild(divBlack);
            this._body.removeChild(divForm);
        });
        divForm.appendChild(btnCancel);

        this._body.appendChild(divForm);

        /*
        let tmpRow = document.createElement("tr");
        tmpRow.className = "border";
        tmpRow.innerHTML = "Hola";
        tblBody.appendChild(tmpRow);
        */
    }

    _addToRecord(workshop) {
        // Create the table
        let container = document.getElementById("container");

        var wsTable = document.createElement("table");
        wsTable.className = "table";
        var tblBody = document.createElement("tbody");

        // Create the headers' row
        var row = document.createElement("tr");
        
        /*
        let divlogo = document.createElement("div");
        let logo = document.createElement("img");
        logo.src = "logo.png";
        logo.setAttribute("width", "100px");
        divlogo.appendChild(logo);
        container.appendChild(divlogo);
        */

        /*
        let logoCell = document.createElement("th");
        logoCell.className = "logoCell";
        let logo = document.createElement("img");
        logo.className = "logo-size";
        logo.src = 'logo.png';
        logoCell.appendChild(logo);
        row.appendChild(logoCell);
        */

        let cell = document.createElement("th");
        cell.className = "th-h bg-info";
        let cellText = document.createTextNode(`"${workshop.name.toUpperCase()}"`);
        let logo = document.createElement("img");
        logo.src = "logoCropped.png";
        logo.setAttribute("width", "22px");
        cell.appendChild(logo);
        cell.appendChild(cellText);
        row.appendChild(cell);

        let cell2 = document.createElement("th");
        cell2.className = "th-h bg-info";
        let cellText2 = document.createTextNode(`${workshop.getStartDateAsString()} - ${workshop.getFinishDateAsString()}`);
        cell2.appendChild(cellText2);
        row.appendChild(cell2);

        let cell3 = document.createElement("th");
        cell3.className = "th-h bg-info";
        let cellText3 = document.createTextNode(`SPOTS: ${workshop.spots}`);
        cellText3.id = "spotsText";
        cell3.appendChild(cellText3);
        row.appendChild(cell3);

        let cell4 = document.createElement("th");
        cell4.className = "th-h bg-info";
        let cellText4 = document.createTextNode(`DURATION: ${workshop.duration} HOURS`);
        cell4.appendChild(cellText4);
        row.appendChild(cell4);

        let cell5 = document.createElement("th");
        cell5.className = "th-h bg-info";
        let btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "x";
        btnDelete.className = "btn-delete";
        btnDelete.addEventListener("click", () => {
            container.removeChild(wsTable);
        });
        cell5.appendChild(btnDelete);
        row.appendChild(cell5);

        //Segunda Row
        var row2 = document.createElement("tr");
        row2.className = "border";

        let studCell = document.createElement("th");
        studCell.className = "studCell th";
        let studCellText = document.createTextNode(`PARTICIPANTS:`);
        studCell.appendChild(studCellText);
        row2.appendChild(studCell);

        let blank1Cell = document.createElement("th");
        blank1Cell.className = "th";
        let blank1CellText = document.createTextNode(``);
        blank1Cell.appendChild(blank1CellText);
        row2.appendChild(blank1Cell);

        let blank2Cell = document.createElement("th");
        blank2Cell.className = "th";
        let blank2CellText = document.createTextNode(``);
        blank2Cell.appendChild(blank2CellText);
        row2.appendChild(blank2Cell);

        let addCell = document.createElement("th");
        addCell.className = "addCell th float-right";
        let addCellText = document.createTextNode(`Register a new one`);
        addCell.appendChild(addCellText);
        row2.appendChild(addCell);

        let btnCell = document.createElement("th");
        btnCell.className = "addCell th";
        let btnAdd = document.createElement("input");
        btnAdd.type = "button";
        btnAdd.value = "+";
        btnAdd.className = "btn-add";
        let nSpots = workshop.spots;
        btnAdd.addEventListener("click", () => {
            console.log(nSpots);
            if (nSpots > 0) {
                this._createForm(workshop, tblBody, wsTable, container);
            }
        });
        btnCell.appendChild(btnAdd);
        row2.appendChild(btnCell);

        // Participants
        var row3 = document.createElement("tr");
        row3.className = "border";

        let nameCell = document.createElement("th");
        nameCell.className = "studCell th";
        let nameCellText = document.createTextNode(`Name:`);
        nameCell.appendChild(nameCellText);
        row3.appendChild(nameCell);

        let bDateCell = document.createElement("th");
        bDateCell.className = "studCell th";
        let bDateCellText = document.createTextNode(`Birth date:`);
        bDateCell.appendChild(bDateCellText);
        row3.appendChild(bDateCell);

        let emailCell = document.createElement("th");
        emailCell.className = "studCell th";
        let emailCellText = document.createTextNode(`Email:`);
        emailCell.appendChild(emailCellText);
        row3.appendChild(emailCell);

        let blankPCell = document.createElement("th");
        blankPCell.className = "studCell th";
        let blankPCellText = document.createTextNode(``);
        blankPCell.appendChild(blankPCellText);
        row3.appendChild(blankPCell);

        let blankBtnCell = document.createElement("th");
        blankBtnCell.className = "addCell th";
        row3.appendChild(blankBtnCell);

        tblBody.appendChild(row);
        tblBody.appendChild(row2);
        tblBody.appendChild(row3);

        wsTable.appendChild(tblBody);
        container.appendChild(wsTable);

        this._id++;

        let objWorkshop = {
            name: workshop.name,
            sDate: workshop.getStartDateAsString(),
            fDate: workshop.getFinishDateAsString(),
            spots: workshop.spots,
            duration: workshop.duration,
            participants: workshop.participants,
            id: this._id,
        }

        this._workshops.push(objWorkshop);

        workshop.participants.forEach((e, index) => {
            this._addParticipantsToTable(e, tblBody);
        });
    }

    addWorkshop(workshop) {
        this._addToRecord(workshop);
        localStorage.setItem("workshops", JSON.stringify(this._workshops));
    }
}
