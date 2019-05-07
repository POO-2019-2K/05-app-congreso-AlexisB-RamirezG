import Workshop from "./workshop.js";

class Main {
  constructor() {
    document.querySelector("#btnRegister").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        // Get the form information
        let name = document.querySelector("#name").value;
        let sDate = document.querySelector("#sDate").value;
        let fDate = document.querySelector("#fDate").value;
        let spots = document.querySelector("#spots").value;
        let duration = document.querySelector("#duration").value;

        let objWorkshop = {
          name: name,
          sDate: sDate,
          fDate: fDate,
          spots: spots,
          duration: duration
        }

        let workshop = new Workshop(objWorkshop);

        // Left blank the phrase "There's no workshops registered yet"
        let notYet = document.querySelector("#not-yet");
        notYet.innerHTML = "";

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

        // 

        let pTable = document.createElement("table");
        pTable.className = "table border table-responsive max-width";
        var pTblBody = document.createElement("tbody");

        var row2 = document.createElement("tr");

        let studCell = document.createElement("th");
        studCell.className = "studCell th";
        let studCellText = document.createTextNode(`PARTICIPANTS:`);
        studCell.appendChild(studCellText);
        row2.appendChild(studCell);

        let addCell = document.createElement("th");
        addCell.className = "addCell th";
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
        });
        btnCell.appendChild(btnAdd);
        row2.appendChild(btnCell);

        tblBody.appendChild(row);
        pTblBody.appendChild(row2);

        wsTable.appendChild(tblBody);
        container.appendChild(wsTable);
        pTable.appendChild(pTblBody);
        container.appendChild(pTable);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();