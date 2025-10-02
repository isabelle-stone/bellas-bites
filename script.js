// For sliding images...

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

let currSlide = 0;
function showSlide(index) {
    if (index >= slides.length) {
        currSlide = 0;
    }
    else if (index < 0) {
        currSlide = slides.length - 1;
    }
    else {
        currSlide = index;
    }

    slider.style.transform = `translateX(-${currSlide * 100}%)`;
    dots.forEach((dot, i) => {
        if (i == currSlide) {
            dot.classList.add('active');
        }
        else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    showSlide(currSlide + 1);
}

function prevSlide() {
    showSlide(currSlide - 1);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(idex);
    });
});

// auto play
setInterval(nextSlide, 5000);
