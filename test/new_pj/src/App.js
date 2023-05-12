
import "./App.css";
import { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, NavLink, Map,  } from 'react-router-dom';


function App() {
  return <Snippet />;
}

export default App;


// 메인 컴포넌트 
function Snippet() {

  return (
    <Router>
      {/* header */}
      <header>
        <div className="header_flex">
          <a href="#" className="header_a">&#9776;</a>
          <h1 className="header_h1">미세먼지</h1>
        </div>
      </header>

      {/* side bar */}
      <nav className="side_nav">
        <div className="side_div">
          <h2 className="side_h2">
            미세먼지
          </h2>
        </div>
        <ul>
          <li>
            <Link className="Link" to="/seoul">서울</Link>
          </li>
          <li>
            <Link className="Link" to="/inchoen">인천</Link>
          </li>
          <li>
            <Link className="Link" to="/daegu">대구</Link>
          </li>
          <li>
            <Link className="Link" to="/busan">부산</Link>
          </li>
        </ul>
      </nav>

      {/* main */}
      <main>
        <h1 className="main_h1">지역별</h1>

        {/* SHOW */}
        <div id="show">
          <h2 className="show_h2">미세먼지</h2>
          <hr className="show_hr"></hr>
        </div>

        {/* kakaomap */}
        <NavLink to="/kakaoapp"><div className="kakaoApp">
      <div id="map" className="map"/>
    </div></NavLink>
        
               
       
        <div className="show_images">
          <div className="image_p">
              <NavLink className="show_image " to="/seoul">
                <img className="image_size" src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" ></img>
              </NavLink>
              <NavLink className="show_image " to="inchoen">
                <img className="image_size" src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" ></img>
              </NavLink>
          </div>
          <div className="image_p">
              <NavLink className="show_image " to="/daegu">
                <img className="image_size" src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" ></img>
              </NavLink>
              <NavLink className="show_image " to="/busan">
                <img className="image_size" src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" ></img>
              </NavLink>
          </div>

        </div>
      </main>    

      <div className="container">
        <Routes>
          <Route path="/kakaoapp" element={<KakaoApp />} />

          <Route path="/seoul" element={<Seoul />} />
          <Route path="/seoul1" element={<Seoul1 />} />
          <Route path="/seoul2" element={<Seoul2 />} />

          <Route path="/inchoen" element={<Incheon />} />
          <Route path="/inchoen1" element={<Incheon1 />} />
          <Route path="/inchoen2" element={<Incheon2 />} />

          <Route path="/daegu" element={<Daegu />} />
          <Route path="/daegu1" element={<Daegu1 />} />
          <Route path="/daegu2" element={<Daegu2 />} />

          <Route path="/busan" element={<Busan />} />
          <Route path="/busan1" element={<Busan1 />} />
          <Route path="/busan2" element={<Busan2 />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
// 카카오맵

function KakaoApp() {
  
  //스크립트 파일 읽어오기
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
    //카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e7f28da5ec5723a01344341099af1f5e');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      console.log('script loaded!!!');  
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
          level: 3 
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
      });   
    }); 
  }, []);
}

// 서울
function Seoul() {
  return (
    <>
      <h1>서울</h1>
      <div className="container">
        <nav className="show_images">
          <div>
            <NavLink to="/seoul1">
              <img className="show_image" src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg" style={{ width: "300px" }}></img>
            </NavLink>
          </div>
          <div>
            <NavLink to="/seoul2">
              <img className="show_image" src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg" style={{ width: "300px" }}></img>
            </NavLink>
          </div>
        </nav>
      </div>
    </>

  )
}
function Seoul1() {
  return (
    <>
    <h1>감자</h1>
    </>
  )
}
function Seoul2() {
  return (
    <>
    <h1>고구마</h1>
    </>
  )
}

// 인천
function Incheon() {
  return (
    <>
      <h1>인천</h1>
      <nav>
        <div>
          <Link to="/inchoen1">1지역</Link>
        </div>
        <div>
          <Link to="/inchoen2">2지역</Link>
        </div>
      </nav>
    </>
  )
}

function Incheon1() {
  return (
    <>
      <h1>인천1</h1>
    </>
  )
}
function Incheon2() {
  return (
    <>
      <h1>인천2</h1>
    </>
  )
}
// 대구
function Daegu() {
  return (
    <>
      <h1>대구</h1>
      <nav>
        <div>
          <Link to="/daegu1">1지역</Link>
        </div>
        <div>
          <Link to="/daegu2">2지역</Link>
        </div>
      </nav>
    </>
  )
}
function Daegu1() {
  return (
    <>
      <h1>대구1</h1>
    </>
  )
}

function Daegu2() {
  return (
    <>
      <h1>대구2</h1>
    </>
  )
}

// 부산
function Busan() {
  return (
    <>
      <h1>부산</h1>
      <nav>
        <div>
          <Link to="/busan1">1지역</Link>
        </div>
        <div>
          <Link to="/busan2">2지역</Link>
        </div>
      </nav>
    </>
  )
}
function Busan1() {
  return (
    <>
      <h1>부산1</h1>
    </>
  )
}

function Busan2() {
  return (
    <>
      <h1>부산2</h1>
    </>
  )
}

// 404 페이지
function NotFound() {
  return <h1>404 NotFound</h1>
}

// ////////////////////////////////////

//   function fetchData(){
//     const DATA = {
//       username: "snoop_dogg",
//       image:"https://images.chosun.com/resizer/PpO6bWHMVG_AgS3UQkQBXhXaaVI=/350x350/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UD7SPBNDDZUWFUOLLANCSOF65U.jpg",
//       dio: "안녕 친구야"
//     }

//     // 2. 데이터를 사져오는데 2초가 걸린다고 가정
//     const promise = new Promise((res, rej)=>{
//       setTimeout(()=>{
//         res(DATA)
//       }, 2000)
//     })
//     return promise
//   }
//   // 3.
//   function Snippet(){

//     // 변수선언
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [profile, setProfile] = useState(null);

//     // 4. 비동기적으로 작동한다 (마지막에 실행)
//     useEffect(() => {

//       // 여기서 서버에 요청
//       fetchData()

//         // 요청 성공시 처리하는 메서드
//         .then(data => {
//           setProfile(data)
//         }) 

//         // 요청 실패시 처리하는 메서드
//         .catch(error => {
//           setError(error)
//         }) 

//         // 요청 성공여부와 상관없이 실행되는 메서드
//         .finally(() => {
//           setIsLoaded(true)
//         })
//     }, [])

//     // 5. error는 초기값 null
//     if(error){
//       return <p>failed to fetch</p>
//     }

//     // 6. isLoaded는 초기값 false
//     if (!isLoaded){
//       return <p>fetching profile...</p>
//     }

//     // 7.
//     return(
//       <>
//         <h1>Profile</h1>
//         <img
//         src={profile.image}
//         alt={profile.username}
//         style={{
//           width:'150px',
//           height:'150px',
//           objectFit:'cover',
//           borderRadius:'50%'
//         }}
//         />
//         <h3>{profile.username}</h3>
//         <p>{profile.dio}</p>
//       </>
//     )
//   }