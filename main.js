var radius = screen.width < 768 ? 120 : 320; // Теперь radius объявлен
var autoRotate = true; 
var rotateSpeed = -60; 
var imgWidth = screen.width < 768 ? 100 : 300;
var imgHeight = screen.width < 768 ? 140 : 420;

var tX = 0, tY = 0; 
var sX = 0, sY = 0, desX = 0, desY = 0; 

setTimeout(() => init(), 1000); 

var odrag = document.querySelector('#drag-container'); 
var ospin = document.querySelector('#spin-container'); 
var aImg = ospin.getElementsByTagName('img');
var aEle = [...aImg];

ospin.style.width = imgWidth + 'px';
ospin.style.height = imgHeight + 'px';

function init() {
    aEle.forEach((el, i) => {
        let angle = i * (360 / aEle.length);
        el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`; // radius теперь влияет на глубину
        el.style.transition = 'transform 1s ease-out'; 
    });

    tX = 0;
    tY = 0;
    requestAnimationFrame(applyTransform);
}

function applyTransform() {
    if (tY > 60) tY = 60;
    if (tY < -60) tY = -60;
    odrag.style.transform = `perspective(1000px) rotateX(${tY}deg) rotateY(${tX}deg)`;
}

if (autoRotate) {
    ospin.style.animation = `spin ${Math.abs(rotateSpeed)}s infinite linear`;
}

odrag.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    sX = e.clientX;
    sY = e.clientY;

    this.onpointermove = function (e) {
        e.preventDefault();
        let nX = e.clientX;
        let nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        sX = nX;
        sY = nY;
        tX += desX * 0.1;
        tY -= desY * 0.1;
        requestAnimationFrame(applyTransform);
    };

    this.onpointerup = function () {
        this.onpointermove = null;
    };
};

// Добавляем обработчик колёсика мыши
document.addEventListener("wheel", function (e) {
    e.preventDefault(); // Предотвращаем прокрутку страницы

    let d = e.deltaY > 0 ? -10 : 10; // Крутим вниз — уменьшаем, вверх — увеличиваем
    radius += d; // Меняем radius
    init(); // Пересчитываем позиции элементов
}, { passive: false });
