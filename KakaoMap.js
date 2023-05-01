let mapContainer = document.getElementById("kakao-map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

let map = new kakao.maps.Map(mapContainer, mapOption);

// 지도를 표시하는 div 크기를 변경하는 함수입니다
const resizeMap = () => {
  let mapContainer = document.getElementById("kakao-map");
  mapContainer.style.width = "650px";
  mapContainer.style.height = "650px";
};

const relayout = () => {
  // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
  // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다
  // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
  map.relayout();
};
