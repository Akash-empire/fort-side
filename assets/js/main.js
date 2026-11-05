(function($) {
    "use strict";
  
    const $documentOn = $(document);
    const $windowOn = $(window);
  
    $documentOn.ready( function() {
        
        /* ================================
       Mobile Menu Js Start
    ================================ */
    
      $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });


     $documentOn.on("click", ".mean-expand", function () {
        let icon = $(this).find("i");

        if (icon.hasClass("fa-plus")) {
            icon.removeClass("fa-plus").addClass("fa-minus"); 
        } else {
            icon.removeClass("fa-minus").addClass("fa-plus"); 
        }
    });

    /* ================================
        Sidebar Toggle & Sticky Item Logic
        ================================ */

        // Open offcanvas
        $(".sidebar__toggle").on("click", function () {
        $(".offcanvas__info").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");

        // Hide sticky item
        $(".sidebar-sticky-item").fadeOut().removeClass("active");
        });

        // Close offcanvas
        $(".offcanvas__close, .offcanvas__overlay").on("click", function () {
        $(".offcanvas__info").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");

        // Show sticky item
        $(".sidebar-sticky-item").fadeIn().addClass("active");
        });

        /* ================================
        Body Overlay Js Start
        ================================ */

        $(".body-overlay").on("click", function () {
        $(".offcanvas__area").removeClass("offcanvas-opened");
        $(".df-search-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");

        // Show sticky item when overlay clicked
        $(".sidebar-sticky-item").fadeIn().addClass("active");
        });

        /* ================================
        Offcanvas Link Click (Optional)
        ================================ */

        $(".offcanvas a").on("click", function () {
        $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    
      /* ================================
       Sticky Header Js Start
    ================================ */

       $windowOn.on("scroll", function () {
        if ($(this).scrollTop() > 250) {
          $("#header-sticky").addClass("sticky");
        } else {
          $("#header-sticky").removeClass("sticky");
        }
      });      


    /*----------------------------------------------
        # Background Color
        ----------------------------------------------*/
        $("[data-bg-color]").each(function () {
            $(this).css("background-color", $(this).attr("data-bg-color"));
        });

        /*----------------------------------------------
        # Background Image
        ----------------------------------------------*/
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });

        /*----------------------------------------------
        # Width
        ----------------------------------------------*/
        $("[data-width]").each(function () {
            $(this).css("width", $(this).attr("data-width"));
        });

        /*----------------------------------------------
        # Text Color
        ----------------------------------------------*/
        $("[data-text-color]").each(function () {
            $(this).css("color", $(this).attr("data-text-color"));
        });
        
       /* ================================
       Video & Image Popup Js Start
    ================================ */

      $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });

      $(".video-popup").magnificPopup({
        type: "iframe",
        callbacks: {},
      });
  
      /* ================================
       Counterup Js Start
    ================================ */

      $(".count").counterUp({
        delay: 15,
        time: 4000,
      });
  
      /* ================================
       Wow Animation Js Start
    ================================ */

      new WOW().init();
  
      /* ================================
       Nice Select Js Start
    ================================ */

    if ($('.single-select').length) {
        $('.single-select').niceSelect();
    }

      /* ================================
      Hover Active Js Start
    ================================ */

    $(".feature-box-items, .contact-info-box-items ").hover(
		// Function to run when the mouse enters the element
		function () {
			// Remove the "active" class from all elements
			$(".feature-box-items, .contact-info-box-items").removeClass("active");
			// Add the "active" class to the currently hovered element
			$(this).addClass("active");
		}
	);

     // Accordion Functionality
    $documentOn.on("click", ".sidebar-header", function () {
        $(this).parent().toggleClass("active");
    });


    /* ================================
      Custom Accordion Js Start
    ================================ */

    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function () {
            var outerBox = $(this).closest('.accordion-box');
            var target = $(this).closest('.accordion');
            var accBtn = $(this);
            var accContent = accBtn.next('.acc-content');

            if (target.hasClass('active-block')) {
                // Already open, so close it
                accBtn.removeClass('active');
                target.removeClass('active-block');
                accContent.slideUp(300);
            } else {
                // Close all others
                outerBox.find('.accordion').removeClass('active-block');
                outerBox.find('.acc-btn').removeClass('active');
                outerBox.find('.acc-content').slideUp(300);

                // Open clicked one
                accBtn.addClass('active');
                target.addClass('active-block');
                accContent.slideDown(300);
            }
        });
    }

     /* ================================
      Hero Slider Js Start
    ================================ */

    if ($('.hero-slider').length > 0) {
        const heroSlider = new Swiper(".hero-slider", {
            loop: true,
            speed: 1000,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
              el: ".dot",
              clickable: true,
          },
        });
    }

     if($('.hero-slider-5').length > 0) {
        const heroSlider5 = new Swiper(".hero-slider-5", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            //Pagination
            pagination: {
                el: ".hero-dot",
                clickable: true,
            },

            speed: 500,
            breakpoints: {
                '1600': {
                    slidesPerView: 1,
                },
                '1200': {
                    slidesPerView: 1,
                },
                '992': {
                    slidesPerView: 1,
                },
                '768': {
                    slidesPerView: 1,
                },
                '576': {
                    slidesPerView: 1,
                },
                '0': {
                    slidesPerView: 1,
                },
            },
        });
    }

     /* ================================
      Head Top Slider Js Start
    ================================ */

    if ($('.head-top-slider').length > 0) {
    const headTopSlider = new Swiper(".head-top-slider", {
        direction: "vertical",
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
    
    });
    
    }

    /* ================================
      Shop Category Slider Js Start
    ================================ */

    if ($('.shop-category-slider').length > 0) {
    const shopCategorySlider = new Swiper(".shop-category-slider", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1599: {
                slidesPerView: 6,
            },
             1399: {
                slidesPerView: 5,
            },
            1199: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 3,
            },
            767: {
                slidesPerView: 2.5,
            },
            575: {
                slidesPerView: 2,
            },
            400: {
                slidesPerView: 1.3,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

    if ($('.shop-category-slider-2').length > 0) {
    const shopCategorySlider2 = new Swiper(".shop-category-slider-2", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 3,
            },
            767: {
                slidesPerView: 2.5,
            },
            575: {
                slidesPerView: 1.4,
            },
            400: {
                slidesPerView: 1,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

    if ($('.ice-category-slider-5').length > 0) {
        const iceCategorySlider5 = new Swiper(".ice-category-slider-5", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dot2",
                clickable: true,
            },
            breakpoints: {
                1429: {
                    slidesPerView: 8,
                },
                1399: {
                    slidesPerView: 7,
                },
                1199: {
                    slidesPerView: 6,
                },
                991: {
                    slidesPerView: 5,
                },
                767: {
                    slidesPerView: 4,
                },
                575: {
                    slidesPerView: 3,
                },
                400: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
        
    }

    if ($('.ice-shop-slider-5').length > 0) {
        const iceShopSlider5 = new Swiper(".ice-shop-slider-5", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dot2",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3.5,
                },
                767: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                400: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }

    if ($('.shop-slider-10').length > 0) {
        const ShopSlider10 = new Swiper(".shop-slider-10", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dot",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3.2,
                },
                991: {
                    slidesPerView: 2.6,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1.5,
                },
                400: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }

     if ($('.shop-slider-10s').length > 0) {
        const ShopSlider10 = new Swiper(".shop-slider-10s", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dots",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3.2,
                },
                991: {
                    slidesPerView: 2.6,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1.5,
                },
                400: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }


    if ($('.news-slider-10').length > 0) {
        const newsSlider10 = new Swiper(".news-slider-10", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dotss",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 3,
                },
                1199: {
                    slidesPerView: 2.7,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1.6,
                },
                575: {
                    slidesPerView: 1.2,
                },
                400: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }

    if (document.querySelectorAll(".news-box-items-11").length) {
    const newsBoxItems11 = document.querySelectorAll(".news-box-items-11");

    newsBoxItems11.forEach((box) => {
        const hoverImg = box.querySelector(".hover-image");
        if (!hoverImg) return;

        box.addEventListener("mousemove", (event) => {
        const rect = box.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hoverImg.style.opacity = "1";
        hoverImg.style.visibility = "visible";
        hoverImg.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
        });

        box.addEventListener("mouseleave", () => {
        hoverImg.style.opacity = "0";
        hoverImg.style.visibility = "hidden";
        hoverImg.style.transform = `translateY(-50%) rotate(0deg)`;
        });
    });
    }



    if ($('.testi-slider-11').length > 0) {
        const testiSlider11 = new Swiper(".testi-slider-11", {
            spaceBetween: 24,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-next",
                prevEl: ".array-prev",
            },
            pagination: {
                el: ".dot2",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 3,
                },
                1199: {
                    slidesPerView: 2.6,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1.5,
                },
                575: {
                    slidesPerView: 1,
                },
                400: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }



     /* ================================
      Gallery Slider Js Start
    ================================ */

    var gallery = new Swiper('.galler-slider', {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: false,
		allowTouchMove: false,
		speed: 5000,
		spaceBetween: 20,
		autoplay: {
			delay: 1,
			disableOnInteraction: true,
		},
		breakpoints: {

			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		a11y: false,
		// Navigation arrows
		navigation: {
			prevEl: '.tp-testimonial-prev',
			nextEl: '.tp-testimonial-next',
		},
	});

     /* ================================
      Testimonial Slider Js Start
    ================================ */

    if ($('.testimonial-slider').length > 0) {
    const testimonialSlider = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dots",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

    if ($('.testimonial-slider-2').length > 0) {
        const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-nexts",
                prevEl: ".array-prevs",
            },
        });
    }

    if($('.testimonial-slider-3').length > 0) {
        const testimonialSlider3 = new Swiper(".testimonial-slider-3", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
           navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    if ($('.testimonial-slider-4').length > 0) {
        const testimonialSlider4 = new Swiper(".testimonial-slider-4", {
            spaceBetween: 30,
            speed: 1300,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                    centeredSlides: false,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            
        });
    }

    if ($('.testi-slider-5').length > 0) {
    const testiSlider5 = new Swiper(".testi-slider-5", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-nexts",
            prevEl: ".array-prevs",
        },
        
    });
    
    }

    if ($('.testi-slider-7').length > 0) {
    const testiSlider7 = new Swiper(".testi-slider-7", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dots",
            clickable: true,
        },
        
    });
    
    }

     /* ================================
     Tea Slider Js Start
    ================================ */

    if ($('.tea-quality-slider-8').length > 0) {
    const teaQualitySlider8 = new Swiper(".tea-quality-slider-8", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 3,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1.4,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

     /* ================================
     News Slider Js Start
    ================================ */

    if ($('.news-slider-5').length > 0) {
    const newsSlider5 = new Swiper(".news-slider-5", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".array-next",
            prevEl: ".array-prev",
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        breakpoints: {
            1499: {
                slidesPerView: 5,
            },
            1399: {
                slidesPerView: 4.2,
            },
            1199: {
                slidesPerView: 3.5,
            },
            991: {
                slidesPerView: 3.4,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1.4,
            },
            400: {
                slidesPerView: 1,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

     if ($('.news-slider-9').length > 0) {
    const newsSlider9 = new Swiper(".news-slider-9", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot2s",
            clickable: true,
        },
        breakpoints: {
            1199: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 1.5,
            },
            575: {
                slidesPerView: 1,
            },
            400: {
                slidesPerView: 1,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    });
    
    }

     /* ================================
      Brand Slider Js Start
    ================================ */

    if ($('.brand-slider-5').length > 0) {
    const brandSlider5 = new Swiper(".brand-slider-5", {
        spaceBetween: 24,
        speed: 1300,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1199: {
                slidesPerView: 6,
            },
            991: {
                slidesPerView: 5,
            },
            767: {
                slidesPerView: 4,
            },
            575: {
                slidesPerView: 3,
            },
            400: {
                slidesPerView: 2,
            },
             0: {
                slidesPerView: 1,
            },
        },
        
    })

      }

       /* ================================
           Circle Progressbar Js Start
        ================================ */

        function animateCircle(el) {

            if (!el || el.classList.contains("animated")) return;

            var percent = parseInt(el.getAttribute("data-percent"), 10);

            if (isNaN(percent) || percent < 0) percent = 0;
            if (percent > 100) percent = 100;

            var circle = el.querySelector(".progress");
            var value  = el.querySelector(".value");

            if (!circle || !value) return;

            var radius = circle.r && circle.r.baseVal
                ? circle.r.baseVal.value
                : circle.getAttribute("r");

            if (!radius) return;

            var circumference = 2 * Math.PI * radius;

            circle.style.strokeDasharray  = circumference;
            circle.style.strokeDashoffset = circumference;

            // Trigger reflow
            circle.getBoundingClientRect();

            var offset = circumference * (1 - percent / 100);

            circle.style.transition      = "stroke-dashoffset 1.2s ease";
            circle.style.strokeDashoffset = offset;

            var count     = 0;
            var duration  = 1200;
            var stepTime  = percent > 0 ? Math.floor(duration / percent) : duration;

            var counter = setInterval(function () {

                if (count >= percent) {
                    clearInterval(counter);
                    el.classList.add("animated");
                } else {
                    count++;
                    value.textContent = count + "%";
                }

            }, stepTime);
        }

        if ("IntersectionObserver" in window) {

            var observer = new IntersectionObserver(function (entries, obs) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        animateCircle(entry.target);
                        obs.unobserve(entry.target);
                    }

                });

            }, {
                threshold: 0.5
            });

            $(".circle-progress").each(function () {
                observer.observe(this);
            });

        } else {

            // Fallback for older browsers
            $(".circle-progress").each(function () {
                animateCircle(this);
            });

        }

     /* ================================
        Countdown Js Start
    ================================ */

    let targetDate = new Date("2026-12-29 00:00:00").getTime();

    const countdownInterval = setInterval(function () {
        let currentDate = new Date().getTime();
        let remainingTime = targetDate - currentDate;

        // Countdown শেষ হলে আবার নতুন target date সেট হবে
        if (remainingTime <= 0) {
            targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);
            remainingTime = targetDate - currentDate;
        }

        let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor(
            (remainingTime % (1000 * 60)) / 1000
        );

        $("#day").text(days.toString().padStart(2, "0"));
        $("#hour").text(hours.toString().padStart(2, "0"));
        $("#min").text(minutes.toString().padStart(2, "0"));
        $("#sec").text(seconds.toString().padStart(2, "0"));

    }, 1000);


        /* ================================
        Quantity Increment/Decrement Js Start
    ================================ */
    const quantityButtons = document.querySelectorAll(".quantityIncrement, .quantityDecrement");
    if (quantityButtons.length) {
        quantityButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const input = button.parentElement.querySelector("input");
                let value = parseInt(input.value, 10) || 0;

                if (button.classList.contains("quantityIncrement")) {
                    input.value = value + 1;
                } else if (button.classList.contains("quantityDecrement") && value > 1) {
                    input.value = value - 1;
                }
            });
        });
    }
    
    
     /* ================================
       Payment Method Update Js Start
    ================================ */

    function updatePaymentMethod() {
        let paymentMethod = $("input[name='pay-method']:checked").val();
        $(".payment").html(paymentMethod);
    }

    // Initial load
    updatePaymentMethod();

    // On click of radio option
    $(".checkout-radio-single input[name='pay-method']").on("change", function () {
        updatePaymentMethod();
    });

     /* ================================
       Additional Quantity Controls Js Start
    ================================ */

    const inputs = document.querySelectorAll('#qty, #qty2, #qty3');
    const btnminus = document.querySelectorAll('.qtyminus');
    const btnplus = document.querySelectorAll('.qtyplus');

    if (inputs.length > 0 && btnminus.length > 0 && btnplus.length > 0) {

        inputs.forEach(function(input, index) {
            const min = Number(input.getAttribute('min'));
            const max = Number(input.getAttribute('max'));
            const step = Number(input.getAttribute('step'));

            function qtyminus(e) {
                const current = Number(input.value);
                const newval = (current - step);
                if (newval < min) {
                    newval = min;
                } else if (newval > max) {
                    newval = max;
                }
                input.value = Number(newval);
                e.preventDefault();
            }

            function qtyplus(e) {
                const current = Number(input.value);
                const newval = (current + step);
                if (newval > max) newval = max;
                input.value = Number(newval);
                e.preventDefault();
            }

            btnminus[index].addEventListener('click', qtyminus);
            btnplus[index].addEventListener('click', qtyplus);
        });
    }



     /* ================================
        Mouse Cursor Animation Js Start
    ================================ */

    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n, i = 0, o = !1;
                    window.onmousemove = function(s) {
                        if (!o) {
                            t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        }
                        e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        n = s.clientY;
                        i = s.clientX;
                    };
                    $("body").on("mouseenter", "button, a, .cursor-pointer", function() {
                        e.classList.add("cursor-hover");
                        t.classList.add("cursor-hover");
                    });
                    $("body").on("mouseleave", "button, a, .cursor-pointer", function() {
                        if (!($(this).is("a", "button") && $(this).closest(".cursor-pointer").length)) {
                            e.classList.remove("cursor-hover");
                            t.classList.remove("cursor-hover");
                        }
                    });
                    e.style.visibility = "visible";
                    t.style.visibility = "visible";
                }
            }
        }
        itCursor();
    }

    /* ================================
        Back To Top Button Js Start
    ================================ */
    $windowOn.on('scroll', function() {
        var windowScrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        if (windowScrollTop + windowHeight >= documentHeight - 10) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    });

    $documentOn.on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

      /* ================================
       Search Popup Toggle Js Start
    ================================ */

    if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function(e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $("body").toggleClass("locked");
        });
    }

     const toggleButtons = document.querySelectorAll(".toggle-password");

        toggleButtons.forEach((button) => {
        const input = button.parentElement.querySelector("input");
        const icon = button.querySelector("i");

        button.addEventListener("click", function () {

            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("fa-eye-slash", "fa-eye");
                button.setAttribute("aria-label", "Hide Password");
            } else {
                input.type = "password";
                icon.classList.replace("fa-eye", "fa-eye-slash");
                button.setAttribute("aria-label", "Show Password");
            }

        });
    });

     $(".private-policy-tab-btn").on("click", function () {

            var target = $(this).data("tab");

            // Active Button
            $(".private-policy-tab-btn").removeClass("active");
            $(this).addClass("active");

            // Active Content
            $(".private-policy-tab-content").removeClass("active");
            $("#" + target).addClass("active");

        });
	
    /* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */
    if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }

     /* ================================
           Image Move scale Js Start
        ================================ */
       const $section = $('.image-moving');
        const $target = $('.tilt_scale');

        if ($section.length && $target.length) {
            let requestId;

            function bindTilt() {
                $section.off('.tiltEffect');

                if ($(window).width() <= 1399) {
                    $target.css({
                        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
                    });
                    return;
                }

                $section.on('mousemove.tiltEffect', function (e) {
                    if (requestId) {
                        cancelAnimationFrame(requestId);
                    }

                    requestId = requestAnimationFrame(() => {
                        const offset = $section.offset();
                        const width = $section.outerWidth();
                        const height = $section.outerHeight();

                        const x = e.pageX - offset.left;
                        const y = e.pageY - offset.top;

                        const rotateY = ((x / width) - 0.5) * 20;
                        const rotateX = ((y / height) - 0.5) * -20;

                        $target.css({
                            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
                        });
                    });
                });

                $section.on('mouseleave.tiltEffect', function () {
                    if (requestId) {
                        cancelAnimationFrame(requestId);
                    }

                    $target.css({
                        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
                    });
                });
            }

            bindTilt();

            $(window).on('resize', bindTilt);
        }

    /* ================================
       Text Anim Js Start
    ================================ */

      if($('.tz-sub-tilte').length) {
      var agtsub = $(".tz-sub-tilte");

      if(agtsub.length == 0) return; gsap.registerPlugin(SplitText); agtsub.each(function(index, el) {

        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "split-line"
        });

        if( $(el).hasClass('tz-sub-anim') ){
          gsap.set(el.split.chars, {
            opacity: 0,
            x: "7",
          });
        }

        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 60%",
            markers: false,
            scrub: 1,
          },

          x: "0",
          y: "0",
          opacity: 1,
          duration: .7,
          stagger: 0.2,
        });

      });
    }

  
    if($('.tz-itm-title').length) {
		var txtheading = $(".tz-itm-title");

    if(txtheading.length == 0) return; gsap.registerPlugin(SplitText); txtheading.each(function(index, el) {

        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "split-line"
        });

        if( $(el).hasClass('tz-itm-anim') ){
          gsap.set(el.split.chars, {
            opacity: .3,
            x: "-7",
          });
        }
        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 60%",
            markers: false,
            scrub: 1,
          },

          x: "0",
          y: "0",
          opacity: 1,
          duration: .7,
          stagger: 0.2,
        });

      });
    }

    if (
        typeof SplitText !== "undefined" &&
        document.querySelectorAll(".split-title").length > 0
        ) {
    document.querySelectorAll(".split-title").forEach((title) => {

        // split by words + chars (IMPORTANT)
        const split = new SplitText(title, {
        type: "words,chars"
        });

        // add class to chars
        split.chars.forEach((char) => {
        char.classList.add("char");
        });

        // GSAP animation
        gsap.to(split.chars, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        clipPath: "inset(0% 0% -15% 0%)",
        x: 0,
        opacity: 1,
        ease: "power4.out",
        stagger: 0.03
        });

    });
    }

       /* ================================
     Clip Animation Js Start
    ================================ */

    const ClipAnimation = {
        init: function () {
        this.createMasks();
        this.animateMasks();
        },

        initialClipPaths: [
        "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
        "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
        "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
        "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
        "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
        "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
        "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
        "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
        "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)"
        ],

        finalClipPaths: [
        "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
        "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
        "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
        "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
        "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
        "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
        "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
        "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
        "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)"
        ],

        createMasks: function () {
        $(".clip-animation").each(function () {
            const $wrapper = $(this);
            const $img = $wrapper.find(".clip-animation-img[data-animate='true']");

            if (!$img.length) return;

            const url = $img.attr("src");

            $wrapper.find(".mask").remove();

            for (let i = 0; i < 9; i++) {
            $("<div>", {
                class: `mask mask-${i + 1}`,
                css: {
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                inset: 0
                }
            }).appendTo($wrapper);
            }
        });
        },

        animateMasks: function () {
        const self = this;

        $(".clip-animation").each(function () {
            const wrapper = this;
            const $masks = $(wrapper).find(".mask");

            if (!$masks.length) return;

            gsap.set($masks.toArray(), {
            clipPath: function (i) {
                return self.initialClipPaths[i];
            }
            });

            const order = [
            [".mask-1"],
            [".mask-2", ".mask-4"],
            [".mask-3", ".mask-5", ".mask-7"],
            [".mask-6", ".mask-8"],
            [".mask-9"]
            ];

            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 75%"
            }
            });

            order.forEach((targets, i) => {
            const elements = targets
                .map(sel => wrapper.querySelector(sel))
                .filter(Boolean);

            if (!elements.length) return;

            tl.to(elements, {
                clipPath: (j, el) =>
                self.finalClipPaths[$masks.toArray().indexOf(el)],
                duration: 1,
                ease: "power4.out",
                stagger: 0.1
            }, i * 0.125);
            });
        });
        }
    };

    ClipAnimation.init();

     /*=============================================
        =            Text Split (GSAP)               =
        =============================================*/
    function initTextSplit() {

        const $elements = $('.tz-split-1');

        if (!$elements.length) return;

        // Check GSAP + SplitText
        if (typeof gsap === "undefined" || typeof SplitText === "undefined") {
            console.warn("GSAP or SplitText not loaded");
            return;
        }

        gsap.registerPlugin(SplitText);

        $elements.each(function () {
            new SplitText(this, {
                type: "words",
                wordsClass: "split-line"
            });
        });
    }

    // Init
    initTextSplit();

     
         if ($('.bz-gsap-animate-circle').length) {
    gsap.utils.toArray('.bz-gsap-animate-circle').forEach((el) => {

        // Accessibility: reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { rotate: 0 });
        return;
        }

        gsap.timeline({
        scrollTrigger: {
            trigger: el,
            scrub: 1,
            start: "top 80%",
            end: "top 20%",
            markers: false
        }
        })
        .set(el, { transformOrigin: "50% 50%" })
        .fromTo(
        el,
        { rotate: 0 },
        { rotate: 180, ease: "none" }
        );
    });
    }

      
     initRipples();

    /*=============================================
        =              Ripples Init               =
    =============================================*/
    function initRipples() {

        $(".ripple-image").each(function () {

            var $container = $(this);
            var $img = $container.find("img").first();

            if (!$img.length) return;

            var img = new Image();
            img.src = $img.attr("src");

            img.onload = function () {

                var imgURL = img.src;

                $container.css({
                    "background-image": "url(" + imgURL + ")",
                    "background-size": "cover",
                    "background-position": "center center"
                });

                if (typeof $container.ripples === "function") {
                    $container.ripples({
                        resolution: 400,
                        perturbance: 0.03,
                        imageUrl: imgURL
                    });
                }

                $img.hide();
            };

        });
    }

        /*=============================================
        =            CLIP ANIMATION FUNCTION           =
        =============================================*/
        function initClipAnimation() {

            const $wrappers = document.querySelectorAll(".tp-clip-anim");
            if (!$wrappers.length) return;

            const observer = new IntersectionObserver(function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const wrapper = entry.target;
                    const img = wrapper.querySelector(".tp-anim-img[data-animate='true']");
                    if (!img) return;

                    const url = img.getAttribute("src");

                    if (getComputedStyle(wrapper).position === "static") {
                        wrapper.style.position = "relative";
                    }

                    wrapper.querySelectorAll(".mask").forEach(function (mask) {
                        mask.remove();
                    });

                    const fragment = document.createDocumentFragment();

                    for (let i = 0; i < 9; i++) {
                        const mask = document.createElement("div");
                        mask.className = "mask mask-" + (i + 1);
                        mask.style.backgroundImage = "url(" + url + ")";
                        fragment.appendChild(mask);
                    }

                    wrapper.appendChild(fragment);
                    observerInstance.unobserve(wrapper);

                });

            }, { threshold: 0.2 });

            $wrappers.forEach(function (wrapper) {
                observer.observe(wrapper);
            });
        }

        // /*=============================================
        // =                 INIT FUNCTION               =
        // =============================================*/
        function init() {
            initClipAnimation();
        }

  
    }); // End Document Ready Function

    /* ================================
      Price Ranage Js Start
    ================================ */

     const $min = $(".range-min");
        const $max = $(".range-max");
        const $text = $(".price-value span");
        const $wrapper = $(".slider-wrapper");

        $wrapper.append('<div class="slider-range"></div>');

        function updateSlider() {

            let minVal = parseInt($min.val());
            let maxVal = parseInt($max.val());

            if (minVal > maxVal - 10) {
                minVal = maxVal - 10;
                $min.val(minVal);
            }

            const max = parseInt($min.attr("max"));

            $(".slider-range").css({
                left: (minVal / max) * 100 + "%",
                width: ((maxVal - minVal) / max) * 100 + "%"
            });

            $text.text(`$${minVal} – $${maxVal}`);
        }

        $(document).on("input", ".range-min, .range-max", function () {
            updateSlider();
        });

        updateSlider();

    
  /* ================================
       Preloader Js Start
    ================================ */
    $windowOn.on('load', function() {
        $(".preloader").fadeOut(600);
    });

  
  })(jQuery); // End jQuery

