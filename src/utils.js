export function createBody(item) {
    var body = document.createElement('div')
    body.className = "body"

    var header = document.createElement("div")
    header.className = "body-header"

    var name = document.createElement("h1")
    name.innerText = item.name
    header.appendChild(name);


    body.appendChild(header);

    var summary = document.createElement("p")
    summary.innerText = item.summary;
    body.appendChild(summary);

    // var link = document.createElement("a")
    // link.href = item.source;
    // link.innerText = "Learn More Here."
    // link.onclick = function(event) {
    //     event.stopPropagation();
    // }
    // body.appendChild(link);

    let table = document.createElement("table")
    insertCell("Atomic Mass", item.atomic_mass, table)
    if (item.boil) {
        insertCell("Boiling Point", item.boil, table)
    }
    if (item.melt) {
        insertCell("Melting Point", item.melt, table)
    }
    if (item.density) {
        insertCell("Density", item.density, table)
    }
    if (item.electron_affinity) {
        insertCell("Electron Affinity", item.electron_affinity, table)
    }
    insertCell("Electron Configuration", item.electron_configuration, table);
    insertCell("Category", capitalize(item.category), table)
    body.appendChild(table);

    return body
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function insertCell(name, value, table) {
    let row = table.insertRow();
    let cell = row.insertCell();
    let key = document.createTextNode(name);
    let val = document.createTextNode(value);
    cell.appendChild(key);
    let cell2 = row.insertCell();
    cell2.appendChild(val);
}