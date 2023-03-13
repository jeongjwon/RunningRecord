

const open = () => {
    document.querySelector(".modal").classList.remove("hidden");
  }

const close = () => {
    document.querySelector(".modal").classList.add("hidden");
  }

const form= document.querySelector('.form__container');


const submit = () => {
  e.preventDefault();

  const elInputDate = document.querySelector('#date');
  const elInputDistance = document.querySelector('#distance');
  const elInputPaceM = document.querySelector('#paceMinute');
  const elInputPaceS = document.querySelector('#paceSecond');
  const elInputTimeH = document.querySelector('#timeHour');
  const elInputTimeM = document.querySelector('#timeMinute');
  const elInputTimeS = document.querySelector('#timeSecond');
  

  const newRecord = {
    runningAt : elInputDate.value,
    distance : elInputDistance.value, 
    perPace : `${elInputPaceM.value}'${elInputPaceM.value}"`,
    time : elInputTimeH.value > 0 ? 
      `${elInputTimeH.value}:${elInputTimeM.value}:${elInputTimeS.value}` : 
      `${elInputTimeM.value}:${elInputTimeS.value}`,
  }

  elInputDate.value = new Date().toISOString().substring(0, 10);
  elInputDistance.value = "0.0"; 
  elInputPaceM.value = "0";
  elInputPaceS.value = "00";
  elInputTimeH.value = "00";
  elInputTimeM.value = "00";
  elInputTimeS.value = "00";

  const getRecords = window.localStorage.getItem("running_records");

  if(getRecords === null){
    window.localStorage.setItem("running_records", JSON.stringify([newRecord]));
  }else{
    const getRecordsArr = JSON.parse(getRecords);
    getRecordsArr.push(newRecord);
    window.localStorage.setItem("running_records", JSON.stringify(getRecordsArr));
  }
  
};

const addLocalStorage = () =>{
  const getRecords = window.localStorage.getItem("running_records");

  if(getRecords=== null) return;

  const getRecordsArr = JSON.parse(getRecords);
  console.log(getRecordsArr);
  
  const ul = document.querySelector("ul.records_container");
  for(let i = 0 ; i < getRecordsArr.length ; i++){
    ul.prepend(convertToRecord(getRecordsArr[i]));
  }
}

window.addEventListener("load", () => {
  addLocalStorage();
});

document.querySelector(".addBtn").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".confirmBtn").addEventListener("click", submit);
document.querySelector(".bg").addEventListener("click", close);


