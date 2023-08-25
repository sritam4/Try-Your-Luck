const date=new Date();
const currsec=date.getSeconds();
const currmin=date.getMinutes();
const currhour=date.getHours();
const currdate=date.getDate()<10? "0"+date.getDate() : date.getDate();
const currmonth=date.getMonth()<10? "0"+date.getMonth() : date.getMonth();
const curryear=date.getFullYear();

let sec;
if(currmin%3==0){
  sec=120+(60-currsec);
}
else if((currmin+2)%3==0){
  sec=60+(60-currsec);
}
else{
  sec=0+(60-currsec);
}

const quantumDate=curryear.toString()+ currmonth.toString()+ currdate.toString();
const quantumPeriod=(Math.floor(((currhour*60)+currmin)/3)+1);

// console.log(Quantum);

const quantumId=["Q1","Q2","Q3","Q4","Q5","Q6"];
const colorId=["C1","C2","C3","C4","C5","C6"];
const numberId=["N1","N2","N3","N4","N5","N6"];
const colourboxId=["B1","B2","B3","B4","B5","B6"];

const Q1=document.getElementById("Q1");
const N1=document.getElementById("N1");
const C1=document.getElementById("C1");

let resultArray=[];
let string;
// console.log(resultArray); for debugging

let quantumArray=[];
let quantumString;
// console.log(quantumArray);  for debugging

let userBalance=0;
let userAmount;
let userColor;
let isChoosed =false;
let recordArray=[];


document.getElementById("recharge-button").addEventListener("click",recharge);
document.getElementById("redbox").addEventListener("click",userInputRed);
document.getElementById("bluebox").addEventListener("click",userInputBlue);
document.getElementById("greenbox").addEventListener("click",userInputGreen);

let numbers=document.querySelectorAll(".number-box");
numbers=Array.from(numbers).forEach((element)=>{
  element.addEventListener("click",Unavailable);
});

setInterval(Timer,1000);
update();
getPersiveBalance();

if(userBalance==null){
  document.getElementById("Balance").innerHTML="₹ "+"00.00";
}
else{
  document.getElementById("Balance").innerHTML="₹ "+userBalance;
  // console.log(userBalance)
}

updateMyRecord();

// script for draggable button------------------------
$('.floating-button').draggable();

document.querySelector(".floating-button").addEventListener("click",()=>{
  alert("Game Rules \n 1)Recharge your wallet By clicking the recharge button.\n 2) You can Choose Colour Or Number according to your choice.\n 3) Now Bet the amount from your balance for the next Quantum. \n In case of Colour.\n 4) If your prediction is correct Your bet amount will be DOUBLED.\n 5) If your prediction is incorrect you will LOSE the Bet amount. \n In case of Number.\n 6) If your prediction is correct Your bet amount will be 10X.\n 7) If your prediction is incorrect you will LOSE the Bet amount. \n 8)Though it is not the real money There is NO chance of Monetary Loss.")
})

// ----------------------------functions----------------------------------------

function Timer(){
  // console.log("timer called"); for debugging
  let min=Math.floor(sec/60);
  let newsec = sec%60>9? sec%60:"0"+sec%60;
  // console.log("0"+min+":"+newsec);
  document.getElementById("Timer").innerHTML="0"+min+":"+newsec;
  sec--;
  if(sec==0){ //refreshing the page for good syncing..
    result();
    reload();
  }
} 

function reload(){
  location.reload(true);
}


function result(){
  //storing the outputnum in the local storage
  let randomnum=Math.floor(Math.random()*100);
  let outputNum= Math.floor(randomnum/10);
  resultArray=Array.from(resultArray);
  let length=resultArray.unshift(outputNum);
  // console.log(resultArray); //for debugging
  if(length>6){
    length=resultArray.pop();
  }
  persiveresultArray();
  
  // storing the Quantum period in local storage
  const Quantum= quantumDate+quantumPeriod.toString();
  quantumArray=Array.from(quantumArray);
  let quantumLength= quantumArray.unshift(Quantum);
  // console.log(quantumArray); //for debugging
  if(quantumLength>6){
    quantumLength= quantumArray.pop();
  }
  persivequantumArray();

  getPersiveisChoosed();
  if(isChoosed){
  console.log("winloss called");
  winLoss();
    
  isChoosed=false;
  persiveisChoosed();

  }
}

function update(){
  // fetching the current Result
  getpersiveresultArray();
  if(resultArray==null){
    console.log(resultArray);
    resultArray="start";
    persiveresultArray();
  }
  //fetching the current Quantum
  getpersivequantumArray();
  if(quantumArray==null){
    console.log(quantumArray);
    quantumArray="start";
    persivequantumArray();
  }
  
  //updating the Quantum section of RESULT
  console.log();
  quantumId.forEach((element,index)=>{
    document.getElementById(element).innerHTML=quantumArray[index];
  })

  //updating the Number section of the RESULT
  numberId.forEach((element,index)=>{
    document.getElementById(element).innerHTML=resultArray[index];
    document.getElementById(element).style.color=(resultArray[index]%2==0)?"red":"green";
  })

  //updating the colour section of the RESULT
  colorId.forEach((element,index) => {
    if(resultArray[index]%2==0){
      document.getElementById(element).style.backgroundColor="red";
      if((resultArray[index]==0)){
        let halfColourResult=document.createElement("div");
        halfColourResult.classList.add("Colour-data");
        document.getElementById(element).parentElement.appendChild(halfColourResult);
      }
    }
    else{
      document.getElementById(element).style.backgroundColor="green";
      if((resultArray[index]==5)){
        let halfColourResult=document.createElement("div");
        halfColourResult.classList.add("Colour-data");
        document.getElementById(element).parentElement.appendChild(halfColourResult);
      }
    }
  }); 
}
function recharge(){
  let amt=prompt("Enter Amount to Recharge:");
  // amt=Number.parseInt(amt);
  if(amt==null){
    getPersiveBalance();
  }
  else{
    amt=parseInt(amt);
    userBalance=userBalance+amt;
    persiveBalance();
    document.getElementById("Balance").innerHTML="₹ "+userBalance;
  }
}

// =====================================functions ====================================================
function persiveresultArray(){
  string=JSON.stringify(resultArray);
  localStorage.setItem("array",string);
}

function getpersiveresultArray(){
  resultArray = localStorage.getItem("array"); //getting array from local storage
  resultArray = JSON.parse(resultArray); //converting to array type
  // console.log(resultArray);  for debugging
}

function persivequantumArray(){
  quantumString=JSON.stringify(quantumArray);
  localStorage.setItem("quantum",quantumString);
}

function getpersivequantumArray(){
  quantumArray= localStorage.getItem("quantum");
  quantumArray=JSON.parse(quantumArray);
  // console.log(quantumArray);  for debugging
}

function persiveBalance(){
  let usrBlns=JSON.stringify(userBalance);
  localStorage.setItem("UB",usrBlns);
}
function getPersiveBalance(){
  userBalance=localStorage.getItem("UB");
  userBalance=JSON.parse(userBalance);
}

function persiveValues(){
  let usrAmt=JSON.stringify(userAmount);
  localStorage.setItem("UM",usrAmt);
  let usrClr=JSON.stringify(userColor);
  localStorage.setItem("UC",usrClr);
  // console.log("Persivevalues called"); for debugging
}

function getPersiveValues(){
  userAmount=localStorage.getItem("UM");
  userAmount=JSON.parse(userAmount);
  userColor=localStorage.getItem("UC");
  userColor=JSON.parse(userColor);
  // console.log(userBalance);  
  // console.log(userColor);  for debugging
  // console.log(userAmount);  for debugging
}

function persiveisChoosed(){
  let stringisChoosed=JSON.stringify(isChoosed);
  localStorage.setItem("ischoosed",stringisChoosed);
}

function getPersiveisChoosed(){
  isChoosed=localStorage.getItem("ischoosed");
  isChoosed=JSON.parse(isChoosed);
}

function persiveRecord(){
  let stringRecord=JSON.stringify(recordArray);
  localStorage.setItem("Rarray",stringRecord);
  // console.log(recordArray);
}

function getPersiveRecord(){
  recordArray=localStorage.getItem("Rarray");
  recordArray=JSON.parse(recordArray);
  // console.log(recordArray);
}

function userInputRed(){
  userColor="red";
  userAmount=prompt("Enter amount for RED: ");
  if(userAmount){
    userAmount=parseInt(userAmount);
    if(userAmount>userBalance){
      alert("Insufficient Balance");
    }
    else{
      console.log(userAmount);
      console.log(userColor);
      userBalance=userBalance-userAmount;
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
      isChoosed=true;
      persiveBalance();
      persiveisChoosed();
      persiveValues();
    }
  }
}
function userInputBlue(){
  userColor="blue";
  userAmount=prompt("Enter amountfor BLUE: ");
  if(userAmount){
    userAmount=parseInt(userAmount);
    if(userAmount>userBalance){
      alert("Insufficient Balance");
    }
    else{
      console.log(userColor);
      userBalance=userBalance-userAmount;
      console.log(userAmount);
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
      isChoosed=true;
      persiveBalance();
      persiveisChoosed();
      persiveValues();
    }
  }
}
function userInputGreen(){
  userColor="green";
  userAmount=prompt("Enter amount for GREEN: ");
  if(userAmount){
    userAmount=parseInt(userAmount);
    if(userAmount>userBalance){
      alert("Insufficient Balance");
    }
    else{
      console.log(userAmount);
      console.log(userColor);
      userBalance=userBalance-userAmount;
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
      isChoosed=true;
      persiveBalance();
      persiveisChoosed();
      persiveValues();
    }
  }
}

function win(){
  recordArray.unshift(quantumArray[0]);
  recordArray.unshift("success");
  recordArray.unshift("green");
  recordArray.unshift(userAmount*2);
  let lengthofrecordArray=recordArray.length;
  if(lengthofrecordArray>=6){
    recordArray=recordArray.slice(0,-3);
  }
  userBalance=userBalance+(userAmount*2);
  persiveBalance();
  persiveRecord();

}

function Loss(){
  recordArray.unshift(quantumArray[0]);
  recordArray.unshift("Loss");
  recordArray.unshift("red");
  recordArray.unshift(-userAmount);
  let lengthofrecordArray=recordArray.length;
  if(lengthofrecordArray>=6){
    recordArray=recordArray.slice(0,-3);
  }
  persiveRecord();
}

function winLoss(){
  getPersiveValues();
  
  if(resultArray[0]%2==0){
    userColor=="red"?win():Loss();
    if(resultArray[0]==0){
      userColor=="blue"?win():Loss();
    }
  }
  else{
    userColor=="green"?win():Loss();
    if(resultArray[0]==5){
      userColor=="blue"?win():Loss();
    }
  }
}

function updateMyRecord(){
  // console.log(recordArray);
  getPersiveRecord();
  if(recordArray==null){
    recordArray=[0,"blue","Nutral","Not sure"];
    persiveRecord();
  }
  document.getElementById("A1").innerHTML=recordArray[3];
  document.getElementById("R1").innerHTML=recordArray[2];
  document.getElementById("R1").style.color=recordArray[1];
  document.getElementById("P1").style.color=recordArray[1];
  document.getElementById("P1").innerHTML=recordArray[0];
  // console.log(recordArray);
}

function Unavailable(){
  alert("Currently Unavailable!!!\n Wait for next update Or Play with Red, Blue and Green.");
}