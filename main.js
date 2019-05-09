import Workshop from "./workshop.js";
import Record from "./record.js";

class Main {
  constructor() {
    let body = document.querySelector('#body');
    let record = new Record(body);

    document.querySelector("#btnRegister").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        // Get the form information
        let name = document.querySelector("#name").value;
        let sDate = document.querySelector("#sDate").value;
        sDate = sDate.split("-");
        let startingDate = new Date(sDate[0], sDate[1], sDate[2]);
        let fDate = document.querySelector("#fDate").value;
        fDate = fDate.split("-");
        let finishDate = new Date(fDate[0], fDate[1], fDate[2]);
        let spots = document.querySelector("#spots").value;
        let duration = document.querySelector("#duration").value;
        let participants = [];
        let id = 0;

        // Left blank the phrase "There's no workshops registered yet"
        let notYet = document.querySelector("#not-yet");
        notYet.innerHTML = "";
        
        let objWorkshop = {
          name: name,
          sDate: startingDate,
          fDate: finishDate,
          spots: spots,
          duration: duration,
          participants: participants,
          id: id
        }

        console.log(objWorkshop);

        let workshop = new Workshop(objWorkshop);

        record.addWorkshop(workshop);

      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();