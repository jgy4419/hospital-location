/* eslint-disable */
/* global kakao */

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import EmergencyDetail from './EmergencyDetail';
import './EmergencyList.scss';

import Spinner from '../Spinner';

function EmergencyList(){
    let [detailState, setDetailState] = useState(0);
    let [emeinformationState, setEmeinformationState] = useState(0);
    let state = useSelector(state => state);
    let dispatch = useDispatch();
    var mapContainer;
    var mapOption;
    var map;

    // 클릭한 병원
    let [clickHospital, setClickHospital] = useState(0);

    // 응급실 기본정보들
    let [hospitalCount, setHospitalCount] = useState(0);
    let [hospitalName, setHospitalName] = useState([]);
    let [hospitalTel, setHospitalTel] = useState([]);
    let [hospitalAddress, setHospitalAddress] = useState([]);

    // 응급실 상세정보들
    let [emeTel, setEmeTel] = useState([]);
    let [monday, setMonday] = useState([]);
    let [thusday, setThusday] = useState([]);
    let [wednesday, setWednesday] = useState([]);
    let [thursday, setThursday] = useState([]);
    let [friday, setFriday] = useState([]);
    let [saturday, setSaturday] = useState([]);
    let [sunday, setSunday] = useState([]);
    let [holiday, setHoliday] = useState([]);
    let [treatment, setTreatment] = useState([]);
    let [admission, setAdmission] = useState([]);

    useEffect(() => {
        mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        mapOption = { 
            // 충주 중심좌표
            center: new kakao.maps.LatLng(36.99196502823086, 127.92563283606664),
            level: 7 // 지도의 확대 레벨
        };
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        map = new kakao.maps.Map(mapContainer, mapOption);
        // 1초에 한 번씩 변하는 값 확인, 병원 이름이 변하면 setInterval을 멈추고, 데이터를 출력해준다.
        let interval = setInterval(() => {
            // for(let i = 0; i < 10; i++){
            //     console.log(state[3].hospitalName[i]);
                
            // }
            if(state[3].hospitalName[0] !== undefined){
                console.log(state[4]);
                for(let i = 0; i < state[3].emeCount; i++){
                    // 병원 기본정보
                    hospitalName.push(state[3].hospitalName[i]);
                    hospitalTel.push(state[3].hospitalTel[i]);
                    hospitalAddress.push(state[3].hospitalAddress[i]);
                    console.log(hospitalName[i]);

                    // 병원 상세정보들
                    emeTel.push(state[4].emeTel[i]);
                    monday.push(state[4].monday[i])
                    thusday.push(state[4].thusday[i])
                    wednesday.push(state[4].wednesday[i])
                    thursday.push(state[4].thursday[i]);
                    friday.push(state[4].friday[i]);
                    saturday.push(state[4].saturday[i]);
                    sunday.push(state[4].sunday[i]);
                    holiday.push(state[4].holiday[i]);
                    treatment.push(state[4].treatment[i]);
                    admission.push(state[4].admission[i]);
                }
                setHospitalCount(state[3].emeCount);
                setEmeinformationState(1);
                clearInterval(interval);
            }
        }, 1000);
    }, []);

    async function detailInformationOpen(e){
        await setDetailState(1);
        setClickHospital(e);
    }

    function EmeInformationUI(){
        let array = [];
            if(emeinformationState === 1){
                console.log('병원개수', hospitalCount);
                for(let i = 0; i < hospitalCount; i++){
                    console.log(hospitalName[i]);
                    array.push(
                        <>
                            <div className="list">
                                <div class="hospitalDetailBox" onClick={() => {detailInformationOpen(i)}}>
                                    <p className="hospitalCount" style={{display: 'none'}}>{i}</p>
                                    <p className = "name">이름: {hospitalName[i]}</p>
                                    <p className = "tel">전화번호: {hospitalTel[i]}</p>
                                    <p className = "address">주소: {hospitalAddress[i]}</p>
                                </div>
                            </div>
                        </>
                    )
                }
                return array;
            }else{
                return(
                    <Spinner className="spinner"/>
                )
            }
    }
    return(
        <>
            <div className="contain">
                <div className="settings">
                    {EmeInformationUI()}
                </div>
            </div>
            <EmergencyDetail 
                detailState = {detailState} 
                setDetailState = {setDetailState}
                clickHospital = {clickHospital}
                hospitalName = {hospitalName}
                hospitalTel = {hospitalTel}
                hospitalAddress = {hospitalAddress}

                // 병원 상세정보
                emeTel = {emeTel}
                monday = {monday}
                thusday = {thusday}
                wednesday = {wednesday}
                thursday = {thursday}
                friday = {friday}
                saturday = {saturday}
                sunday = {sunday}
                holiday = {holiday}
                treatment = {treatment}
                admission = {admission}
            />
        </>
    )
}

export default EmergencyList;
