(function () {
    'use strict';
    var slides = document.querySelectorAll('.testimonial-item'),
       button = document.getElementById('button'),
       arrows = document.querySelectorAll('.lnr'),
       carouselCount = 0,
       scrollInterval,
       interval = 5000;
  
    arrows[0].addEventListener('click', function (e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount -= 100;
      slider();
      if (e.type !== 'autoClick') {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, interval);
      }
    });
    arrows[1].addEventListener('click', sliderEvent);
    arrows[1].addEventListener('autoClick', sliderEvent);
    
    function sliderEvent(e) {
      e = e || window.event;
      e.preventDefault();
      carouselCount += 100;
      slider();
      if (e.type !== "autoClick") {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, interval);
      }
    }
    
    function slider() {
      switch (carouselCount) {
        case -100:
          carouselCount = 0;
          break;
        case 300:
          carouselCount = 0;
          break;
        default:
          break;
      }
      console.log(carouselCount);
      for (var i = 0; i < slides.length; i += 1) {
        slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%)');
      }
    }
    
    // create new Event to dispatch click for auto scroll
    var autoClick = new Event('autoClick');
    function autoScroll() {
      arrows[1].dispatchEvent(autoClick);
    }
    
    // set timing of dispatch click events
    scrollInterval = setInterval(autoScroll, interval);
    
  })();
  



/*=====================animated cursor==================================*/
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    //     updateCursor: function(e) {
    //         var self = this;

    //         console.log(e)

    //         // Show the cursor
    //         self.cursorVisible = true;
    //         self.toggleCursorVisibility();

    //         // Position the dot
    //         self.endX = e.pageX;
    //         self.endY = e.pageY;
    //         self.$dot.style.top = self.endY + 'px';
    //         self.$dot.style.left = self.endX + 'px';
    //     },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();
/*====================up button=========================== */

var scrollToTopBtn = document.getElementById("scrollToTopBtn")
var rootElement = document.documentElement

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
scrollToTopBtn.addEventListener("click", scrollToTop)

/*---------------------main page text---------------------*/

consoleText(["I'M TEJEWANI", 'I HELP WOMEN TO GROW BUSSINESS', 'JOIN WITH ME TO START YOUR JOURNEY'], 'text', ['white', 'white', 'white']);

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}

/*-----------------------------x-------------------------------*/

/*----------------------------- animated background-------------------------------*/



const colors = ['', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal', 'charcoal']

const sections = [...document.getElementsByTagName('section')]

window.addEventListener('scroll', function () {

    const scrollFromTop = window.pageYOffset

    for (let i = 0; sections.length > i; i++) {

        if (scrollFromTop <= sections[i].offsetTop) {
            document.body.className = colors[i]
            break
        }

    }

})

/* -------------------------------animated railway----------------------------------------*/
var $railway = $(".railway");
var $list = $railway.find("ul.list");
var $clonedList = $list.clone();
var listWidth = 10;

$list.find("li").each(function (i) {
    listWidth += $(this, i).outerWidth(true);
});

var endPos = $railway.width() - listWidth;

$list.add($clonedList).css({
    "width": listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($railway);

//TimelineMax
var infinite = new TimelineMax({ repeat: -1, paused: true });
var time = 40;

infinite
    .fromTo($list, time, { rotation: 0.01, x: 0 }, { force3D: true, x: -listWidth, ease: Linear.easeNone }, 0)
    .fromTo($clonedList, time, { rotation: 0.01, x: listWidth }, { force3D: true, x: 0, ease: Linear.easeNone }, 0)
    .set($list, { force3D: true, rotation: 0.01, x: listWidth })
    .to($clonedList, time, { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone }, time)
    .to($list, time, { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone }, time)
    .progress(1).progress(0)
    .play();

//Pause/Play		
$railway.on("mouseenter", function () {
    infinite.pause();
}).on("mouseleave", function () {
    infinite.play();
});




/*-----------------women enterprenur------------------*/
document.querySelector(".prevBtn").addEventListener("click", () => {




    changeSlides(-1);
});
document.querySelector(".nextBtn").addEventListener("click", () => {
    changeSlides(1);
});
var slideIndex = 1;
showSlides(slideIndex);
function changeSlides(n) {
    showSlides((slideIndex += n));
}
function currentSlide(n) {
    showSlides((slideIndex = n));
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("Slide");
    var dots = document.getElementsByClassName("Navdot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    Array.from(slides).forEach(item => (item.style.display = "none"));
    Array.from(dots).forEach(
        item => (item.className = item.className.replace(" selected", ""))
    );
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " selected";
}

/*----------------------------- x-------------------------------*/
/*-----------------------------program will help you-------------------------------*/


const items = document.querySelectorAll('.item'),
    controls = document.querySelectorAll('.control'),
    headerItems = document.querySelectorAll('.item-header'),
    descriptionItems = document.querySelectorAll('.item-description'),
    activeDelay = .76,
    interval = 5000;

let current = 0;

const slider = {
    init: () => {
        controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
        controls[current].classList.add('active');
        items[current].classList.add('active');
    },
    nextSlide: () => {
        slider.reset();
        if (current === items.length - 1) current = -1;
        current++;
        controls[current].classList.add('active');
        items[current].classList.add('active');
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
    },
    clickedControl: (e) => {
        slider.reset();
        clearInterval(intervalF);

        const control = e.target,
            dataIndex = Number(control.dataset.index);

        control.classList.add('active');
        items.forEach((item, index) => {
            if (index === dataIndex) {
                item.classList.add('active');
            }
        })
        current = dataIndex;
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
        intervalF = setInterval(slider.nextSlide, interval);
    },
    reset: () => {
        items.forEach(item => item.classList.remove('active'));
        controls.forEach(control => control.classList.remove('active'));
    },
    transitionDelay: (items) => {
        let seconds;

        items.forEach(item => {
            const children = item.childNodes;
            let count = 1,
                delay;

            item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

            children.forEach(child => {
                if (child.classList) {
                    item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
                    child.firstElementChild.style.transitionDelay = `${delay}s`;
                    count++;
                }
            })
        })
    },
}
/*-----------------------------about tejeswani-------------------------------*/

window.onload = function () {
    document.querySelector('.about_modal').className = "about_modal";
}
var c = 0;
function open_close() {
    if (c % 2 == 0) {
        document.querySelector('.about_modal').className = "about_modal";
        c++;

    } else {
        document.querySelector('.about_modal').className = "about_modal about_modal_active";
        c++;
    }
}


/*----------------------------- x-------------------------------*/
/*-----------------------------what people are saying-------------------------------*/

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

$("#slideshow > div:gt(0)").hide();

setInterval(function () {
    $('#slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideshow');
}, 3000);

/*-----------------------------------------------program will help you-----------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    var parent = document.querySelector('.splitview'),
        topPanel = parent.querySelector('.top'),
        handle = parent.querySelector('.handle'),
        skewHack = 0,
        delta = 0;


    if (parent.className.indexOf('skewed') != -1) {
        skewHack = 1000;
    }

    parent.addEventListener('mousemove', function (event) {

        delta = (event.clientX - window.innerWidth / 2) * 0.5;


        handle.style.left = event.clientX + delta + 'px';


        topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
});

/*----------------------------- x-------------------------------*/
/*-----------------------------why should you join-------------------------------*/

var galleryThumbs = new Swiper('.gallery-thumbs', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '2',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },



});


var galleryTop = new Swiper('.swiper-container.join', {
    speed: 400,
    spaceBetween: 50,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    direction: 'vertical',
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
        type: 'bullets',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});

/*-----------------------------------clients--------------------------------------------*/
[...document.querySelectorAll('.single-column')].map(column => {
    column.style.setProperty('--animation', 'slide');
    column.style.setProperty('height', '200%');
    column.innerHTML = column.innerHTML + column.innerHTML;
});



/*--------------------------------------------------------------------------------------*/






