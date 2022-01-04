import React, { useCallback } from 'react';
import { prepare, request, getResult, getCardList } from 'klip-sdk'
function KlipTest() {
  let request_key = null
  const prepare_auth  = async () => {
      const bappname = 'Test BApp'
      const successLink = 'https://www.google.com'
      const failLink = 'https://www.naver.com'
      const res = await prepare.auth({bappname, successLink, failLink})
      if(res.err){
          console.error("Auth_Error Occured!")
          alert("Auth_Error Occured!")
      } else if (res.request_key){
          request_key = res.request_key
          alert(request_key)
      }
  }
  const prepare_sendKlay = async () => {
      const bappname = 'Test BApp'
      const from = ''
      const to = ''
      const amount = '1'
      const successLink = ''
      const failLink = ''
      const res = await prepare.sendKLAY({ bappname, from, to, amount, successLink, failLink })
      if (res.err) {
          console.error("SendKlay_Error Occured!")
          alert("SendKlay_Error Occured!")
      } else if (res.request_key){
        request_key = res.request_key
        alert(request_key)
      }
  }
  const prepare_executeContract = async () => {
      const bappname = 'Test BApp'
      const from = ''
      const to = ''
      const value = ''
      const abi = ''
      const params = ''
      const successLink = ''
      const failLink = ''
      const res = await prepare.executeContract({ bappname, from, to, value, abi, params, successLink, failLink })
      if (res.err) {
        console.error("executeContract_Error Occured!")
        alert("executeContract_Error Occured!")
      } else if (res.request_key) {
        request_key = res.request_key
        alert(request_key)
      }
  }
  const OwnerAddress = process.env.REACT_APP_PUBLIC_KEY
  return (
    <div>
        <button onClick={prepare_auth}>Auth 버튼</button><br/>
        <button onClick={prepare_sendKlay}>SendKlay 버튼</button><br/>
        <button onClick={prepare_executeContract}>ExecuteContract 버튼</button><br/>
    </div>
  );
}

export default KlipTest;
