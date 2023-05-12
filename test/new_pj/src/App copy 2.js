
// import "./App.css";
// import { createContext, useContext, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';


// function App() {
//   return <Snippet />;
// }

// export default App;

// // 메인 컴포넌트 
// function Snippet() {
//   return (
//     <Router>
//       <div className="main">
//         <nav className="container">
//         <div className="main-image"/>
//           <div className="xLine menu-stl">
//             <div className="item fw">
//               <Link to="/seoul">서울</Link>
//             </div>
//             <div className="item fw">
//               <Link to="/inchoen">인천</Link>
//             </div>
//             <div className="item fw">
//               <Link to="/busan">부산</Link>
//             </div>
//           </div>
//         </nav>
//       </div>

//       <div className="container">
//         <Routes>
//           <Route path="/seoul" element={<Seoul />} />
//           <Route path="/seoul1" element={<Seoul1 />} />
//           <Route path="/seoul2" element={<Seoul2 />} />

//           <Route path="/inchoen" element={<Incheon />} />
//           <Route path="/inchoen1" element={<Incheon1 />} />
//           <Route path="/inchoen2" element={<Incheon2 />} />

//           <Route path="/busan" element={<Busan />} />
//           <Route path="/busan1" element={<Busan1 />} />
//           <Route path="/busan2" element={<Busan2 />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// // 서울
// function Seoul() {
//   return (
//     <>
//       <div className="main">
//         <div className="container">
//           <div className="xLine">
//             <h1>서울</h1>
//             <nav>
//               <div>
//                 <Link to="/seoul1">1지역</Link>
//               </div>
//               <div>
//                 <Link to="/seoul2">2지역</Link>
//               </div>
//             </nav>
//           </div>
//         </div>

//       </div>
//     </>

//   )
// }
// function Seoul1() {
//   return (
//     <>
//     <h1>감자</h1>
//     </>
//   )
// }
// function Seoul2() {
//   return (
//     <>
//     <h1>고구마</h1>
//     </>
//   )
// }

// // 인천
// function Incheon() {
//   return (
//     <>
//       <h1>인천</h1>
//       <nav>
//         <div>
//           <Link to="/inchoen1">1지역</Link>
//         </div>
//         <div>
//           <Link to="/inchoen2">2지역</Link>
//         </div>
//       </nav>
//     </>
//   )
// }

// function Incheon1() {
//   return (
//     <>
//       <h1>인천1</h1>
//     </>
//   )
// }
// function Incheon2() {
//   return (
//     <>
//       <h1>인천2</h1>
//     </>
//   )
// }

// // 부산
// function Busan() {
//   return (
//     <>
//       <h1>부산</h1>
//       <nav>
//         <div>
//           <Link to="/busan1">1지역</Link>
//         </div>
//         <div>
//           <Link to="/busan2">2지역</Link>
//         </div>
//       </nav>
//     </>
//   )
// }
// function Busan1() {
//   return (
//     <>
//       <h1>부산1</h1>
//     </>
//   )
// }

// function Busan2() {
//   return (
//     <>
//       <h1>부산2</h1>
//     </>
//   )
// }

// // 게시물 상세보기
// function Busans() {
//   //  useParams: url의 매개변수에 접근할 수 있다
//   const { busanId } = useParams();

//   return (
//     <>
//       <h1>Title</h1>
//       <p>{busanId}</p>
//     </>
//   )
// }

// // 404 페이지
// function NotFound() {
//   return <h1>404 NotFound</h1>
// }