    pragma solidity ^0.5.6;
    //contract to handle multiple questions
    contract factoryQuestion{
        constructor() public payable{
            
        }
        address[] public askedQuestions;
        function askQuestion(string memory title,string memory description,string memory tag) public payable{
            //   address question = address(new Question(msg.value,msg.sender,title,description,tag));
            address newQuestion = address((new Question).value(msg.value)(msg.sender, title,description,tag));
            askedQuestions.push(newQuestion);
        }
        function getAskedQuestions() public view returns (address[] memory) {
            return askedQuestions;
        }
    }
    //Contract to handle a single Question
    contract Question{
        uint public ball;
        string  public questionTitle; 
        string  public questionDescription;
        uint public rewards;
        string  public questionTag;
        uint  public questionUpVote;
        uint  public questionDownVote;
        uint public answersCount;
        address public  questioner;
        int public ansIndex = -1;
        constructor( //Setting the default values
                    address questionCreator,
                    string memory title, 
                    string memory desc,
                    string memory tag
                   ) public payable{
            questioner = questionCreator;
            questionTitle = title;
            questionDescription = desc;
            rewards = address(this).balance;
            questionTag = tag;
            questionUpVote = 0;
            questionDownVote = 0;
            answersCount = 0;
           
        }
        struct Answer{
            string answer;
            address payable answerer;
            int answerIndex;
            uint answerUpVoteCount;
            uint answerDownVoteCount;
            uint reputationCount;
            bool accepted;
            mapping(address=>bool) upVoters;
            address payable [] upVotersArr;
            address payable []  downVotersArr;
            mapping(address=>bool) downVoters;
        }
        Answer[] public answers;// Collections of answers to a particular question
        modifier restricted{
            require(msg.sender==questioner);
            _;
        }
        //Function to answer to a particular question..
        function postAnswer(string memory answerDescription) public {
            answersCount ++;
            ansIndex++; 
            address payable [] memory  initialUpVotersArr;
            address payable [] memory initialdownVotersArr;
            Answer memory ans = Answer({
                answer : answerDescription,
                answerIndex : ansIndex,
                answerer : msg.sender,
                answerUpVoteCount:0,
                answerDownVoteCount : 0,
                accepted : false,
                upVotersArr:initialUpVotersArr,
                downVotersArr : initialdownVotersArr,
                reputationCount : 0
            });
            answers.push(ans);
        }
        //Upvote a particular answer
        function upVoteAnswer(uint index) public {
            Answer storage answer = answers[index];
            require(!answer.upVoters[msg.sender]); //modifier to validate upVoters, upVoter cannot upVote a same answer multiple times
            answer.answerUpVoteCount++;
            answer.upVotersArr.push(msg.sender);
            answer.upVoters[msg.sender]=true;
        }
        function downVoteAnswer(uint index) public { //Same actions for downvote 
            Answer storage answer = answers[index];
            require(!answer.downVoters[msg.sender]);
            answer.answerDownVoteCount++;
            answer.downVotersArr.push(msg.sender);
            answer.downVoters[msg.sender]=true;
        }
     
        
        //Function to accept a Answer as a accepted one.. can only performed by Quesitoner..
        function acceptAnswer(uint index) public restricted payable  returns(bool)  {
            Answer storage ans = answers[index];
             ans.accepted = true;
              if(ans.answerUpVoteCount==0)
                {
                    ans.answerer.transfer(address(this).balance);
                }
             else{
                    ans.answerer.transfer(address(this).balance*70/100);
                    //Remaining amt 
                    uint amtSharePerVoter;
                    amtSharePerVoter = address(this).balance / ans.answerUpVoteCount;
                    //Send to voters
                    for(uint upVotersCount=0; upVotersCount<ans.answerUpVoteCount;upVotersCount++)
                    {
                        ans.upVotersArr[upVotersCount].transfer(amtSharePerVoter);
                    }
               }
            return true;
        }
        //Get answes Length
        function getAnswersLength() public view returns (uint){
            return answers.length;
        }
       
    }