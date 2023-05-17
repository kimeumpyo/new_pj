import "./App.css";
import { useEffect, useState } from "react";

// API 자료 URL
export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
// API 인증키
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

  const years = [2019, 2020, 2021];

function App() {
  const [datas, setData] = useState(null);

  const [year, setYear] = useState(2019)

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

  console.log(datas);

  const arr = datas.response.body.items;

  const r = arr.filter(item => {
    if (item.year == year) {
      return item;
    }
  })

  console.log("year:", year);
  console.log(r.length);
  console.log(r);

  return (
    <>
      <h1>App</h1>

      {years.map(year => (
        <button onClick={() => setYear(year)}>
          {year}
        </button>  
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
