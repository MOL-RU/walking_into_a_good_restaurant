// 맵 불러오기
var container = document.getElementById('map');
var options = {
  center: new kakao.maps.LatLng(37.550362, 127.074274),
  level: 4
};
var map = new kakao.maps.Map(container, options);

// 마커 DB
let markerDB = [
  {'title':'시홍쓰', 'description':'마파두부(면/밥), 토마토달걀덮밥, 덴뿌라', 'latitude':37.546070, 'longitude':127.072999},
  {'title':'은혜떡볶이', 'description':'즉석떡볶이, 볶음밥(치즈 추가)', 'latitude':37.548081, 'longitude':127.072337},
  {'title':'행복한 그릇', 'description':'가츠동, 규동, 사케동, 김치가츠동', 'latitude':37.548834, 'longitude':127.072907},
  {'title':'스시붐', 'description':'따뜻한 연어초밥', 'latitude':37.548369, 'longitude':127.072754},
  {'title':'청와옥 군자직영점', 'description':'순대국밥, 편백정식', 'latitude':37.556454, 'longitude':127.080389},

  {'title':'피자컴퍼니', 'description':'갈릭슈림프, 포테이토베이컨, 슈퍼컴퍼니', 'latitude':37.555077, 'longitude':127.079251},
  {'title':'이이요', 'description':'야끼돈부리, 초밥, 카이센동', 'latitude':37.555187, 'longitude':127.078915},
  {'title':'오코노미야키식당하나', 'description':'야끼소바, 돼지오징어타마', 'latitude':37.546161, 'longitude':127.067669},
  {'title':'미식반점', 'description':'탕후루탕수육, 해물볶음짜장', 'latitude':37.548880, 'longitude':127.071135},
  {'title':'카레당', 'description':'에그셋트, 우삼겹카레, 허브치킨카레', 'latitude':37.552623, 'longitude':127.076743},

  {'title':'가츠시', 'description':'돈가스, 소바정식', 'latitude':37.546355, 'longitude':127.075787},
  {'title':'석기시대 짜장마을', 'description':'짜장면, 짬뽕, 탕수육 + 짜장세트', 'latitude':37.552944, 'longitude':127.072129},
  {'title':'뱃놈', 'description':'뱃놈 조개구이', 'latitude':37.548194, 'longitude':127.072968},
  {'title':'춘천골 닭갈비', 'description':'뼈없는 닭갈비, 비빔공기, 대나무 막걸리', 'latitude':37.548880, 'longitude':127.070945},
]

// 마커 지정하기
for(i=0; i<14; i++) {

  // 인포윈도우 내용과 스타일  
  let style = '' +
  ' <h2 id="map__title" class="map__element">'+markerDB[i]['title']+'</h2> ' +
  ' <h4 id="map__description" class="map__element">'+markerDB[i]['description']+'</h4> ' +
  ' <h5 id="map__navigation" class="map__element"><a href="https://map.kakao.com/link/map/'+markerDB[i]['title']+','+markerDB[i]['latitude']+','+markerDB[i]['longitude']+'" target="_blank" class="map__link">큰 지도보기</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://map.kakao.com/link/to/'+markerDB[i]['title']+','+markerDB[i]['latitude']+','+markerDB[i]['longitude']+'" target="_blank" class="map__link">길찾기</a></h5>  '  

  // 마커가 표시될 위치
  var markerPosition = new kakao.maps.LatLng(markerDB[i]['latitude'], markerDB[i]['longitude']); 
  
  // 마커를 생성
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true
  });

  // 마커가 지도 위에 표시되도록 설정
  marker.setMap(map);
  var iwContent = style,
    iwPosition = new kakao.maps.LatLng(markerDB[i]['latitude'], markerDB[i]['longitude']);
    iwRemoveable = true;
  
  // 인포윈도우를 생성
  var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent,
    removable : iwRemoveable
  });

  // 마커 위에 인포윈도우를 표시
  infowindow.open(map, marker); 

  // 마커에 click 이벤트 등록
  kakao.maps.event.addListener(marker, 'click', makeClickListener(map, marker, infowindow));

}

// 인포윈도우를 표시하는 클로저를 만드는 함수
function makeClickListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);
  };  
};

