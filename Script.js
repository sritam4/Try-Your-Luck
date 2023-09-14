//Execution: variable declarations and Function calls
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
const currQuantum=quantumDate+(quantumPeriod).toString();
document.querySelector(".next-Quantum").innerHTML=currQuantum;

// console.log(Quantum);
//Arrays to store the results of RESULT section
const quantumId=["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10"];
const colorId=["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10"];
const numberId=["N1","N2","N3","N4","N5","N6","N7","N8","N9","N10"];

//Arrays to store the result of RECORD section
const R_QuantumId=["A1","A2","A3","A4","A5"];
const resultId=["R1","R2","R3","R4","R5"];
const profitId=["P1","P2","P3","P4","P5"];

let resultArray=[];
let resultString;

let quantumArray=[];
let quantumString;

let userBalance=0;
let useramt;
let userAmount=[];
let userColor=[];3
let isChoosed =false;
let recordQuantumArray=[];
let recordResultArray=[];
let recordProfitArray=[];


document.getElementById("recharge-button").addEventListener("click",recharge);
document.getElementById("redbox").addEventListener("click",userInputCol);
document.getElementById("bluebox").addEventListener("click",userInputCol);
document.getElementById("greenbox").addEventListener("click",userInputCol);

let number=document.querySelectorAll(".number-box");
// console.log(number);
number.forEach((element)=>{
  element.addEventListener("click",userInputNum);
})

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
  alert("Game Rules \n 1)Recharge your wallet By clicking the Recharge button.\n 2) You can Choose Colour Or Number according to your choice.\n 3) Now Bet the amount from your balance for the next Quantum. \n\n In case of Colour.\n 4) If your prediction is correct Your bet amount will be DOUBLED.\n 5) If your prediction is incorrect you will LOSE the Bet amount.\n\n In case of Half Colour \n 6) if you bet on a colour and Your Prediction is Half correct Your bet amount will be 1.5X.\n  7) If your prediction is incorrect you will LOSE the Bet amount. \n\n In case of Number.\n 8) If your prediction is correct Your bet amount will be 8.5X.\n 9) If your prediction is incorrect you will LOSE the Bet amount. \n\n 10) Bet BEFORE the Count Down goes below 30 second \n 11)Though it is not the real money There is NO chance of Monetary Loss.")
})





// ------------------------------------------ Main functions----------------------------------------

function Timer(){
  // console.log("timer called"); for debugging
  let min=Math.floor(sec/60);
  let newsec = sec%60>9? sec%60:"0"+sec%60;
  // console.log("0"+min+":"+newsec);
  document.getElementById("Timer").innerHTML="0"+min+":"+newsec;
  sec--;
  if(sec<30){
    fade();
  }
  if(sec==0){ //refreshing the page for good syncing..
    result();
    reload();
  }
  getPersiveisChoosed();
  if(isChoosed){
    waitValues();
  }
} 

function reload(){
  location.reload(true);
}


function result(){
  //storing the outputnum in the local storage
  let randomnum=Math.floor(Math.random()*100);
  let outputNum= Math.floor(randomnum/10);
  // let outputNum=4;
  resultArray=Array.from(resultArray);
  let length=resultArray.unshift(outputNum);
  // console.log(resultArray); //for debugging
  if(length>10){
    length=resultArray.pop();
  }
  persiveresultArray();
  
  // storing the Quantum period in local storage
  const Quantum= quantumDate+quantumPeriod.toString();
  quantumArray=Array.from(quantumArray);
  let quantumLength= quantumArray.unshift(Quantum);
  // console.log(quantumArray); //for debugging
  if(quantumLength>10){
    quantumLength= quantumArray.pop();
  }
  persivequantumArray();

  getPersiveisChoosed();
  if(isChoosed){
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
    resultArray=[0,1,2,3,4,5,6,7,8,9];
    persiveresultArray();
  }
  //fetching the current Quantum
  getpersivequantumArray();
  if(quantumArray==null){
    console.log(quantumArray);
    quantumArray="START-WAIT";
    persivequantumArray();
  }
  
  //updating the Quantum section of RESULT
  // console.log();
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
  amt=parseInt(amt);
  if(amt){
    if(amt>=100000){
      alert("RECHARGE SMALL AMOUNT !!!!!!!!!\n ");
    }
    else{
      amt=parseInt(amt);
      userBalance=userBalance+amt;
      persiveBalance();
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
    }
  }
}

function fade(){
  document.querySelectorAll(".color-box").forEach((element)=>{
    element.style.backgroundColor="rgb(200, 200, 200)";
    element.style.color="rgb(129, 129, 132)";
    element.removeEventListener("click",userInputCol);
  })
  document.querySelectorAll(".number-box").forEach((element)=>{
    element.style.backgroundColor="rgb(200, 200, 200)";
    element.style.color="rgb(129, 129, 132)";
    element.removeEventListener("click",userInputNum);
  })
  document.querySelectorAll(".half").forEach((element)=>{
    element.style.backgroundColor="transparent";
  })
}

function userInputCol(C){
  let temp=C.target.innerText;
  if(temp=="Join Green"){
    temp="green";
  }
  else if(temp=="Join Red"){
    temp="red"
  }
  else{
    temp="blue";
  }
  // console.log(temp);

  useramt=prompt("Enter amount for "+temp.toUpperCase()+" : ");
  useramt=parseInt(useramt);
  if(useramt){
    if(useramt>userBalance){
      alert("Insufficient Balance");
    }
    else{
      userAmount.push(useramt);
      userColor.push(temp);
      console.log(userColor);
      console.log(userAmount);
      userBalance=userBalance-useramt;
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
      isChoosed=true;
      persiveBalance();
      persiveisChoosed();
      persiveValues();
    }
  }
}

function userInputNum(n){
  let temp=n.target.innerText;
  temp=parseInt(temp);
  useramt=prompt("Enter amount for "+temp+" : ");
  useramt=parseInt(useramt);
  if(useramt){
    if(useramt>userBalance){
      alert("Insufficient Balance");
    }
    else{
      userAmount.push(useramt);
      userColor.push(temp);
      console.log(userAmount);
      console.log(userColor);
      userBalance=userBalance-useramt;
      document.getElementById("Balance").innerHTML="₹ "+userBalance;
      isChoosed=true;
      persiveBalance();
      persiveisChoosed();
      persiveValues();
    }
  }
}

function win(p,betamt){
  recordQuantumArray.unshift(quantumArray[0]);
  recordResultArray.unshift("Success");
  recordProfitArray.unshift(betamt*p);

  let lenRQA=recordQuantumArray.length;
  let lenRRA=recordResultArray.length;
  let lenRPA=recordProfitArray.length;
  if(lenRQA>=6){recordQuantumArray.pop();}
  if(lenRRA>=6){recordResultArray.pop();}
  if(lenRPA>=6){recordProfitArray.pop();}
  
  userBalance=userBalance+(betamt*p);
  persiveBalance();
  persiveRecordQuantumArray();
  persiveRecordResultArray();
  persiveRecordProfitArray();
  
}

function Loss(betamt){
  recordQuantumArray.unshift(quantumArray[0]);
  recordResultArray.unshift("Fail");
  recordProfitArray.unshift(-betamt);
  
  let lenRQA=recordQuantumArray.length;
  let lenRRA=recordResultArray.length;
  let lenRPA=recordProfitArray.length;
  if(lenRQA>=6){recordQuantumArray.pop();}
  if(lenRRA>=6){recordResultArray.pop();}
  if(lenRPA>=6){recordProfitArray.pop();}

  persiveRecordQuantumArray();
  persiveRecordResultArray();
  persiveRecordProfitArray();
}

//Function to decide wheather user won or loss
function winLoss(){
  console.log("winloss called");
  getPersiveValues();

  //new logic
  userColor.forEach((element,index)=>{
    if(typeof(element)=="string"){
      if(element=="red"){
        if(resultArray[0]==0){
          win(1.5,userAmount[index]);
        }
        else{
          (resultArray[0]%2==0)?win(2,userAmount[index]) : Loss(userAmount[index]);
        }
      }
      else if(element=="green"){
        if(resultArray[0]==5){
          win(1.5,userAmount[index]);
        }
        else{
          (resultArray[0]%2!=0)?win(2,userAmount[index]) : Loss(userAmount[index]);
        }
      }
      else{
        (resultArray[0]==0||resultArray[0]==5)?win(1.5,userAmount[index]) : Loss(userAmount[index]);
      }
    }
    else if(typeof(element)=="number"){
      element==resultArray[0]? win(8.5,userAmount[index]) : Loss(userAmount[index]);
    }
    else{
      console.log("ERROR OCCURED");
    }
  })
  userColor=[];
  userAmount=[];
  persiveValues();
}

//function to update my record section
function updateMyRecord(){
  getPersiveRecordResultArray()
  if(recordResultArray==null){
    recordResultArray=["s","t","a","r","t"];
    persiveRecordResultArray();
  }
  getPersiveQuantumArray();
  if(recordQuantumArray==null){
    recordQuantumArray=["s","t","a","r","t"];
    persiveRecordQuantumArray();
  }
  getPersiveProfitArray();
  if(recordProfitArray==null){
    recordProfitArray=["s","t","a","r","t"];
    persiveRecordProfitArray();
  }
  
  //updating Quantum for wait
  R_QuantumId.forEach((element,index)=>{
    document.getElementById(element).innerHTML=recordQuantumArray[index];
  });

  //updating Result for Wait
  resultId.forEach((element,index)=>{
    document.getElementById(element).innerHTML=recordResultArray[index];
    document.getElementById(element).style.color=(recordResultArray[index]=="Fail")?"red":"green";
  });

  //updating Profit section for wait
  profitId.forEach((element,index)=>{
    document.getElementById(element).innerHTML=recordProfitArray[index];
    let c=parseInt(recordProfitArray[index]);
    document.getElementById(element).style.color=c>0? "green" : "red";
  })
}

//Function to display the current bet info
function waitValues(){
  getPersiveValues();
  // console.log(userColor);
  // console.log(userAmount);
  for(let i=0;i<userColor.length;i++){
    document.getElementById(R_QuantumId[i]).innerHTML=currQuantum;
    document.getElementById(resultId[i]).innerHTML="Wait";
    document.getElementById(resultId[i]).style.color="orange";
    document.getElementById(profitId[i]).innerHTML="₹"+userAmount[i]+" on ("+userColor[i]+")";
    document.getElementById(profitId[i]).style.color="black";
  }
}

function Unavailable(){
  alert("Currently Unavailable!!!\n Wait for next update Or Play with Red, Blue and Green.");
}


// =====================================functions to persive values on local storege of browser====================================================
function persiveresultArray(){
  resultString=JSON.stringify(resultArray);
  localStorage.setItem("array",resultString);
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

function persiveRecordQuantumArray(){
  let Qstr=JSON.stringify(recordQuantumArray);
  localStorage.setItem("Qarray",Qstr);
}
function persiveRecordResultArray(){
  let Rstr=JSON.stringify(recordResultArray);
  localStorage.setItem("Rarray",Rstr);
}
function persiveRecordProfitArray(){
  let Pstr=JSON.stringify(recordProfitArray);
  localStorage.setItem("Parray",Pstr);
}


function getPersiveQuantumArray(){
  recordQuantumArray=localStorage.getItem("Qarray");
  recordQuantumArray=JSON.parse(recordQuantumArray);
}
function getPersiveRecordResultArray(){
  recordResultArray=localStorage.getItem("Rarray");
  recordResultArray=JSON.parse(recordResultArray);
}
function getPersiveProfitArray(){
  recordProfitArray=localStorage.getItem("Parray");
  recordProfitArray=JSON.parse(recordProfitArray);
}


