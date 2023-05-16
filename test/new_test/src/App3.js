import './App.css';
import { useEffect, useState } from 'react';

// API 자료 URL
export const API_URL = 'http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo';
// API 인증키 
export const API_KEY = 'GzDJ%2BPjFKpdRSKy5jESta9ke4vnfZT%2BRjrLMCMJl08hDVAqIEWAzYyx3ILOJ0ilrDn3NaD8Ng8%2FagdzFkJNZ8g%3D%3D';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}?year=2020&pageNo=1&numOfRows=304&returnType=json&serviceKey=${API_KEY}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        console.log(response)

        setData(response)

        console.log(data);

        
        // const korosCreatedAtFed = kokos.filter(koro =>{
          
        //   // 방법1: 날짜 객체를 이용하는 경우
        //   // const month =  new Date(koro.createdAt).getMonth() + 1;
          
        //   // if(month === 2){
        //   //     return koro;
        //   //   }
            
        //   // 방법2: 문자열 그대로 사용하는 경우
        //    const month =  koro.createdAt.spilt('-')[1];
            
        //    if(month === '02'){
        //       return koro;
        //     }

        //     console.log("월",month);
        //   })
        //   console.log(korosCreatedAtFed);

      })
      
    }, [])

      if (!data) {
        return <p>로딩중...</p>
      }
    
      return (
        <>
          <h1>App</h1>
          <p>{data.response.body.items[0].dataDate}</p>
          <p>{data.response.body.items[0].districtName}</p>
        </>
      )
    }


export default App;