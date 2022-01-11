import { prepare } from 'klip-sdk'
import axios from 'axios'
import config from '../config'
export default class Klip{
    prepare_auth  = async () => {
        const bappName = config.BappName
        const successLink = ''
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
    prepare_sendKlay = async (to, amount) => {
        const bappName = config.BappName
        const from = ''
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
    prepare_executeContract = async (to, abi, params) => {
        const bappName = config.BappName
        const from = ''
        //const to = '0x3ac6f8700f2610fc72261d3dc225d8e47748dfae'
        const value = '0'
        //const abi = "{\"constant\": true,\"inputs\": [{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\": \"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}"
        //const params = "[\"1\"]"
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

    prepare_auth_axios = async() => {
        return await axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare',{
            bapp: {
              name: config.BappName,
            },
            type: "auth"
          })
    }
    prepare_sendKlay_axios = async(to, amount) => {
        return await axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare',{
            transaction: {
                from: "", // optional
                to,
                amount
            },
            type: "auth"
          })
    }
    prepare_executeContract_axios = async(to, abi, params) => {
        return await axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare',{
        "transaction": {
            from: "", // optional
            to, // contract address
            value: "1000000000000000000", // 단위는 peb. 1 KLAY
            abi,
            params
            }
        })
    }
}