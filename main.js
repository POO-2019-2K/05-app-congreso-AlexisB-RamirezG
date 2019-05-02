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

        // Cre
        let container = document.getElementById("container");
        let wsTable = document.createElement("table");
        wsTable.className = "table border table-responsive max-width";
        var tblBody = document.createElement("tbody");

        // Create the headers' row
        var row = document.createElement("tr");

        let cell = document.createElement("th");
        let cellText = document.createTextNode(`${workshop.name.toUpperCase()}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        let cell2 = document.createElement("th");
        let cellText2 = document.createTextNode(`${workshop.getStartDateAsString()} - ${workshop.getFinishDateAsString()}`);
        cell2.appendChild(cellText2);
        row.appendChild(cell2);

        let cell3 = document.createElement("th");
        let cellText3 = document.createTextNode(`SPOTS: ${workshop.spots}`);
        cell3.appendChild(cellText3);
        row.appendChild(cell3);

        let cell4 = document.createElement("th");
        let cellText4 = document.createTextNode(`DURATION: ${workshop.duration} HOURS`);
        cell4.appendChild(cellText4);
        row.appendChild(cell4);

        // 

        tblBody.appendChild(row);

        wsTable.appendChild(tblBody);
        container.appendChild(wsTable);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();