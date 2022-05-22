/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './EmergencyDetail.scss';

import EmeMap from './EmeMap';


function EmergencyDetail(props){
    // redux 변수
    let state = useSelector(state => state);
    let dispatch = useDispatch();

    let [hospitalInformation1, setHospitalInformation1] = useState(['병원이름', '전화번호', '상세주소']);
    let [emeX, setEmeX] = useState([]);
    let [emeY, setEmeY] = useState([]);

    let location = 0;
    useEffect(() => {
        console.log(props);
        emeX.push(state[5].emeX);
        emeY.push(state[5].emeY);
        location = state[5].location;
    }, [])

    function activate({ target }){
        let hospitalInformation = document.querySelector('.hospitalModal');
        [...hospitalInformation.children].forEach(information => {
            information.classList.toggle('active', information === target);
        })
    }

    function Information1UI(){
        let array = [];
        let info = ['병원 이름', '전화번호', '상세주소'];

        let hospitalName = props.hospitalName[props.clickHospital];
        let hospitalTel = props.hospitalTel[props.clickHospital];
        let hospitalAddress = props.hospitalAddress[props.clickHospital];

        let hospitalInfo = [hospitalName, hospitalTel, hospitalAddress];
        for(let i = 0; i < info.length; i++){
            array.push(
                <p className = "firstInformation">{info[i]}: {hospitalInfo[i]}</p>
            );   
        }
        return array;
    }
    
    function WeekUI(){
        let array = [];
        let week = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일', '공휴일'];
        let weekData = [];
        weekData.push(
            props.monday, props.thusday, props.wednesday, props.thursday,
            props.friday, props.saturday, props.sunday, props.holiday
        )
        for(let i = 0; i < week.length; i++){
            array.push(
                <p className="week">{week[i]} {weekData[i][props.clickHospital]}</p>
            )
        }
        return array;
    }

    if(props.detailState === 1){
        console.log(props);
        dispatch({type: '응급실위치', payload: {
            location: props.clickHospital
        }})
        return(
            <div className="hospitalDetail">
                <div className="back"/>
                <div className="information">
                    {/* onClick={props.setDetailState(0)} */}
                    <p className="close" onClick={() => {
                            props.setDetailState(0);
                        }
                    }>X</p>
                    <div className="hospitalDetail">
                        <h1>병원 상세정보</h1><br/>
                        {Information1UI()}
                    </div>
                    <div className="hospitalDetail2">
                        <ul className="hospitalModal">
                            {
                                ['병원정보', '진료정보'].map(e => {
                                    return(
                                        <li onClick={activate}>{e}</li>
                                    )
                                })  
                            }
                        </ul><br/><br/>
                        <div className="hospitalDetail2Inner">
                            <h1 className="emergencyCall">응급실 연락처 : {props.emeTel[props.clickHospital]}</h1>
                            <br/>
                            <h1>입원 가능 여부: {props.admission[props.clickHospital]}</h1><br/>
                            <h1>위치</h1>
                            <EmeMap
                                emeX = {emeX}
                                emeY = {emeY}
                                click = {props.clickHospital}
                                detailState = {props.detailState}
                            />
                            <h1>진료 시간</h1><br/>
                            <div className="weekBox">
                                {WeekUI()}
                            </div> <br/>
                            <h1>진료 과목</h1><br/>
                            <div className="diagnosisBox">
                                <p className="diagnosis">{props.treatment[props.clickHospital]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else {
        return(
            null
        )
    }
}

export default EmergencyDetail;