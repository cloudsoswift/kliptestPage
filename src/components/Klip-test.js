import React, { useState } from 'react';
import { prepare, request, getResult } from 'klip-sdk'
function KlipTest() {
  const [address, setAddress] = useState(null);
  const [result, setResult] = useState(null); 
  const prepare_auth  = async () => {
      const bappName = 'Test BApp'
      const successLink = 'https://www.naver.com'
      const failLink = ''
      let request_key = null
      const res = await prepare.auth({ bappName, successLink, failLink }) 
      if(res.err){
          alert("Auth_Error Occured! : " + res.err)
      } else if (res.request_key){
          request_key = res.request_key
      }
      return request_key
  }
  const prepare_sendKlay = async () => {
      const bappName = 'Test BApp'
      const from = ''
      const to = '0x75f58bc747972aa0f4fd189c0045510e178b8e2c'
      const amount = '1'
      const successLink = ''
      const failLink = ''
      let request_key = null
      const res = await prepare.sendKLAY({ bappName, from, to, amount, successLink, failLink })
      if (res.err) {
          console.error("SendKlay_Error Occured! : " + res.err)
      } else if (res.request_key){
          request_key = res.request_key
      }
      return request_key
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
      let request_key = null
      const res = await prepare.executeContract({ bappName, from, to, value, abi, params, successLink, failLink })
      if (res.err) {
        alert("executeContract_Error Occured! : " + res.err)
      } else if (res.request_key) {
        request_key = res.request_key
      }
      return request_key
  }
  return (
    <div>
        <button onClick={async()=>{
          const req = await prepare_auth()
          alert("req: "+req)
          request(req, ()=> alert('모바일 환경에서 실행하세요.'))
          setTimeout(async()=>{
            const real_res = await getResult(req)
            alert("AUTH real result: "+JSON.stringify(real_res))
            alert("주소:" + real_res.result.klaytn_address)
            setAddress(real_res.result.klaytn_address)
            alert("상태:" + real_res.status)
            setResult(real_res.result.status)
          },5000)
        }}>Auth 버튼</button>{
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
    </div>
  );
}

export default KlipTest;
