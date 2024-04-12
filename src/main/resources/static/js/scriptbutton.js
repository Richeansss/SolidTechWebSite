const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const imagesContainer = document.querySelector('.images-container');
const images = document.querySelectorAll('.images-container img');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
    indicators[currentIndex].classList.add('active'); // Устанавливаем активный кружок для первого изображения при загрузке страницы
    resetInterval(); // Запускаем первый раз автоматическое пролистывание
});

scrollLeftBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    update();
});

scrollRightBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    update();
});

function update() {
    updateImagesOrder();
    updateIndicator();
    resetInterval();
}

function updateImagesOrder() {
    imagesContainer.style.transition = 'none';
    imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    setTimeout(() => {
        imagesContainer.style.transition = 'transform 0.5s ease';
    }, 50);
}

function updateIndicator() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        update();
    }, 5000);
}
