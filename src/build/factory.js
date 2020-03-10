import web3 from './web3';
import factoryQuestion from '../abis/factoryQuestion.json';

// export default add => {
//   return new web3.eth.Contract(factoryQuestion.abi, factoryQuestion.networks[5777].address);
// };

const instance = new web3.eth.Contract(
  factoryQuestion.abi,
  factoryQuestion.networks[5777].address
);

export default instance;