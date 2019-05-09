import Workshop from "./workshop.js";

export default class Record {
    constructor(body) {
        this._workshops = [];
        this._body = body;
        // localStorage.removeItem("workshops");

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
        });
    }

    _createForm(workshop) {
        let divBlack = document.createElement("div");
        divBlack.classList = "divBlack";

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

        let inputName = document.createElement("input")
        inputName.type = "text";
        inputName.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        divForm.appendChild(inputName);

        let labelBirthday = document.createElement("LABEL");
        labelBirthday.classList = "label-dynamic-form";
        labelBirthday.innerText = "Birth date:";
        divForm.appendChild(labelBirthday);

        let inputBirthday = document.createElement("input")
        inputBirthday.type = "date";
        inputBirthday.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        divForm.appendChild(inputBirthday);

        let labelEmail = document.createElement("LABEL");
        labelEmail.classList = "label-dynamic-form";
        labelEmail.innerText = "Email:";
        divForm.appendChild(labelEmail);

        let inputEmail = document.createElement("input")
        inputEmail.type = "email";
        inputEmail.classList = "form-control form-control-md border inputFormDynamic col-md-10 ml-4";
        divForm.appendChild(inputEmail);

        let btnAdd = document.createElement("input");
        btnAdd.type = "button";
        btnAdd.value = "Add";
        btnAdd.className = "btn-add-student";
        btnAdd.addEventListener("click", () => {
        });
        divForm.appendChild(btnAdd);

        let btnCancel = document.createElement("input");
        btnCancel.type = "button";
        btnCancel.value = "Cancel";
        btnCancel.className = "btn-cancel-student";
        btnCancel.addEventListener("click", () => {
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

        let wsTable = document.createElement("table");
        wsTable.className = "table";
        var tblBody = document.createElement("tbody");

        // Create the headers' row
        var row = document.createElement("tr");

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
        btnDelete.addEventListener("click", () => {});
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
        btnAdd.addEventListener("click", () => {
            this._createForm(workshop);
        });
        btnCell.appendChild(btnAdd);
        row2.appendChild(btnCell);

        tblBody.appendChild(row);
        tblBody.appendChild(row2);

        wsTable.appendChild(tblBody);
        container.appendChild(wsTable);

        let objWorkshop = {
            name: workshop.name,
            sDate: workshop.getStartDateAsString(),
            fDate: workshop.getFinishDateAsString(),
            spots: workshop.spots,
            duration: workshop.duration,
            participants: workshop.participants
        }

        this._workshops.push(objWorkshop);
    }

    addWorkshop(workshop) {
        this._addToRecord(workshop);
        localStorage.setItem("workshops", JSON.stringify(this._workshops));
    }


}