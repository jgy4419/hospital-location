import React from 'react';
import {useState, useEffect} from 'react';
import './Header.scss';

function Header(){
    let menuList = ['홈', '내 위치 근처 병원 찾기', '내 주변 응급실 찾기'];

    useEffect(() => {
        // 누른 메뉴에 따라서 url 변경.
        let menuList = document.querySelectorAll('.menuList');
        let load = ['/', 'hospital', 'emergency'];
        for(let i = 0; i < menuList.length; i++){
            menuList[i].addEventListener('click', function(){
                window.location.href = load[i];
            })
        }
    }, [])

    function hamburgerMove(){
        let line = document.querySelectorAll('.line');
        let menuOpen = document.querySelector('.menuOpen');
        for(var i = 0; i < line.length; i++){
            line[i].classList.toggle('event');
        }
        // 햄버거 누르면 옆에 메뉴 생성해주기. + 배경 어둡게 해주기.
        menuOpen.classList.toggle('event');
    }
    function hamburger(){
        let menuIcon = [];
        for(let i = 0; i < 3; i++){
            menuIcon.push(<div className = "line"/>);
        }
        return menuIcon;
    }

    return(
        <header>
            <div className='menuListIcon' onClick={hamburgerMove}>
                {hamburger()}
            </div>
            <div className='menuOpen'>
                <ul>
                    {
                        menuList.map(i => {
                            return(
                                <li className="menuList">{i}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header;