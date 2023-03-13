
const convertToDate = ['일', '월', '화', '수', '목', '금', '토'];

const convertToRecord = (obj) => {

  const li = document.createElement("li");
  li.className = "record_container";
  
  const dateContent = document.createElement("div");
  dateContent.className = "record_date_content";

   // dateContent.textContent = `${recordYear}년 ${recordMonth}월 ${recordDate}일`;
  dateContent.textContent = new Date(obj.runningAt).toLocaleDateString(); 
  
  //달린 날짜를 calendar.js 에 보내서 해당 날짜에 className 을 추가시킴
  const seperateTime = new Date(obj.runningAt).toLocaleTimeString().slice(0,2); //오전 오후
  const day = convertToDate[new Date(obj.runningAt).getDay()];

  const dateInfoContent = document.createElement("div");
  dateInfoContent.className = "record_detail_date gray";
  dateInfoContent.textContent = `${day}요일 ${seperateTime} 러닝`;

  const record = document.createElement("div");
  record.className = 'record';

  const recordDistance = document.createElement("p");
  recordDistance.textContent = obj.distance;
  const recordPace = document.createElement("p");
  recordPace.textContent = obj.perPace;
  const recordTime = document.createElement("p");
  recordTime.textContent = obj.time;
  record.append(recordDistance, recordPace, recordTime);

  const unit = document.createElement("div");
  unit.className = 'unit gray';
  const disatnceUnit = document.createElement("p");
  disatnceUnit.textContent = "km";
  const paceUnit = document.createElement("p");
  paceUnit.textContent = "평균페이스";
  const timeUnit = document.createElement("p");
  timeUnit.textContent = "시간";
  unit.append(disatnceUnit, paceUnit,timeUnit);

  li.append(dateContent, dateInfoContent,record, unit);

  return li;
};

const render = (element) => {
  let distance = 0, perPace = 0, pace = 0, time = 0;
  for(let i = 0 ; i < dailyRunningRecords.length ; i++){
    element.append(convertToRecord(dailyRunningRecords[i]));

    distance += dailyRunningRecords[i].distance;
    perPace = dailyRunningRecords[i].perPace;
    pace += Number(perPace[0]) * 60 + Number(perPace.slice(2,4));
    time = dailyRunningRecords[i].time;
  }
    
  // console.log(pace);
  pace /= dailyRunningRecords.length;
  // console.log(pace);
  paceMin = Math.floor(pace/60); 
  paceSecond = pace%60;
  
  const total_distance = document.querySelector('div#total_distance');
  total_distance.textContent = distance;
  
  const total_run = document.querySelector('div#total_run');
  total_run.textContent = dailyRunningRecords.length;
  
  const avg_pace = document.querySelector('div#avg_pace');
  avg_pace.textContent = `${paceMin}'${paceSecond}"`;
  
  const total_times = document.querySelector('div#total_times');
  total_times.textContent = `${paceMin}'${paceSecond}"`;
  
  return;
};



const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
}

const form= document.querySelector('.form__container');


const submit = () => {
// e.preventDefault();

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
  ul.prepend(convertToRecord((getRecordsArr[i])));
}
}

window.addEventListener("load", () => {
addLocalStorage();
});

document.querySelector(".addBtn").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".confirmBtn").addEventListener("click", submit);
document.querySelector(".bg").addEventListener("click", close);



const ul = document.querySelector("ul.records_container");
render(ul);
  


// 정렬
// const sortRunningRecords = (array) => {
//   return array.sort((a,b) => {
//     if(new Date(a.runningAt) > new Date(b.runningAt) ) return -1;
//     if(new Date(a.runningAt) < new Date(b.runningAt)) return 1;
//     return 0;
//   });
// };