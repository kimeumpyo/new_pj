import React, { useState, useContext, useEffect, useRef } from 'react';
import './App.css';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


// 프로젝트에 필요한 데이터 객체를 구성한다


const years = [2020, 2019, 2018, 2017, 2016];

// 서버에 데이터를 요청하는 함수
function fetchData(year) {

  const API_URL ="http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
  const API_KEY ="GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";
  const type = 'json';
  const numOfRows = 10;
  const pageNo = 1;

  // 자바스크립트에 내장된 fetch() 메서드를 사용하여 서버에 요청한다
  const promise = fetch(`${API_URL}?addr=&sidoName=&pageNo=1&numOfRows=642&serviceKey=${API_KEY}&returnType=json`)
    .then(res => {
      // 서버의 응답코드(status)가 200(성공)이 아닌 경우 catch 블록에 응답 객체를 던진다
      if (!res.ok) { 
        throw res;
      }
      // 서버의 응답코드가 200인 경우 응답객체(프로미스 객체)를 리턴한다
      return res.json();
    })

  return promise;
  
}

// 메인 컴포넌트 
export default function App() {

  
  

  const [year, setYear] = useState(years[0]);
  
  
  return (
    <>
      {/* Side Bar */}
      <nav>
        <h1>미세먼지 측정소 조회</h1>
        <section>
          <h3>년도</h3>
          {years.map((year) => (
        <button onClick={() => setYear(year)}>{year}</button>            
          ))}
        </section>
      </nav>

      {/* 메인 */}
      <main>
        <div id="select-year">
          <select onChange={(e) => setYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* 대시보드에 city와 year변수를 전달한다 */}
        <Dashboard year={year} />
      </main>
    </>
  )
}

// 대시보드 
function Dashboard({ year }) {

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  

  

  useEffect(() => {

    // 서버에 요청하기 전 사용자에게 대기 상태를 먼저 보여주어야 한다
    setIsLoaded(false); 
    setError(null);

      // fetchData함수에 city와 year 변수를 전달한다
      fetchData(year)
        .then(data => {
          setData(data);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoaded(true)); // 성공 실패와 관계없이 서버가 응답하면 대기상태를 해제한다

  }, [year]) // city 또는 year 변수가 업데이트되면 서버에 다시 데이터를 요청한다

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }

  const arr = data.response.body.items;

  const r = arr.filter((item) => {
    if (item.year == year) {
      return item;
    }
  });

  // 년도별 주소및 좌표
  const rs = r.map((item) => {
    return [Number(item.dmX), Number(item.dmY), item.addr];
  });


  return (
    <>
      <h1>{year}년 미세먼지 측정기 조회</h1>
      {data.totalCount > 0 ? (
        <>
          {/* DATA를 합성된 컴포넌트에 전달한다 */}
          {/* <Rechart accidents={data.response.body.items} /> */}
          <KakaoMap accidents={data.response.body.items} />
          <ul>
          <p>{Number(rs.length)-1}</p>
        {r.map((item, index) => (
          <li key={index}>{item.year}</li>
        ))}
        </ul>
        </>
      ) : (
        // 데이터가 없으면 사용자에게 자료가 없다는 것을 알려야 한다
        <p>자료가 없습니다</p>
      )}
    </>
  )
}

// // 리차트 (리액트 차트 라이브러리)
// function Rechart({ accidents }) {

//   console.log(accidents); // 데이터가 전달되었는지 확인 후 아래 코드를 작성하세요

//   // 리차트가 요구하는 형식에 맞게 데이터를 구성한다
//   const chartData = accidents.map(accident => {
//     return {
//       name: accident.year
//     }
//   })

//   return (
//     <div style={{ height: "300px" }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           width={500}
//           height={300}
//           data={chartData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="발생건수" fill="#0af" />
//           <Bar dataKey="중상자수" fill="#fa0" />
//           <Bar dataKey="사망자수" fill="#f00" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// 카카오 지도 
/////////////


function KakaoMap({ accidents }) {

  const my_script = new_script(
    "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e7f28da5ec5723a01344341099af1f5e&libraries=clusterer"
  );
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
      for (var i = 0; i < accidents.length; i++) {
        // 지도에 마커를 생성하고 표시한다
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(accidents[i][0], accidents[i][1]),
          map: map,
        });

        marker.setMap(map);

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: accidents[i][2],
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

  console.log(accidents) // 데이터가 전달되었는지 확인 후 아래 코드를 작성하세요

  // MapInfoWindow 컴포넌트를 재사용한다
  const mapInfoWindows = accidents.map(accident => (
    <MapInfoWindow
      key={accident.year}
      position={{ lat: accident.dmX, lng: accident.dmY }}
      removable={true}
    >
      <div style={{ padding: "5px", color: "#000" }}>
        {/* {accident.year.split(' ')[2]} */}
      </div>
    </MapInfoWindow>
  ))


  // 맵 불러오기
  return (
    <Map
      center={{ lat: accidents[0].dmX, lng: accidents[0].dmY }} // 지도의 중심 좌표
      style={{ width: "800PX", height: "450px" }}                     // 지도 크기
      level={5}                                                       // 지도 확대 레벨

      
    >
      {mapInfoWindows}
    </Map>
    
  )
}