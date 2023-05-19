import "./App.css";
import { useEffect, useState } from "react";
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';


// 미세먼지 불러오기 및 적용
export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

  

  const years = [2022, 2021, 2020, 2019, 2018];
  

  
// 서버에 데이터를 요청하는 함수
function fetchData() {
  
  
  const API_URL = "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
  const API_KEY = "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";
  const type = 'json';
  const numOfRows = 642;
  const pageNo = 1;
  
  // 자바스크립트에 내장된 fetch() 메서드를 사용하여 서버에 요청한다
  const promise = fetch(`${API_URL}?addr=&sidoName=&pageNo=${pageNo}&numOfRows=${numOfRows}&serviceKey=${API_KEY}&returnType=${type}`)
  .then(response => {
    // 서버의 응답코드(status)가 200(성공)이 아닌 경우 catch 블록에 응답 객체를 던진다
    if (!response.ok) {
      throw response;
    }
    // 서버의 응답코드가 200인 경우 응답객체(프로미스 객체)를 리턴한다
    return response.json();
  })
  return promise;
  }



export default function App() {
  
const [year, setYear] = useState(years[0]);


  return (
    <>
      
        <h1>자전거 사고조회</h1>
        <section>
          <h3>서울</h3>

          {years.map((year) => (
          <button onClick={() => setYear(year)}>{year}</button>
      ))}
        </section>

        
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

function Dashboard(){

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    // 서버에 요청하기 전 사용자에게 대기 상태를 먼저 보여주어야 한다
    setIsLoaded(false); 
    setError(null);

      // fetchData함수에 city와 year 변수를 전달한다
      fetchData()
        .then(data => {
          setData(data);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoaded(true)); // 성공 실패와 관계없이 서버가 응답하면 대기상태를 해제한다

        
  }, []) // city 또는 year 변수가 업데이트되면 서버에 다시 데이터를 요청한다

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }



        // 모든 데이터
        const arr_data = data.response.body.items;
        console.log("ssss",arr_data)

         // 년도 -> 모든 데이터에서 year에 맞는 데이터만 추출
         const years_data = arr_data.filter((item) => {
          if (item.year == year) {
            return item;
          }
        });
        console.log(years_data)

        // 년도별 주소및 좌표
        const year_data = years_data.map((item) => {
          return [Number(item.dmX), Number(item.dmY), item.addr];
        });


  






  return (
    <>
      <h1>{year}년 측정소 조회</h1>
      {data.totalCount > 0 ? (
        <>
          {/* DATA를 합성된 컴포넌트에 전달한다 */}
          {/* <Rechart accidents={data.items.item} /> */}
          <KakaoMap accidents={data.items.item} />
        </>
      ) : (
        // 데이터가 없으면 사용자에게 자료가 없다는 것을 알려야 한다
        <p>자료가 없습니다</p>
      )}
    </>
  )

}

// function Rechart({ accidents }) {}

function KakaoMap({ accidents }) {

  // MapInfoWindow 컴포넌트를 재사용한다
  const mapInfoWindows = accidents.map(accident => (
    <MapInfoWindow
      key={accident.dmX}
      position={{ lat: accident.dmX, lng: accident.dmY }}
      removable={true}
    >
      <div style={{ padding: "5px", color: "#000" }}>
      </div>
    </MapInfoWindow>
    ))


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



