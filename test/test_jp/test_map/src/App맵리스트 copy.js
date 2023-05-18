import "./App.css";
import { useEffect, useState } from "react";

export const API_URL =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList";
export const API_KEY =
  "GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D";

const years = [2017, 2018, 2019, 2020, 2021];
function App() {
  const [year, setYear] = useState(2019);
  const [datass, setData] = useState(null);
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
      const response = await fetch(apiURL);
      const datas = await response.json();
      console.log("datas", datas);
      setData(datas)

      const map_data = datas.response.body.items.map(item =>
        [Number(item.dmX), Number(item.dmY), item.addr]
      ) 
      const arr = datas.response.body.items;
      
      const year_mark = arr.filter((item) => {
        if (item.year == year) {
          return item;
        }
      });
      const year_marks = year_mark.map((item) => {
        return [Number(item.dmX), Number(item.dmY), item.addr];
      });

      console.log("map_data", map_data)
      drawMap(map_data)
    }
    getData();
    function drawMap(map_data) {
      const my_script = new_script(
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e7f28da5ec5723a01344341099af1f5e&libraries=clusterer"
      ); 
      my_script.then(() => {
        const kakao = window["kakao"];
        kakao.maps.load(() => {
          const mapContainer = document.getElementById("map"),
            mapOption = {
              center: new kakao.maps.LatLng(37.5608, 126.9826),
              level: 5,
            };
          const map = new kakao.maps.Map(mapContainer, mapOption);
          const clusterer = new kakao.maps.MarkerClusterer({
            map: map, 
            averageCenter: true,
            minLevel: 10, 
          });
          const markers = [];
          for (var i = 0; i < map_data.length; i++) {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(map_data[i][0], map_data[i][1]),
              map: map,
            });
            marker.setMap(map);
            const infowindow = new kakao.maps.InfoWindow({
              content: map_data[i][2],
            });
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
          clusterer.addMarkers(markers);
          function makeOverListener(map, marker, infowindow) {
            return function () {
              infowindow.open(map, marker);
            };
          }
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
  const arr = datass.response.body.items;
  const r = arr.filter((item) => {
    if (item.year == year) {
      return item;
    }
  });
  const rs = r.map((item) => {
    return [Number(item.dmX), Number(item.dmY), item.addr];
  });
  return (
    <>
      <div className="App">
        <div id="map" className="map" />
      </div>

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
