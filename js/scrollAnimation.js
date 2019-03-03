/*
소프트웨어과 유일 웹 동아리 IWOP
Chrome을 기준으로 작성됨. (ES6문법 사용 IE,Edge 호환안됨)

GitHub : https://github.com/IWOP/iwop.github.io , https://github.com/Andy-0414/IWOP

© 2019. PJH. All rights reserved.
*/

var scrollAnimation = scrollAnimation || {};

(function () {
    const between = function (value, min, max) { return value >= min && value <= max }
    class scrollAnimationModule {
        constructor() {
            this.necessaryClassName = 'scrollAnimation'
            this.necessaryElement = document.querySelectorAll(`.${this.necessaryClassName}`)
            this.viewAccuracy = 1
            this.spawnHeight = "-50px"
        }
        init() {
            this.necessaryElement.forEach(x => {
                var childIndex;
                x.parentNode.childNodes.forEach((y, idx) => {
                    if (x == y) childIndex = idx - 1
                })
                x.style.transition = `0.5s`
                x.style.transitionDelay = `${0.05 * childIndex}s`
            })
            document.addEventListener('scroll', () => {
                var y = window.scrollY
                this.necessaryElement.forEach(x => {
                    var showHeightTop = (x.offsetTop + x.clientHeight / 2) / this.viewAccuracy - window.innerHeight
                    var showHeightBottem = (x.offsetTop + x.clientHeight / 2) * this.viewAccuracy

                    if (between(y, showHeightTop, showHeightBottem)) {
                        x.style.opacity = 1;
                        x.style.transform = "translateY(0px)"
                    }
                    else {
                        x.style.opacity = 0;
                        x.style.transform = `translateY(${this.spawnHeight})`
                    }
                })
            })
        }
    }

    scrollAnimation = new scrollAnimationModule()
})();

scrollAnimation.init()
