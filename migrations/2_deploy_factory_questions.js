// const factoryQuestion = artifacts.require("factoryQuestion");

// module.exports = function(deployer) {
//   deployer.deploy(factoryQuestion);
// };
var factoryQuestion = artifacts.require("factoryQuestion");
var Question = artifacts.require("Question");

module.exports = function(deployer) {
  deployer.deploy(factoryQuestion).then(function(){
        return deployer.deploy(Question,factoryQuestion.address,"Solc Error","Version Not working","Soldity")
});
}