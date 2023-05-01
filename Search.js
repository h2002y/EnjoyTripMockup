let contentTypeId = document.getElementById("search-content-id").value;
document.getElementById("btn-search").addEventListener("submit", makeSearchList());

// 관광지 List를 받아 지도에 표시할 마커 목록 생성하기
let positions;
const makeSearchList = () => {
  positions = [];
  /* JSP 코드 - spring boot와 연동시키면 주석 해제 처리 */
  // <c:if test="${! empty attList}">
  //   <c:forEach var="att" items="${attList}" begin="1" end="20">
  //     let getmarkerInfo = {
  //       title: "${att.title}",
  //       latlng: new kakao.maps.LatLng(${att.latitude}, ${att.longitude}),
  //       ct: ${att.content_type_id},
  //       image: "${att.image}",
  //       addr: "${att.addr}"
  //     };
  //     positions.push(getmarkerInfo);
  //   </c:forEach>
  //   for (var i = 0; i < positions.length; i++) {
  //     console.log(positions[i]['title']);
  //   }
  //   displayMarker();
  // </c:if>
};

// 지도에 마커 목록  표시하기
const displayMarker = () => {
  let bounds = new kakao.maps.LatLngBounds();
  console.log("bound");
  //바운드
  if (map != null) {
    map = null;
  }
  map = new kakao.maps.Map(mapContainer, mapOption);

  console.log("mapcreate");
  positions.forEach((pos) => {
    let imageSize = new kakao.maps.Size(24, 24);
    // 마커 이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage("./assets/img/camera.png", imageSize);
    // 마커를 생성합니다
    console.log(pos.ct);
    if (pos.ct == 12) {
      //관광지면 관광지마크
      markerImage = new kakao.maps.MarkerImage("./assets/img/camera.png", imageSize);
    } else if (pos.ct == 14) {
      //문화시설
      markerImage = new kakao.maps.MarkerImage("./assets/img/museum.png", imageSize);
    } else if (pos.ct == 15) {
      //행사
      markerImage = new kakao.maps.MarkerImage("./assets/img/parade.png", imageSize);
    } else if (pos.ct == 25) {
      //여행
      markerImage = new kakao.maps.MarkerImage("./assets/img/vacation.png", imageSize);
    } else if (pos.ct == 28) {
      //레포츠
      markerImage = new kakao.maps.MarkerImage("./assets/img/sports.png", imageSize);
    } else if (pos.ct == 32) {
      //숙박
      markerImage = new kakao.maps.MarkerImage("./assets/img/bed.png", imageSize);
    } else if (pos.ct == 38) {
      //쇼핑
      markerImage = new kakao.maps.MarkerImage("./assets/img/shopping.png", imageSize);
    } else if (pos.ct == 39) {
      //음식점
      markerImage = new kakao.maps.MarkerImage("./assets/img/restaurant.png", imageSize);
    }
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: pos.latlng, // 마커를 표시할 위치
      title: pos.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      markct: pos.ct,
      image: markerImage, // 마커 이미지
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    let content =
      `<div class="wrap">` +
      `    <div class="info">` +
      `       <div class="title">` +
      `            \${pos.title}` +
      `        </div>` +
      `        <div class="body">` +
      `            <div class="img">` +
      `                <img src="\${pos.image}" width="73" height="70">` +
      `           </div>` +
      `            <div class="desc">` +
      `                <div class="ellipsis">\${pos.addr}</div>` +
      `                <div class="jibun ellipsis">\${pos.addr2}</div>` +
      `                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">눌러서 자세히보기</a></div>` +
      `            </div>` +
      `        </div>` +
      `    </div>` +
      `</div>`;
    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    /* var overlay = new kakao.maps.CustomOverlay({
         	 content: content,	
        	  map: map,
        	  position: pos.latlng
        	});
	        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
	        
	        function closeOverlay() {
	          overlay.setMap(null);
	        }
	       	closeOverlay(); */
    let overlay;
    kakao.maps.event.addListener(marker, "click", function () {
      console.log(pos.latlng);
      map.setCenter(pos.latlng);
      overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: pos.latlng,
      });
    });
    kakao.maps.event.addListener(marker, "mouseout", function () {
      overlay.setMap(null);
    });
    bounds.extend(pos.latlng);
  }); //	eof
  // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
  map.setCenter(positions[0].latlng);
  let content2 =
    `<div class="wrap">` +
    `    <div class="info">` +
    `       <div class="title">` +
    `            \${positions[0].title}` +
    `        </div>` +
    `        <div class="body">` +
    `            <div class="img">` +
    `                <img src="\${positions[0].image}" width="73" height="70">` +
    `           </div>` +
    `            <div class="desc">` +
    `                <div class="ellipsis">\${positions[0].addr}</div>` +
    `                <div class="jibun ellipsis">\${positions[0].addr2}</div>` +
    `                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">눌러서 자세히보기</a></div>` +
    `            </div>` +
    `        </div>` +
    `    </div>` +
    `</div>`;
  let overlay = new kakao.maps.CustomOverlay({
    content: content2,
    map: map,
    position: positions[0].latlng,
  });

  function moveCenter(lat, lng) {
    map.setCenter(new kakao.maps.LatLng(lat, lng));
  }
  function setBounds() {
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    map.setBounds(bounds);
  }
  setBounds();
};
