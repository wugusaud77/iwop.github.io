/*
소프트웨어과 유일 웹 동아리 IWOP
Chrome을 기준으로 작성됨. (ES6문법 배제 IE11,Edge 일부 호환)

GitHub : https://github.com/IWOP/iwop.github.io , https://github.com/Andy-0414/IWOP

© 2019. PJH. All rights reserved.
*/

// 스크롤 이벤트
const between = function (value, min, max) { return value >= min && value <= max }
const swapClass = function(ele, on, off){
    ele.classList.add(on);
    ele.classList.remove(off);
}
var y = window.scrollY
var user__maxY = window.innerHeight

var layout = document.querySelector('#layout')
var topBar = document.querySelector('.topBar')
var startPage = document.querySelector('.iwop__startPage')
var section = document.querySelectorAll('section')
var iwop__main = document.querySelector('.iwop.iwop__main')
var iwop__sub = document.querySelector('.iwop.iwop__sub')
var iwop__scroll = document.querySelectorAll('.iwop__startPage__scroll *')
var quickMenu = document.querySelector('.quickMenu')
var quickMenu__item = document.querySelectorAll('.quickMenu__item')
var quickMenu__item__content = document.querySelectorAll('.quickMenu__item__content')
window.onscroll = function(e){
    var y = window.scrollY || window.pageYOffset
    //탑 바
    if (!between(y, 0, iwop__main.offsetTop)) {
        swapClass(iwop__main, 'iwop--disable', 'iwop--active')
        swapClass(iwop__sub, 'iwop--active', 'iwop--disable')
        for (let idx = 0; idx < iwop__scroll.length; idx++) {
            const x = iwop__scroll[idx];
            swapClass(x, 'iwop__startPage__scroll__item--disable', 'iwop__startPage__scroll__item--active')
        }
    }
    else {
        swapClass(iwop__main, 'iwop--active', 'iwop--disable')
        swapClass(iwop__sub, 'iwop--disable', 'iwop--active')
        for (let idx = 0; idx < iwop__scroll.length; idx++) {
            const x = iwop__scroll[idx];
            swapClass(x, 'iwop__startPage__scroll__item--active', 'iwop__startPage__scroll__item--disable')            
        }
    }
    if (!between(y, 0, user__maxY)) {
        swapClass(topBar, 'topBar--attach', 'topBar--detach')
        layout.style.marginTop = "70px"
    }
    else {
        swapClass(topBar, 'topBar--detach', 'topBar--attach')
        swapClass(quickMenu, 'quickMenu--disable', 'quickMenu--active')
        layout.style.marginTop = "0px"
    }
    for (let idx = 0; idx < section.length; idx++) {
        const x = section[idx];
        var tmp = section[idx - 1] || { offsetTop: window.pageYOffset }
        if (tmp) {
            if (between(y, tmp.offsetTop, x.offsetTop)) {
                quickMenuItemSelect(idx)
            }
        }
    }
}

// 퀵 메뉴
function gotoStartPage() {
    window.scrollTo({ behavior: 'smooth', top: 0 });
}
function gotoScroll(className) {
    var ele = document.getElementsByClassName(className)[0]
    window.scrollTo({ behavior: 'smooth', top: ele.offsetTop - 70 })
}
function quickMenuItemSelect(num) {
    for (let idx = 0; idx < quickMenu__item.length; idx++) {
        const x = quickMenu__item[idx];
        if (num == idx) swapClass(x, 'quickMenu__item--active', 'quickMenu__item--disable')
        else swapClass(x, 'quickMenu__item--disable', 'quickMenu__item--active')   
    }
}
function toggleQuickMenu() {
    quickMenu.classList.toggle('quickMenu--disable')
    quickMenu.classList.toggle('quickMenu--active')
}

// 슬라이더
var slider = document.getElementsByClassName('iwop__work__list')[0]
var sliderItem = slider.children
var slideIndex = 0
var timer = setInterval(function(){
    slideIndex = (slideIndex+1)%5
    var px = -400 * (slideIndex + 2)
    slider.style.marginLeft = px+"px"
},3000)