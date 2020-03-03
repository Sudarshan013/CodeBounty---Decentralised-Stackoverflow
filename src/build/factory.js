import web3 from './web3'
import FactoryQuestion from "../abis/factoryQuestion.json";

const networkId = web3.eth.net.getId();
console.log(networkId)
  export default networkId;
  