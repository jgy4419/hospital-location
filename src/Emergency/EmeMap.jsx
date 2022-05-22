/* eslint-disable */
/* global kakao */

import React, {useState, useEffect} from 'react';
import './EmeMap.scss'
import {useSelector, useDispatch} from 'react-redux';

const { kakao } = window;

function EmeMap(props){
    let location = 0;
    useEffect(() => {
        console.log(props.click)
        location = props.click;
        // map();
    }, [])
    function Map(){
        let array = [];
        array.push(<div id="emeMap"/>)
        // return array;

        location = props.click;
        setTimeout(() => {
            let markerPosition  = new kakao.maps.LatLng(props.emeY[0][location], props.emeX[0][location]); 
            let marker = new kakao.maps.Marker({
                position: markerPosition
            })
            var mapContainer = document.getElementById('emeMap'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(props.emeY[0][location], props.emeX[0][location]), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption); 

            
            marker.setMap(map);  
        }, 100);
        return array; 
    }
    return(
        <div>
            {Map()}
        </div>
    )
}
export default EmeMap;