import React, { useState } from 'react';
import Klip from '../api/Klip';
import { request, getResult } from 'klip-sdk';
import axios from 'axios';
import config from '../config';
function KlipTest() {
  const [address, setAddress] = useState(null);
  const [result, setResult] = useState(null); 
  const [ready_auth, setReady_auth] = useState(false);
  const [requestKey, setRequestKey] = useState(null);
  const klip_obj = new Klip()
  return (
    <div>
        <button onClick={async()=>{
          const req = await klip_obj.prepare_auth()
          alert("req: "+req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          setRequestKey(req)
          setReady_auth(true)
        }}>Auth 버튼</button>
        {
          ready_auth ? (<button onClick={
            async()=>{
            const real_res = await getResult(requestKey)
            alert("AUTH real result: "+JSON.stringify(real_res))
            if(real_res.status === "prepared"){
              alert("Error Occured! 다시 인증해주세요.")
            }else{
              setAddress(real_res.result.klaytn_address)
              setResult(real_res.result.status)
              window.Storage.address = address
            }
            setReady_auth(false);
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
          const req = await klip_obj.prepare_sendKlay(config.testAddress, '1')
          alert(req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          setTimeout(()=>null, 5000)
          const res = await getResult(req)
          alert("SEND KLAY real result: "+JSON.stringify(res))
        }}>SendKlay 버튼</button><br/>
        <button onClick={async()=>{
          const abi = "{\"constant\": true,\"inputs\": [{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\": \"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}"
          const param = "[\"1\"]"
          const req = await klip_obj.prepare_executeContract(config.testContractAddress, abi, param)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          const res = await getResult(req)
          alert("EXECUTECONTRACT real result: "+JSON.stringify(res))
        }}>ExecuteContract 버튼</button><br/>
        <button onClick={async()=>{
          const res = await klip_obj.prepare_auth_axios()
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
                  alert(`[Result] ${JSON.stringify(res.data.result)}`);
                  clearInterval(timerId);
                }
              });
          }, 1000);
          timerId();
        }}>TEST</button><br/>
        <button onClick={async()=>{
          const req = await klip_obj.prepare_auth_axios()
          alert(JSON.stringify(req))
          request(req.data.request_key, ()=> alert('모바일 환경에서 실행하세요.'))
          const res = await getResult(req.data.request_key)
          alert("EXECUTECONTRACT real result: "+JSON.stringify(res))
        }}>Auth 버튼 (Axios)</button><br/><button onClick={async()=>{
          const req = await klip_obj.prepare_sendKlay_axios(config.testAddress,'100')
          alert(req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          const res = await getResult(req)
          alert("EXECUTECONTRACT real result: "+JSON.stringify(res))
        }}>SendKlay 버튼 (Axios)</button><br/><button onClick={async()=>{
          const req = await klip_obj.prepare_executeContract_axios(config.testContractAddress, "{\"constant\": true,\"inputs\": [{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\": \"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}", "[\"1\"]")
          alert(req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          const res = await getResult(req)
          alert("EXECUTECONTRACT real result: "+JSON.stringify(res))
        }}>ExecuteContract 버튼 (Axios)</button><br/>
        <button onClick={async()=>{
          const res = await klip_obj.prepare_auth_axios()
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
                  alert(`[Result] ${JSON.stringify(res.data.result)}`);
                  window.sessionStorage.setItem('walletAddress', res.data.result.klaytn_address)
                  clearInterval(timerId);
                }
              });
          }, 1000);
        }}>Auth 버튼 ( Axios, sessionStorage에 저장 )</button><br/>
        {
          window.sessionStorage.walletAddress ? (<span>주소는 {window.sessionStorage.walletAddress}</span>) : (<span/>)
        }
    </div>
  );
}

export default KlipTest;
