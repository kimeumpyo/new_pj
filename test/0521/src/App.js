import React, { useState, useContext, useEffect, useRef } from 'react';
import './App.css';
import { Map, MapMarker, MapInfoWindow , MarkerClusterer} from 'react-kakao-maps-sdk';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, NavLink, } from 'react-router-dom';
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
const seoul = [{ siDo: 11, name: '서울' },]
const incheon = [{ siDo: 28, name: '인천' },]
const busan = [{ siDo: 26, name: '부산' },]
const daegu = [{ siDo: 27, name: '대구' },]
const gwangju = [{ siDo: 29, name: '광주' },]
const Daejeon = [{ siDo: 30, name: '대전' },]

 

const years = [2021, 2020, 2019, 2018, 2017];
const citys = [seoul, incheon, busan, daegu, gwangju, Daejeon];

// 서버에 데이터를 요청하는 함수
function fetchData(city, year) {

  const API_URL = 'http://apis.data.go.kr/B552061/frequentzoneFreezing/getRestFrequentzoneFreezing'
  const API_KEY = 'GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D'
  const type = 'json';
  const numOfRows = 1000;
  const pageNo = 1;

  // 자바스크립트에 내장된 fetch() 메서드를 사용하여 서버에 요청한다
  const promise = fetch(`${API_URL}?ServiceKey=${API_KEY}&searchYearCd=${year}&siDo=${city.siDo}&guGun=&numOfRows=${numOfRows}&pageNo=${pageNo}&type=${type}`)
    .then(res => {
      console.log(promise)
      
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
  const [city, setCity] = useState(seoul[0]);

  return (
    <>
      {/* header */}
      <header>
        <div className="header_flex">
          {/* <a href="#" className="header_a">&#9776;</a> */}
          <h1 className="header_h1">❄ 결빙 사고 다발지역</h1>
          
          <div className='header_button'>
            <div>
              {seoul.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
              {incheon.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            </div>
            <div>
              {busan.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
              {daegu.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            </div>
            <div>
              {gwangju.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
              {Daejeon.map(city => (<button class="btn" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            </div>
            
            <section>
              <select class="year" onChange={(e) => setYear(e.target.value)}>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

            </section>
          </div>
        </div>
      </header>

      {/* Side Bar */}
      <nav className="side_nav">
        <div className="side_div">
          <h1 className="side_h1">결빙 사고 <br/>다발지역</h1>
        </div>
        <div className='side_btn'>
          <div className='side_btn_position'>
            {seoul.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            {incheon.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            {busan.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            {daegu.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            {gwangju.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}
            {Daejeon.map(city => (<button class="side_btn_size" key={city.id} onClick={() => setCity(city)}>{city.name}</button>))}          
          </div>
          <section>
            <select class="year" onChange={(e) => setYear(e.target.value)}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </section>
        </div>
      </nav>

      {/* 메인 */}
      <main>
        <div>
          <div className="container">
            {/* 대시보드에 city와 year변수를 전달한다 */}
            <Dashboard city={city} year={year} />
          </div>
        </div>
      </main>
    </>
  )
}

// 대시보드 
function Dashboard({ city, year }) {

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {

    // 서버에 요청하기 전 사용자에게 대기 상태를 먼저 보여주어야 한다
    setIsLoaded(false); 
    setError(null);

      // fetchData함수에 city와 year 변수를 전달한다
      fetchData(city, year)
        .then(data => {
          console.log("data",data)
          
          setData(data);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoaded(true)); // 성공 실패와 관계없이 서버가 응답하면 대기상태를 해제한다
  }, [city, year]) // city 또는 year 변수가 업데이트되면 서버에 다시 데이터를 요청한다

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }
  
  return (
    <>
      
      {data.totalCount > 0 ? (
        <>
          {/* DATA를 합성된 컴포넌트에 전달한다 */}
          <div className='chart_title_pt'>
            <div className='chart_title'>{year}년 {city.name} 사고결과 조회</div>
          </div>
          <div className="show_images">
            <KakaoMap accidents={data.items.item} />
            <Rechart accidents={data.items.item} />
          </div>
        </>
      ) : (
        // 데이터가 없으면 사용자에게 자료가 없다는 것을 알려야 한다
        <p>자료가 없습니다</p>
      )}
    </>
  )
}

// 리차트 (리액트 차트 라이브러리)
function Rechart({ accidents }) {

  console.log("",accidents); // 데이터가 전달되었는지 확인 후 아래 코드를 작성하세요

  // 리차트가 요구하는 형식에 맞게 데이터를 구성한다
  const chartData = accidents.map(accident => {
    return {
      name: accident.spot_nm.split(' ')[2],
      발생건수:accident.occrrnc_cnt,
      중상자수:accident.se_dnv_cnt,
      사상자수:accident.caslt_cnt,
      사망자수:accident.dth_dnv_cnt
    }
  })

  return (
    <div className="chart">
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={500}
          data={chartData}
          margin={{ top: 5, right: 70, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="발생건수" fill="#0af" />
          <Bar dataKey="중상자수" fill="#fa0" />
          <Bar dataKey="사상자수" fill="#f00" />
          <Bar dataKey="사망자수" fill="#fae" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// 카카오 지도 
function KakaoMap({ accidents }) {
  console.log(accidents) // 데이터가 전달되었는지 확인 후 아래 코드를 작성하세요
  // 인포윈도우
  const [isOpen, setIsOpen] = useState(false);

 

  // MapInfoWindow 컴포넌트를 재사용한다
  const mapInfoWindows = accidents.map(accident => (
    <MapMarker
      key={accident.la_crd}
      position={{ lat: accident.la_crd, lng: accident.lo_crd }}
      removable={true}
      // 마커에 마우스오버 이벤트를 등록합니다
      onMouseOver={
        () => setIsOpen(true)// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
      }
      // 마커에 마우스아웃 이벤트를 등록합니다
      onMouseOut={
        () => setIsOpen(false)// 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      }
      >
      {/* 인포윈도우에 나오는 */}
      {isOpen &&<div style={{ padding: "5px", color: "#000"}}>
      {accident.spot_nm.split(' ')[2]}
      </div>}
    </MapMarker>
  ));
  
  

 


  // 맵 불러오기
  return (
    <div className='map'>
      <Map
        center={{ lat: accidents[0].la_crd, lng: accidents[0].lo_crd }} // 지도의 중심 좌표
        style={{ width: "800px", height: "600px" }}                     // 지도 크기
        level={10}                                                      // 지도 확대 레벨
      >
        <MarkerClusterer averageCenter enableDefaultStyles>
        {mapInfoWindows}
        </MarkerClusterer>
      </Map>
    </div>
  )
}