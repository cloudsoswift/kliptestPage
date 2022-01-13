import React, { useState, useEffect, useRef } from 'react';
function TimeTest() {
    let [isDday, setIsDday] = useState(false); //디데이 이후면 true, 이전이면 false
    var minting_day = new Date(2021,12,7,15,26,0); //일단 임의의 값 넣었음,  할때 원하는 달 -1 해야한데영
    //var [nowDate, setNowDate] = useState(new Date()); //현재 시간
    
    //let [day, changeDay] = useState("0");
    //let [hour, changeHour] = useState("00");
    //let [min, changeMin] = useState("00");
    //let [sec, changeSec] = useState("00");
    //let [nftAmount, changeNftAmount] = useState(0);

    const TimeTest = () => {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', window.location.href.toString(), false);
        xmlHttp.setRequestHeader("Content-Type", "text/html");
        xmlHttp.send('');
        return new Date(xmlHttp.getResponseHeader("Date"));
    }
    /*useEffect(() => {
        setNowDate(TimeTest())
        if(nowDate.getTime()>minting_day.getTime()){ //3번시점
            setIsDday(true);
        }
        console.log(nowDate)
    });*/
    const [count, setCount] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    //const [selectedDate, setSelectedDate] = useState(new Date());
    const savedCallback = useRef();

    const callback = () => {
      setCount(count + 1);
      setCurrentDate(TimeTest());
      if(currentDate>minting_day){
        setIsDday(true);
      } else {
        setIsDday(false);
      }
    }
    useEffect(()=>{
      savedCallback.current = callback;
    })
    
    useEffect(()=>{
      const tick = () => {
        savedCallback.current();
      }
      const timer = setInterval(tick, 1000);
      return ()=>clearInterval(timer)
    }, []);

    const timeLeft = (differ) => {
      return {
        days: Math.floor(differ / (1000 * 60 * 60 * 24)),
        hours:Math.floor((differ / (1000 * 60 * 60)) % 24),
        minutes:Math.floor((differ / 1000 / 60) % 60),
        seconds:Math.floor((differ / 1000) % 60)
      }
    }
  return (
    <div>
      <span>{String(currentDate)}</span><br/>
      <span>{String(count)}</span><br/>
      <span>{String(isDday)}</span><br/>
      <span>{String(minting_day)}</span><br/>
      <span>{JSON.stringify(timeLeft(minting_day-currentDate))}</span><br/>
      <input type="datetime-local"></input><br/>
      {
        window.localStorage.address ? (<span>주소는 {window.localStorage.address}</span>) : (<span></span>)
      }
    </div>
  );
}

export default TimeTest;
