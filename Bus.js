const serviceKey = "FAIZJN0%2FoFX7mA6mrc1Wpk7wNwqivZt8Ym0tPbgBMWWuvqhvWvlFON4csdBoSrtOOwQjcKC7L8yiAor29Gqd%2FQ%3D%3D";
const terminalUrl = `https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=${serviceKey}&pageNo=1&numOfRows=229&_type=json`;
const fetchTerminalInfo = () => {
    fetch(terminalUrl)
    .then(response => response.json())
    .then(data => makeTerminalOption(data));
}

const makeTerminalOption = (data) => {
    let terminals = data.response.body.items.item;
    let sel = document.querySelectorAll(".search-terminal");
    sel.forEach(select => {
        terminals.forEach(terminal => {
            let opt = document.createElement("option");
            opt.setAttribute("value", terminal.terminalId);
            opt.appendChild(document.createTextNode(terminal.terminalNm));
            select.appendChild(opt);
        });
    });
};

const searchBus = () => {
    const departureTerminal = document.getElementById("bus-departure").value;
    const arrivalTerminal = document.getElementById("bus-arrival").value;
    let date = document.getElementById("bus-date").value;
    date = date.replace(/-/g, '');

    console.log(departureTerminal);
    console.log(arrivalTerminal);
    console.log(date);
    
    const busUrl = `https://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo?serviceKey=${serviceKey}&_type=json&depTerminalId=${departureTerminal}&arrTerminalId=${arrivalTerminal}&depPlandTime=${date}`;
    fetch(busUrl)
    .then(response => response.json())
    .then(data => displayBusList(data));
};

const displayBusList = (data) => {
    console.log(data);
    let buses = data.response.body.items.item;
    let busContainer = document.getElementById("bus-list");
    buses.forEach(bus => {
        let busInfo = document.createElement("div");
        busInfo.appendChild(document.createTextNode(bus.depPlaceNm));
        busInfo.appendChild(document.createTextNode(bus.arrPlaceNm));
        busInfo.appendChild(document.createTextNode(bus.depPlandTime));
        busInfo.appendChild(document.createTextNode(bus.charge));
        busInfo.appendChild(document.createTextNode(bus.gradeNm));
        busContainer.appendChild(busInfo);
    });
};

document.getElementById("bus-search-button").addEventListener("click", searchBus);

fetchTerminalInfo();