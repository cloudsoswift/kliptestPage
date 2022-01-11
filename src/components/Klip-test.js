import React, { useState } from 'react';
import { prepare, request, getResult } from 'klip-sdk'
import axios from 'axios';
function KlipTest() {
  const [address, setAddress] = useState(null);
  const [result, setResult] = useState(null); 
  const [ready, setReady] = useState(false);
  const [requestKey, setRequestKey] = useState(null);
  const prepare_auth  = async () => {
      const bappName = 'Test BApp'
      const successLink = 'https://www.naver.com'
      const failLink = ''
      let _request_key = null
      const res = await prepare.auth({ bappName, successLink, failLink }) 
      if(res.err){
          alert("Auth_Error Occured! : " + res.err)
      } else if (res.request_key){
          _request_key = res.request_key
      }
      return _request_key
  }
  const prepare_sendKlay = async () => {
      const bappName = 'Test BApp'
      const from = ''
      const to = '0x75f58bc747972aa0f4fd189c0045510e178b8e2c'
      const amount = '1'
      const successLink = ''
      const failLink = ''
      let _request_key = null
      const res = await prepare.sendKLAY({ bappName, from, to, amount, successLink, failLink })
      if (res.err) {
          console.error("SendKlay_Error Occured! : " + res.err)
      } else if (res.request_key){
          _request_key = res.request_key
      }
      return _request_key
  }
  const prepare_executeContract = async () => {
      const bappName = 'Test BApp'
      const from = ''
      const to = '0x3ac6f8700f2610fc72261d3dc225d8e47748dfae'
      const value = '0'
      const abi = "{\"constant\": true,\"inputs\": [{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\": \"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}"
      const params = "[\"1\"]"
      const successLink = ''
      const failLink = ''
      let _request_key = null
      const res = await prepare.executeContract({ bappName, from, to, value, abi, params, successLink, failLink })
      if (res.err) {
        alert("executeContract_Error Occured! : " + res.err)
      } else if (res.request_key) {
        _request_key = res.request_key
      }
      return _request_key
  }
  return (
    <div>
        <button onClick={async()=>{
          const req = await prepare_auth()
          alert("req: "+req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          setRequestKey(req)
          setReady(true)
        }}>Auth 버튼</button>
        {
          ready ? (<button onClick={
            async()=>{
            const real_res = await getResult(requestKey)
            alert("AUTH real result: "+JSON.stringify(real_res))
            setAddress(real_res.result.klaytn_address)
            setResult(real_res.result.status)
          }}>확인</button>) : (<span/>)
        }
        {
          address ? (<span>Address : {address}<br/></span>) : (<span/>)
        }
        {
          result ? (<span>Result: {result}<br/></span>) : (<span/>)
        }
        <br/>
        <button onClick={async()=>{
          const req = await prepare_sendKlay()
          alert(req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          setTimeout(()=>null, 5000)
          const res = await getResult(req)
          alert("SEND KLAY real result: "+JSON.stringify(res))
        }}>SendKlay 버튼</button><br/>
        <button onClick={async()=>{
          const req = await prepare_executeContract()
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          const res = await getResult(req)
          alert("EXECUTECONTRACT real result: "+JSON.stringify(res))
        }}>ExecuteContract 버튼</button><br/>
        <button onClick={async()=>{
          const res = await axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare',{
            bapp: {
              name: "My BApp",
            },
            type: "auth"
          })
          const link = "kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key="+res.data.request_key
          window.location.assign(link)
          let timerId = setInterval(() => {
            axios
              .get(
                `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${res.data.request_key}`
              )
              .then((res) => {
                if (res.data.result) {
                  console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                  clearInterval(timerId);
                }
              });
          }, 1000);
        }}>TEST</button>
    </div>
  );
}

export default KlipTest;
