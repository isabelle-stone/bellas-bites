// For sliding images...

// only runs if slider on page...
const slider = document.getElementById('slider');

if (slider) {
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
            showSlide(index);
        });
    });
    
    // auto play
    setInterval(nextSlide, 5000);    
}

// Hamburger for mobile:

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
}

