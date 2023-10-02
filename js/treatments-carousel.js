const treatments = [
    {
        id: 1,
        title: 'Biorevitalization',
        description: 'Biorevitalization is an innovative biological way to fight skin aging and a variety of skin aesthetic concerns successfully returning your skin to life. It is a totally safe and effective procedure.',
        price: 9.99,
        imageUrl: 'img/treatments/biorevitalization.png'
    },
    {
        id: 2,
        title: 'Face lifting',
        description: 'Get a durable skin quality enhancement due to face lifting and contouring. It is a non-surgical procedure which stimulates the formation of your own collagen.',
        price: 10.99,
        imageUrl: 'img/treatments/face-lifting.png'
    },
    {
        id: 3,
        title: 'Injection cosmetology',
        description: 'If you are not ready for surgical treatment yet want to get rid of aging signs, injection cosmetology is a perfect alternative. It is a fast and relatively painless procedure.',
        price: 8.99,
        imageUrl: 'img/treatments/injection-cosmetology.png'
    },
    {
        id: 4,
        title: 'Laser treatment',
        description: 'Laser treatments will help you resurface your skin, remove wrinkles and acne scars, and regenerate collagen growth, creating a beautiful glowing skin for many years.',
        price: 7.99,
        imageUrl: 'img/treatments/laser-treatment.png'
    }
];

function renderTreatments(treatments) {
    let treatmentsHTML = [];
    for (const treatment of treatments) {
        treatmentsHTML.push(
            `<div class="carousel__element">           
                <img class="carousel__element__img" src="${treatment.imageUrl}" alt="${treatment.title}">                
                <h5 class="carousel__element__title">${treatment.title}</h5>
                <button class="carousel__element__button">Info</button>               
            </div>`
        )
    }
    return treatmentsHTML;
}

const slides = renderTreatments(treatments);

let currentSlideIdx = 0;

function renderSlide() {
    const slideContainer = document.querySelector('.treatments__carousel-slide');
    slideContainer.innerHTML = slides[currentSlideIdx];
    if (window.matchMedia('(min-width: 768px)').matches) {
        const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
        slideContainer.innerHTML += slides[secondSlideIdx];
        if (window.matchMedia('(min-width: 1024px)').matches) {
            const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
            slideContainer.innerHTML += slides[thirdSlideIdx];
        }
    }
    renderIndicators();
    updateButtons();
}

window.addEventListener('resize', renderSlide);

function nextSlide() {
    currentSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
    renderSlide();
}

function prevSlide() {
    currentSlideIdx = currentSlideIdx - 1 < 0 ? slides.length - 1 : currentSlideIdx - 1;
    renderSlide();
}

// setInterval(nextSlide, 3000);

function renderIndicators() {
  const indicatorsContainer = document.querySelector('.treatments__carousel-indicators');
  indicatorsContainer.innerHTML = '';
  for (let i = 0; i < slides.length; i++) {
    indicatorsContainer.innerHTML += 
      `<button class="treatments__carousel-indicator ${i === currentSlideIdx ? 'treatments__carousel-indicator--active' : ''}"></button>`
  }
  const indicators = document.querySelectorAll('.treatments__carousel-indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlideIdx = index;
        renderSlide();
    })
  })
}

renderSlide();

const nextBtn = document.querySelector('.arrow-slider.right');
nextBtn.addEventListener('click', nextSlide);

const prevBtn = document.querySelector('.arrow-slider.left');
prevBtn.addEventListener('click', prevSlide);



function updateButtons(){
    const div = document.querySelector('.treatments__carousel-slide');
    for(let i=0; i < div.children.length; i++){
        const element = div.children[i];
        const button = element.querySelector('.carousel__element__button');
        button.addEventListener('click', () => {
            renderDescription((currentSlideIdx + i)%treatments.length);
        })
    }
}


function renderDescription(index){
    const modalWindow = document.getElementById('myModal');
    const mwHTML =
        `<div class="modal-content">
            <span class="closeBtn">&times;</span>
            <h2>${treatments[index].title}</h2>
            <p>${treatments[index].description}</p>
        </div>`;
    modalWindow.innerHTML = mwHTML;
    modalWindow.style.display = 'block';
    document.querySelector('.closeBtn').addEventListener('click', function() {
        document.getElementById('myModal').style.display = 'none';
    });
}












