/**
 * Fort Side Cafe & Grill
 * Common Header and Footer Loader
 * Loads header.html and footer.html into elements with ID #header-placeholder and #footer-placeholder (or #header, #footer)
 */
(function ($) {
    "use strict";

    function initHeaderPlugins() {
        // Mobile Menu (MeanMenu)
        if ($.fn.meanmenu && $('#mobile-menu').length) {
            $('.mean-bar, .mean-push').remove();
            $('#mobile-menu').meanmenu({
                meanMenuContainer: '.mobile-menu',
                meanScreenWidth: "1199",
                meanExpand: ['<i class="far fa-plus"></i>'],
            });
        }

        // Active page navigation link highlighting
        highlightActiveLink();

        // Background-image data attribute
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    }

    function highlightActiveLink() {
        const path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page || page === "") {
            page = "index.html";
        }

        $(".main-menu ul li, .mobile-menu ul li").removeClass("active");

        $(".main-menu nav > ul > li").each(function () {
            const $li = $(this);
            const linkHref = $li.children("a").attr("href");

            if (linkHref === page) {
                $li.addClass("active");
            } else if (page === "index.html" && (linkHref === "index.html" || (linkHref === "javascript:void(0)" && $li.find(".menu-thumb").length))) {
                $li.addClass("active");
            } else {
                $li.find("a").each(function () {
                    if ($(this).attr("href") === page) {
                        $li.addClass("active");
                    }
                });
            }
        });
    }

    // Delegated offcanvas event handlers (always active, even after dynamic injection)
    $(document).off("click.headerSidebar").on("click.headerSidebar", ".sidebar__toggle", function () {
        $(".offcanvas__info").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");
        $(".sidebar-sticky-item").fadeOut().removeClass("active");
    });

    $(document).off("click.headerClose").on("click.headerClose", ".offcanvas__close, .offcanvas__overlay", function () {
        $(".offcanvas__info").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");
        $(".sidebar-sticky-item").fadeIn().addClass("active");
    });

    $(document).ready(function () {
        const $header = $("#header-placeholder, #header, #header-area");
        const $footer = $("#footer-placeholder, #footer, #footer-area");

        if ($header.length) {
            $header.load("header.html", function (response, status, xhr) {
                if (status === "success" || status === "notmodified") {
                    initHeaderPlugins();
                } else {
                    console.error("Failed to load header.html:", status, xhr.statusText);
                }
            });
        }

        if ($footer.length) {
            $footer.load("footer.html", function (response, status, xhr) {
                if (status === "success" || status === "notmodified") {
                    if (typeof WOW !== "undefined") {
                        new WOW().init();
                    }
                } else {
                    console.error("Failed to load footer.html:", status, xhr.statusText);
                }
            });
        }
    });

})(jQuery);
