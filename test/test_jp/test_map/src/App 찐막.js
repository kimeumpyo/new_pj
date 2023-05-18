import "./App.css";
import { useEffect, useState } from "react";

// 미세먼지 불러오기 및 적용
export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";
const years = [2017, 2018, 2019, 2020, 2021];

function App() {
  const [year, setYear] = useState(2019);
  const [datass, setData] = useState(null);
  

  // 스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };
  
  useEffect(() => {
    
    async function getData() {
      const apiURL = `${API_URL}?addr=&sidoName=&pageNo=1&numOfRows=642&serviceKey=${API_KEY}&returnType=json`;
      // api를 부르는 가장 기본적인 명령어
      const response = await fetch(apiURL);
      const datas = await response.json();
      console.log("datas", datas);
      
      setData(datas)
      
      const map_data = datas.response.body.items.map(item =>
        [Number(item.dmX), Number(item.dmY), item.addr]
        ) // map_data
        
        const arr = datas.response.body.items;
        
        // 년도 -> 모든 데이터에서 year에 맞는 데이터만 추출
        const r = arr.filter((item) => {
          if (item.year == year) {
            return item;
          }
        });
        
        // 년도별 주소및 좌표
        const rs = r.map((item) => {
          return [Number(item.dmX), Number(item.dmY), item.addr];
        });
        
        
      console.log("map_data", map_data)
      drawMap(rs)
      
    }
    getData();
    

    // fetch(apiURL)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     const map_data = datas.response.body.items.map(item =>
    //       [Number(item.dmX), Number(item.dmY), item.addr])
    //     setData(response);
    //   });



    // console.log(datas)
    // console.log(map_data);

    function drawMap(rs) {

      
      console.log("rs",rs)

      // 카카오맵 스크립트 읽어오기
      const my_script = new_script(
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e7f28da5ec5723a01344341099af1f5e&libraries=clusterer"
      ); // &libraries=cluserer => 마크를 클러스터러로 표기

      // 스크립트 읽기 완료 후 카카오맵 설정
      my_script.then(() => {
        // console.log('script loaded!!!');
        const kakao = window["kakao"];
        kakao.maps.load(() => {

          // 맵의 기본적인 위치생성
          const mapContainer = document.getElementById("map"),
            mapOption = {
              center: new kakao.maps.LatLng(37.5608, 126.9826), //좌표설정
              level: 5, // 지도의 확대 레벨
            };

          // 지도를 생성한다
          const map = new kakao.maps.Map(mapContainer, mapOption);

          // 마커 클러스터러를 생성합니다
          const clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 10, // 클러스터 할 최소 지도 레벨
          });

          // 지도에 표시되는 좌표 및 내용
          // map_data = [
          //   [37.5608, 126.9826, "내용"],
          //   [37.5608, 126.8486, "내용2"],
          //   [37.5608, 126.9626, "내용3"]
          // ];

          const markers = [];

          // map_data별로 마크 생성
          for (var i = 0; i < rs.length; i++) {
            // 지도에 마커를 생성하고 표시한다
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(rs[i][0], rs[i][1]),
              map: map,
            });

            marker.setMap(map);

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
              content: rs[i][2],
            });

            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            // infowindow.open(map, marker);

            markers.push(marker);
            kakao.maps.event.addListener(
              marker,
              "mouseover",
              makeOverListener(map, marker, infowindow)
            );
            kakao.maps.event.addListener(
              marker,
              "mouseout",
              makeOutListener(infowindow)
            );
            kakao.maps.event.addListener(
              marker,
              "load",
              makeOutListener(infowindow)
            );
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
    }
  }, []);

  if (!datass) {
    return <p>...</p>;
  }

  // const all_mark = datas.response.body.items.map((item) => {
  //   return [Number(item.dmX), Number(item.dmY), item.addr];
  // });

  // 년도 -> 아이템의 모든 데이터
  const arr = datass.response.body.items;

  // 년도 -> 모든 데이터에서 year에 맞는 데이터만 추출
  const r = arr.filter((item) => {
    if (item.year == year) {
      return item;
    }
  });

  // 년도별 주소및 좌표
  const rs = r.map((item) => {
    return [Number(item.dmX), Number(item.dmY), item.addr];
  });

  // console.log("년도별좌표", rs);
  // console.log("자료수", rs.length);

  return (
    <>
      <div className="App">
        <div id="map" className="map" />
      </div>

      {years.map((year) => (
        <button onClick={() => setYear(year)}>{year}</button>
      ))}
      <ul>
        <p>{Number(rs.length)-1}</p>
        {r.map((item, index) => (
          <li key={index}>{item.year}</li>
        ))}
      </ul>
    </>

  );
}

export default App;
