const displayHotplaceList = () => {
  const hotplaceListContainer = document.querySelector(".hotplace-list");
  const hotplaceList = JSON.parse(sessionStorage.getItem("hotplaces"));
  if (hotplaceList === null) return;
  console.log(hotplaceList);
  hotplaceList.forEach((hotplace) => {
    let hotplaceContainer = document.createElement("div");
    let imgSrc = hotplace.imgSrc;
    let placeName = hotplace.placeName;
    let date = hotplace.date;
    let category = hotplace.category;
    let detail = hotplace.detail;
    let lat = hotplace.lat;
    let lng = hotplace.lng;
    hotplaceContainer.appendChild(document.createTextNode(imgSrc));
    hotplaceContainer.appendChild(document.createTextNode(placeName));
    hotplaceContainer.appendChild(document.createTextNode(date));
    hotplaceContainer.appendChild(document.createTextNode(category));
    hotplaceContainer.appendChild(document.createTextNode(detail));
    hotplaceContainer.appendChild(document.createTextNode(lat));
    hotplaceContainer.appendChild(document.createTextNode(lng));
    hotplaceListContainer.appendChild(hotplaceContainer);
  });
};

displayHotplaceList();

const submitHotplace = document.querySelector("#submit_hotplace");

// 초기 마커 위치 가져오기
let marker = new kakao.maps.Marker({
  position: map.getCenter(),
});
// 지도에 마커 표시
marker.setMap(map);

let currLatLng;

kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  // 클릭한 위도, 경도 정보를 가져옵니다
  let latlng = mouseEvent.latLng;
  currLatLng = latlng;
  console.log(currLatLng);
  // 마커 위치를 클릭한 위치로 옮깁니다
  marker.setPosition(latlng);
});

//submit한다면 사용자 입력 내용으로 오버레이 생성
submitHotplace.addEventListener("click", (e) => {
  e.preventDefault();

  const imgSrc = document.querySelector("#imgSrc").value;
  const placeName = document.querySelector("#placeName").value;
  const date = document.querySelector("#date").value;
  const category =
    document.querySelector("#category").options[document.querySelector("#category").selectedIndex]
      .innerText;
  const detail = document.querySelector("#detail").value;
  const lat = currLatLng.getLat();
  const lng = currLatLng.getLng();

  // 핫플레이스 세션스토리지에 넣기
  const hotplace = new Object();
  hotplace.imgSrc = imgSrc;
  hotplace.placeName = placeName;
  hotplace.date = date;
  hotplace.category = category;
  hotplace.detail = detail;
  hotplace.lat = lat;
  hotplace.lng = lng;

  console.log(hotplace);

  let hotplaces = JSON.parse(sessionStorage.getItem("hotplaces"));
  console.log(hotplaces);
  if (hotplaces == null) hotplaces = [];
  hotplaces.push(hotplace);
  sessionStorage.setItem("hotplaces", JSON.stringify(hotplaces));
  displayHotplaceList();

  // 지도에 출력할 오버레이 박스 만들기
  var mapContent =
    '<div class="overlaybox">' +
    '    <div class="hotplace-title">나의 핫플레이스!</div>' +
    '    <ul class="hotplace-list">' +
    "       <li>" +
    `            <img src=${imgSrc}</img>` +
    "        </li>" +
    "       <li>" +
    `            <span>${placeName}</span>` +
    "        </li>" +
    "        <li>" +
    `            <span>${date}</span>` +
    "        </li>" +
    "        <li>" +
    `            <span>${category}</span>` +
    "        </li>" +
    "        <li>" +
    `            <span>${detail}</span>` +
    "        </li>" +
    "    </ul>" +
    "</div>";

  // 지도를 클릭한 위치에 표출할 마커입니다
  var customOverlay = new kakao.maps.CustomOverlay({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter(),
    content: mapContent,
    // text: '장소: 옥암동',
    // image: markerImage,
  });
  // 지도에 마커를 표시합니다
  marker.setMap();
  customOverlay.setMap(map);
});
