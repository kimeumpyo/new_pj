import "./App.css";
import { useEffect, useState } from "react";

// API 자료 URL
export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
// API 인증키
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

function App() {
  const [datas, setData] = useState(null);

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

  // console.log("year", datas.response.body.items.yaer);

  const all_mark = datas.response.body.items.map((item) => {
    return [Number(item.year), Number(item.dmX), Number(item.dmY), item.addr];
  });

  console.log(all_mark);

  

  

  // const locations = datas.response.body.items.map((item) => {
  //   return Number(item.year);

  // });

  console.log("확인", all_mark);

  // console.log(data.response.body.items[0]);

  // const datas = data.response.body.items.map(function(dododo){
  //     return <p>{dododo}</p>
  // })

  // const api_data = ["join", "dpdp", "dfdf"];

  // const api_datas = api_data.map(function (person) {
  //   return <p>{person}</p>;
  // });

  // if (!datas) {
  //   return <p>로딩중...</p>;
  // }

  return (
    <>
      <h1>App</h1>
      <p>{datas.response.body.items[0].year}</p>
      <p>{datas.response.body.items[0].dmX}</p>
      <p>{datas.response.body.items[0].dmY}</p>
      <p>{datas.response.body.items[0].addr}</p>
      {/* <div>{api_datas}</div> */}
    </>
  );
}

export default App;
