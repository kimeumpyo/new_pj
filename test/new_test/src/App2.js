
import './App.css';
import { useEffect, } from 'react';

// 미세먼지 불러오기 및 적용
export const API_URL = 'http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo';
export const API_KEY = 'GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D';

function App() {

  // 스크립트 파일 읽어오기
  const new_script = src => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', e => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };


  useEffect(() => {
    const endpoint = `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&resultType=json `;

  fetch(endpoint)
  .then(response => response.json())
  .then(response=>{
      console.log(response)
      
  })
    // 카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e7f28da5ec5723a01344341099af1f5e&libraries=clusterer'); // &libraries=cluserer => 마크를 클러스터러로 표기

    // 스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      // console.log('script loaded!!!');
      const kakao = window['kakao'];
      kakao.maps.load(() => {

        const mapContainer = document.getElementById('map'),
          mapOption = {
            center: new kakao.maps.LatLng(37.5608, 126.9826), //좌표설정
            level: 3  // 지도의 확대 레벨
          };

        // 지도를 생성한다
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커 클러스터러를 생성합니다
        const clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
          minLevel: 10 // 클러스터 할 최소 지도 레벨 
        });

        // 지도에 표시되는 좌표 및 내용
        const map_data = [
          [37.5608, 126.9826, '<div style=padding: 5px">내용1</div>'],
          [37.5608, 126.8486, '<div style=padding: 5px">내용2</div>'],
          [37.5608, 126.9626, '<div style=padding: 5px">내용3</div>']
        ]
      
        const markers = [];

        for (var i = 0; i < map_data.length; i++) {

          // 지도에 마커를 생성하고 표시한다
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(map_data[i][0], map_data[i][1]),
            map: map
          });

          marker.setMap(map);
          

          // 인포윈도우를 생성합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: map_data[i][2]
          });

          // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
          // infowindow.open(map, marker);

          markers.push(marker);
          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          kakao.maps.event.addListener(marker, 'load', makeOutListener(infowindow));
        }
        
        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
        
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }
  
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }
        
      });
    });
  }, []);

  return (
    <div className="App">
      <div id="map" className="map" />
    </div>
  );
}

export default App;







