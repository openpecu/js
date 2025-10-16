// Carousel + reveal animations
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("heroCarousel");
  const slides = carousel.querySelectorAll(".slide");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  const dots = document.getElementById("heroDots");

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i===0 ? " active" : "");
    dot.addEventListener("click", () => go(i));
    dots.appendChild(dot);
  });

  let idx = 0;
  function go(n){
    slides[idx].classList.remove("active");
    dots.children[idx].classList.remove("active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots.children[idx].classList.add("active");
  }
  prev.addEventListener("click", () => go(idx-1));
  next.addEventListener("click", () => go(idx+1));
  setInterval(()=>go(idx+1), 7000);

  // simple reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); }});
  },{threshold: .1});
  document.querySelectorAll('.game-card,.post,.card,.cta-strip').forEach(el=>observer.observe(el));
});
