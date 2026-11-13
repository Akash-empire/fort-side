/**
 * Fort Side Cafe & Grill
 * Sign In / Sign Up popup.
 * Opens from the header user icon and from any link to sign-in.html / sign-up.html.
 * Front-end only: there is no backend yet, so a successful submit just stores a
 * local "logged in" flag and sends the visitor to their profile page.
 */
(function () {
    "use strict";

    var FLAG = "fortside_logged_in";
    var overlay = null;
    var lastFocus = null;

    function isLoggedIn() {
        try { return localStorage.getItem(FLAG) === "1"; } catch (e) { return false; }
    }
    function setLoggedIn() {
        try { localStorage.setItem(FLAG, "1"); } catch (e) { /* ignore */ }
    }

    function loadCss() {
        if (document.getElementById("ap-css")) return;
        var l = document.createElement("link");
        l.id = "ap-css";
        l.rel = "stylesheet";
        l.href = "assets/css/auth-popup.css";
        document.head.appendChild(l);
    }

    function eyeField(id, placeholder) {
        return '<div class="ap-password">' +
            '<input type="password" id="' + id + '" placeholder="' + placeholder + '" autocomplete="' + (id === "ap-si-pass" ? "current-password" : "new-password") + '">' +
            '<button type="button" class="ap-eye" aria-label="Show password"><i class="fa-regular fa-eye-slash"></i></button>' +
            '</div>';
    }

    function build() {
        overlay = document.createElement("div");
        overlay.className = "ap-overlay";
        overlay.hidden = true;
        overlay.innerHTML =
            '<div class="ap-modal" role="dialog" aria-modal="true" aria-labelledby="ap-title">' +
            '<button type="button" class="ap-close" aria-label="Close"><i class="fa-regular fa-xmark"></i></button>' +
            '<div class="ap-head">' +
            '<img src="assets/img/logo/fort-side-logo-90h.png" alt="Fort Side Caf&eacute; &amp; Grill" class="ap-logo">' +
            '<h2 id="ap-title" class="ap-title">Welcome Back!</h2>' +
            '<p class="ap-sub">Sign in to your account and join us</p>' +
            '</div>' +
            '<div class="ap-tabs" role="tablist">' +
            '<button type="button" class="ap-tab active" data-ap-tab="signin" role="tab">Sign In</button>' +
            '<button type="button" class="ap-tab" data-ap-tab="signup" role="tab">Sign Up</button>' +
            '</div>' +

            '<form class="ap-form" data-ap-form="signin" novalidate>' +
            '<div class="ap-group"><label for="ap-si-email">Email</label>' +
            '<input type="email" id="ap-si-email" placeholder="Your email ID here" autocomplete="email"></div>' +
            '<div class="ap-group"><label for="ap-si-pass">Password</label>' + eyeField("ap-si-pass", "Enter your password") + '</div>' +
            '<div class="ap-row"><a href="#" data-ap-tab="forgot">Forgot password?</a></div>' +
            '<p class="ap-error" hidden></p>' +
            '<button type="submit" class="ap-submit">Sign In</button>' +
            '<p class="ap-switch">Don&rsquo;t have an account? <a href="#" data-ap-tab="signup">Sign Up</a></p>' +
            '</form>' +

            '<form class="ap-form" data-ap-form="signup" novalidate hidden>' +
            '<div class="ap-cols">' +
            '<div class="ap-group"><label for="ap-su-first">First Name</label><input type="text" id="ap-su-first" placeholder="First name" autocomplete="given-name"></div>' +
            '<div class="ap-group"><label for="ap-su-last">Last Name</label><input type="text" id="ap-su-last" placeholder="Last name" autocomplete="family-name"></div>' +
            '</div>' +
            '<div class="ap-group"><label for="ap-su-email">Email</label>' +
            '<input type="email" id="ap-su-email" placeholder="Your email ID here" autocomplete="email"></div>' +
            '<div class="ap-group"><label for="ap-su-pass">Password</label>' + eyeField("ap-su-pass", "Create a password (min. 6 characters)") + '</div>' +
            '<p class="ap-error" hidden></p>' +
            '<button type="submit" class="ap-submit">Create Account</button>' +
            '<p class="ap-switch">Already have an account? <a href="#" data-ap-tab="signin">Sign In</a></p>' +
            '</form>' +
            '<form class="ap-form" data-ap-form="forgot" novalidate hidden>' +
            '<div class="ap-group"><label for="ap-fp-email">Email</label>' +
            '<input type="email" id="ap-fp-email" placeholder="Your email ID here" autocomplete="email"></div>' +
            '<p class="ap-error" hidden></p>' +
            '<p class="ap-success" hidden></p>' +
            '<button type="submit" class="ap-submit">Send Reset Link</button>' +
            '<p class="ap-switch">Remembered it? <a href="#" data-ap-tab="signin">Back to Sign In</a></p>' +
            '</form>';
        document.body.appendChild(overlay);

        overlay.addEventListener("mousedown", function (e) {
            if (e.target === overlay) close();
        });
        overlay.querySelector(".ap-close").addEventListener("click", close);

        overlay.addEventListener("click", function (e) {
            var t = e.target.closest("[data-ap-tab]");
            if (t) {
                e.preventDefault();
                show(t.getAttribute("data-ap-tab"));
                return;
            }
            var eye = e.target.closest(".ap-eye");
            if (eye) {
                var input = eye.parentNode.querySelector("input");
                var show_ = input.type === "password";
                input.type = show_ ? "text" : "password";
                eye.querySelector("i").className = show_ ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
            }
        });

        overlay.querySelectorAll(".ap-form").forEach(function (f) {
            f.addEventListener("submit", onSubmit);
        });
    }

    function show(which) {
        which = which === "signup" || which === "forgot" ? which : "signin";
        var TEXT = {
            signin: ["Welcome Back!", "Sign in to your account and join us"],
            signup: ["Let\u2019s Get Started!", "Create your account to order faster"],
            forgot: ["Forgot Password?", "Enter your email and we\u2019ll send you a link to reset it"]
        };
        overlay.querySelector(".ap-tabs").hidden = which === "forgot";
        overlay.querySelectorAll(".ap-tab").forEach(function (b) {
            var on = b.getAttribute("data-ap-tab") === which;
            b.classList.toggle("active", on);
            b.setAttribute("aria-selected", on ? "true" : "false");
        });
        overlay.querySelectorAll(".ap-form").forEach(function (form) {
            form.hidden = form.getAttribute("data-ap-form") !== which;
        });
        overlay.querySelector("#ap-title").textContent = TEXT[which][0];
        overlay.querySelector(".ap-sub").textContent = TEXT[which][1];
        overlay.querySelectorAll(".ap-error, .ap-success").forEach(function (p) { p.hidden = true; });
        var first = overlay.querySelector(".ap-form:not([hidden]) input");
        if (first) first.focus();
    }

    function onSubmit(e) {
        e.preventDefault();
        var form = e.currentTarget;
        var err = form.querySelector(".ap-error");
        var type = form.getAttribute("data-ap-form");
        var isSignup = type === "signup";
        var isForgot = type === "forgot";
        var email = form.querySelector('input[type="email"]').value.trim();
        var passInput = form.querySelector(".ap-password input");
        var pass = passInput ? passInput.value : "";
        var msg = "";

        if (isSignup && (!form.querySelector("#ap-su-first").value.trim() || !form.querySelector("#ap-su-last").value.trim())) {
            msg = "Please enter your first and last name.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msg = "Please enter a valid email address.";
        } else if (!isForgot && (!pass || (isSignup && pass.length < 6))) {
            msg = isSignup ? "Password must be at least 6 characters." : "Please enter your password.";
        }

        if (msg) {
            err.textContent = msg;
            err.hidden = false;
            var ok = form.querySelector(".ap-success");
            if (ok) ok.hidden = true;
            return;
        }
        err.hidden = true;

        if (isForgot) {
            var okMsg = form.querySelector(".ap-success");
            okMsg.textContent = "If an account exists for " + email + ", a password reset link is on its way.";
            okMsg.hidden = false;
            return;
        }
        setLoggedIn();
        window.location.href = "profile.html";
    }

    function open(which) {
        loadCss();
        if (!overlay) build();
        lastFocus = document.activeElement;
        overlay.hidden = false;
        document.documentElement.classList.add("ap-lock");
        show(which || "signin");
    }

    function close() {
        if (!overlay) return;
        overlay.hidden = true;
        document.documentElement.classList.remove("ap-lock");
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay && !overlay.hidden) close();
    });

    // Delegated, so it also works for the dynamically loaded header
    document.addEventListener("click", function (e) {
        var a = e.target.closest("a[href]");
        if (!a || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) return;
        var href = a.getAttribute("href");
        if (a.closest(".ap-overlay")) return;

        if (href === "sign-in.html") {
            e.preventDefault(); open("signin");
        } else if (href === "forget-password.html") {
            e.preventDefault(); open("forgot");
        } else if (href === "sign-up.html") {
            e.preventDefault(); open("signup");
        } else if (href === "profile.html" && a.classList.contains("shop-icon") && !isLoggedIn()) {
            e.preventDefault(); open("signin");
        }
    });

    window.FortSideAuth = { open: open, close: close };
})();
