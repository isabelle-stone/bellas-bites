import { useState, useEffect } from 'react'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1598449426314-8b02525e8733?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504718855392-c0f33b372e72?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1572616890089-6f8642c23eb3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);


  return (
    <div className='Home'>

      {/* Hero */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>Bella's Bites</h1>
          <p>100% Vegan & Gluten Free</p>
          <a href='/menu' className='btn'>View Our Menu</a>
        </div>
      </section>

      {/* Gallery */}
      <section className='gallery'>
        <h2>Some of Our Food...</h2>
        <div className='slider-container'>
          <div className='slider' style={{transform: `translateX(-${currentSlide * 100}%)`}}>
            {slides.map((slide, index) => (
              <div key={index} className='slide'>
                <img src={slide} alt='Food Image' />
              </div>
            ))}
          </div>
          <button
            className='slider-arrow prev'
            onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          >
            ❮
          </button>
          <button 
            className='slider-arrow next'
            onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          >
            ❯
          </button>
          <div className='slider-nav'>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

    </div>


  );
}

export default Home;
