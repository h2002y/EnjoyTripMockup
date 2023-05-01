let serviceKey =
  "FAIZJN0%2FoFX7mA6mrc1Wpk7wNwqivZt8Ym0tPbgBMWWuvqhvWvlFON4csdBoSrtOOwQjcKC7L8yiAor29Gqd%2FQ%3D%3D";
let areaUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${serviceKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
fetch(areaUrl)
.then((response) => response.json())
.then((data) => makeOption(data));

function makeOption(data) {
let areas = data.response.body.items.item;
let sel = document.getElementById("search-area");
areas.forEach((area) => {
  let opt = document.createElement("option");
  opt.setAttribute("value", area.code);
  opt.appendChild(document.createTextNode(area.name));
  sel.appendChild(opt);
});
}


function changeAreaSelect(e){
	// 기존의 모든 option 삭제
	let detailSel = document.getElementById("search-detail-area");
	while(detailSel.firstChild){
		detailSel.removeChild(detailSel.lastChild);
	}
	
	// 전체 option 추가
	let opt = document.createElement("option");
	opt.setAttribute("value", 0);
	opt.appendChild(document.createTextNode("검색할 상세 지역 선택"));
	detailSel.appendChild(opt);
	
	if(e.value === "0") return; // 지역을 선택하지 않을 경우 detail option을 추가하지 않도록
	
	// option 파싱
	let areaCode = e.value;
	let detailAreaUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&areaCode=${areaCode}&_type=json`;
	
	fetch(detailAreaUrl)
	.then((response) => response.json())
	.then((data) => makeDetailOption(data));
}

function makeDetailOption(data){
	let detailAreas = data.response.body.items.item;
	let detailSel = document.getElementById("search-detail-area");
	detailAreas.forEach((detailArea) => {
		let opt = document.createElement("option");
		opt.setAttribute("value", detailArea.code);
		opt.appendChild(document.createTextNode(detailArea.name));
		detailSel.appendChild(opt);
	})
}