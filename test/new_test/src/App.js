import "./App.css";
import { useEffect, useState } from "react";

// API 자료 URL
export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
// API 인증키
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

// 년도
const years = [2017, 2018, 2019, 2020, 2021];

function App() {
  const [datas, setData] = useState(null);

  // 년도
  const [year, setYear] = useState(2019);

  // api의 자료를 가져올 변수를 선언한다
  // const [yaer, setyaer] = useState(yaers[0]);
  // const [dmX, setyaer] = useState(dmXs[0]);
  // const [dmY, setyaer] = useState(dmYs[0]);
  // const [addr, setyaer] = useState(addr[0]);

  useEffect(() => {
    const apiURL = `${API_URL}?addr=&sidoName=&pageNo=1&numOfRows=642&serviceKey=${API_KEY}&returnType=json`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setData(response);
      });
  }, []);

  if (!datas) {
    return <p>...</p>;
  }

  const all_mark = datas.response.body.items.map((item) => {
    return [Number(item.dmX), Number(item.dmY), item.addr];
  });

  // 년도 -> 아이템의 모든 데이터
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

  console.log("년도별좌표", rs);
  console.log("자료수", rs.length);

  // console.log("year:", year);
  // console.log(r.length);
  // console.log(r);

  console.log(all_mark);

  // console.log("확인", all_mark);

  return (
    <>
      <h1>App</h1>
      <p>{datas.response.body.items[0].year}</p>
      <p>{datas.response.body.items[0].dmX}</p>
      <p>{datas.response.body.items[0].dmY}</p>
      <p>{datas.response.body.items[0].addr}</p>
      {/* <div>{api_datas}</div> */}

      {years.map((year) => (
        <button onClick={() => setYear(year)}>{year}</button>
      ))}

      <ul>
        {r.map((item, index) => (
          <li key={index}>{item.addr}</li>
        ))}
      </ul>
    </>
  );
}

export default App;

////////////////////////
// import "./App.css";
// import { useEffect, useState } from "react";

// // API 자료 URL
// export const API_URL =
//   "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
// // API 인증키
// export const API_KEY =
//   "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

//   const years = [2019, 2020, 2021];

// function App() {
//   const [datas, setData] = useState(null);

//   const [year, setYear] = useState(2019)

//   useEffect(() => {
//     const apiURL = `${API_URL}?addr=&sidoName=&pageNo=1&numOfRows=642&serviceKey=${API_KEY}&returnType=json`;

//     fetch(apiURL)
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response);

//         setData(response);
//       });
//   }, []);

//   if (!datas) {
//     return <p>...</p>;
//   }

//   console.log(datas);

//   const arr = datas.response.body.items;

//   const r = arr.filter(item => {
//     if (item.year == year) {
//       return item;
//     }
//   })

//   console.log("year:", year);
//   console.log(r.length);
//   console.log(r);

//   return (
//     <>
//       <h1>App</h1>

//       {years.map(year => (
//         <button onClick={() => setYear(year)}>
//           {year}
//         </button>
//       ))}

//       <ul>
//         {r.map((item, index) => (
//           <li key={index}>{item.addr}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default App;
