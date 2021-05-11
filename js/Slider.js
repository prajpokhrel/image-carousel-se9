function Slider(sliderId, sliderImagesContainer, transitionDuration, holdDuration) {
    this.sliderId = sliderId;
    this.sliderImagesContainer = sliderImagesContainer;
    this.counter = 0;
    this.transitionDuration = transitionDuration;
    this.holdDuration = holdDuration;
    this.interval = undefined;

    this.getSlider = function () {
        return document.querySelector(`${this.sliderImagesContainer}`);
    }

    this.getImages = function () {
        return document.querySelectorAll(`${this.sliderImagesContainer} img`);
    }

    this.getIndicator = function () {
        return document.querySelectorAll('.dot');
    }

    this.setActiveStatus = function () {
        let dots = this.getIndicator();
        dots.forEach(function (dot, index) {
            dot.classList.remove('active');
        });
        dots[this.counter].classList.add('active');
    }

    this.handleIndicatorClicked = function() {
        const slideContainer = this.getSlider();
        const slideImages = this.getImages();
        const size = slideImages[0].clientWidth;
        let dots = this.getIndicator();
        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                slideContainer.style.transition = `transform ${this.transitionDuration/1000}s ease-in-out`;
                slideContainer.style.transform = 'translateX(' + (-size * index) + 'px';
            }.bind(this));
        });
    }

    this.nextButton = function() {
        const nextBtn = new CreateElement('span', 'btn-next', this.sliderId, '&raquo',
            [
                {cursor: 'pointer'},
                {position: 'absolute'},
                {top: '50%'},
                {width: 'auto'},
                {padding: '14px'},
                {color: '#FFFFFF'},
                {fontSize: '20px'},
                {right: '1%'},
                {opacity: '0.8'},
                {backgroundColor: '#000000'},
                {transform: 'translate(-50%, -50%)'}
            ]);

        nextBtn.addElement();
        return nextBtn;
    }

    this.previousButton = function() {
        const prevBtn = new CreateElement('span', 'btn-prev', this.sliderId, '&laquo',
            [
                {cursor: 'pointer'},
                {position: 'absolute'},
                {top: '50%'},
                {width: 'auto'},
                {padding: '12px'},
                {color: '#FFFFFF'},
                {fontSize: '20px'},
                {left: '1%'},
                {opacity: '0.8'},
                {backgroundColor: '#000000'},
                {transform: 'translate(50%, -50%)'},
            ]);

        prevBtn.addElement();
        return prevBtn;
    }

    this.dotsContainer = function() {
        const dotContainer = new CreateElement(
            'div',
            'indicator',
            this.sliderId, '',
            [
                {height: '20px'},
                {width: 'auto'},
                {position: 'absolute'},
                {bottom: '2%'},
                {left: '50%'},
                {transform: 'translate(-50%, -50%)'}]
        )
        dotContainer.addElement();
    }

    this.createDots = function (dotsContainer) {
        let dotsCount = this.getImages().length;
        for (let i = 0; i < dotsCount; i++) {
            const dots = new CreateElement(
                'div',
                'dot',
                `.${dotsContainer}`,
                '',
                [
                    {height: '15px'},
                    {width: '15px'},
                    {borderRadius: '50%'},
                    {border: '1px solid #FFFFFF'},
                    {zIndex: '99999999'},
                    {float: 'left'},
                    {marginRight: '10px'},
                    {cursor: 'pointer'},
                    ]
            );
            dots.addElement();
        }
    }

    this.autoAnimate = function () {
        this.interval = setInterval(function () {
            this.handleNextBtnClick();
        }.bind(this), this.transitionDuration + this.holdDuration);
    }

    this.handleNextBtnClick = function() {
        const slideContainer = this.getSlider();
        const slideImages = this.getImages();
        const size = slideImages[0].clientWidth;
        this.counter++;
        if (this.counter >= slideImages.length) {
            this.counter = 0;
        }
        slideContainer.style.transition = `transform ${this.transitionDuration/1000}s ease-in-out`;
        slideContainer.style.transform = 'translateX(' + (-size * this.counter) + 'px';
        this.setActiveStatus();
    }

    this.handlePrevBtnClick = function() {
        const slideContainer = this.getSlider();
        const slideImages = this.getImages();
        const size = slideImages[0].clientWidth;

        if (this.counter <= 0) return;
        slideContainer.style.transition = `transform ${this.transitionDuration/1000}s ease-in-out`;
        this.counter--;
        slideContainer.style.transform = 'translateX(' + (-size * this.counter) + 'px';
        this.setActiveStatus();
    }

    this.createSlider = function() {
        this.getSlider();
        this.nextButton();
        this.previousButton();
        this.dotsContainer();
        this.createDots('indicator');

        this.setActiveStatus();
        this.autoAnimate();

        this.handleIndicatorClicked();

        const nextBtn = document.querySelector(`${this.sliderId} .btn-next`);
        const prevBtn = document.querySelector(`${this.sliderId} .btn-prev`);

        nextBtn.addEventListener('click', this.handleNextBtnClick.bind(this));
        prevBtn.addEventListener('click', this.handlePrevBtnClick.bind(this));

    }
}

function init() {
    const slider = new Slider('#slider-container1',
        '#slider-images-container1', 2000, 2000);
    slider.createSlider();
}

init();


