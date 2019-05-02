class Main {
    constructor() {
        document.querySelector("#btnRegister").addEventListener("click", () => {
                let container = document.getElementById("container");
                let wsTable = document.createElement("table");
                wsTable.className = "table border table-responsive";
                var tblBody = document.createElement("tbody");
               
                for (let i = 0; i < 2; i++) {
                  let row = document.createElement("tr");
               
                  for (let j = 0; j < 4; j++) {
                    let cell = document.createElement("th");
                    let cellText = document.createTextNode("celda en la hilera "+i+", columna "+j);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
               
                  tblBody.appendChild(row);
                }
                wsTable.appendChild(tblBody);
                container.appendChild(wsTable);
        });
    }
}

let m = new Main();