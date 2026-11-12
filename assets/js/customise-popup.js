// "Customise as per your taste" popup shown when a food item is added
(function () {
    // Small = listed price, Medium = +25%, Large = +50%
    var SIZES = [
        { name: 'Small', mult: 1 },
        { name: 'Medium', mult: 1.25 },
        { name: 'Large', mult: 1.5 }
    ];

    // v: 1 = veg, 0 = non-veg. p: extra price in C$ (0 = free).
    var FOOD = {
        addons: [
            { n: 'Ketchup', p: 0, v: 1 },
            { n: 'Garlic Mayo', p: 0.99, v: 1 },
            { n: 'Ranch Dip', p: 0.99, v: 1 },
            { n: 'BBQ Sauce', p: 0.99, v: 1 }
        ],
        extras: [
            { n: 'Extra Cheese', p: 1.99, v: 1 },
            { n: 'Jalapeños', p: 0.99, v: 1 },
            { n: 'Grilled Onions', p: 0.99, v: 1 },
            { n: 'Side of Fries', p: 3.99, v: 1 },
            { n: 'Bacon Strips', p: 2.49, v: 0 },
            { n: 'Extra Chicken', p: 4.49, v: 0 }
        ]
    };
    var DRINK = {
        addons: [
            { n: 'Whipped Cream', p: 0.75, v: 1 },
            { n: 'Caramel Drizzle', p: 0.75, v: 1 }
        ],
        extras: [
            { n: 'Extra Espresso Shot', p: 1.25, v: 1 },
            { n: 'Vanilla Syrup', p: 0.75, v: 1 },
            { n: 'Caramel Syrup', p: 0.75, v: 1 },
            { n: 'Hazelnut Syrup', p: 0.75, v: 1 },
            { n: 'Oat Milk', p: 0.99, v: 1 },
            { n: 'Almond Milk', p: 0.99, v: 1 }
        ]
    };
    var DESSERT = {
        addons: [
            { n: 'Whipped Cream', p: 0.75, v: 1 },
            { n: 'Chocolate Drizzle', p: 0.75, v: 1 }
        ],
        extras: [
            { n: 'Scoop of Vanilla Ice Cream', p: 2.49, v: 1 },
            { n: 'Caramel Sauce', p: 0.99, v: 1 }
        ]
    };
    var NONE = { addons: [], extras: [] };
    var BY_CAT = {
        'Burgers': FOOD, 'Homestyle Sandwiches': FOOD, 'Philly Cheesesteaks': FOOD, 'Wraps': FOOD,
        'Fort Side House Specials': FOOD, 'Kids Menu': FOOD, 'Starters': FOOD, 'Pasta': FOOD,
        'Teriyaki Stir-Fry Bowls': FOOD, 'Plant-Based Power Bowls': FOOD, 'Nachos': FOOD,
        'Loaded Fries & Poutine': FOOD,
        'Hot Coffee & Specialty Drinks': DRINK, 'Iced Coffee': DRINK, 'Frappes': DRINK,
        'Smoothies & Milkshakes': DRINK, 'Cold Refreshments': DRINK,
        'Desserts': DESSERT,
        'Bottled & Canned Drinks': NONE, 'Extras': NONE
    };
    var EXTRAS_VISIBLE = 5;

    function money(n) { return 'C$' + (Math.round(n * 100) / 100).toFixed(2); }
    function sizePrice(base, mult) { return Math.round(base * mult * 100) / 100; }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    var overlay = document.createElement('div');
    overlay.className = 'cp-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
        '<div class="cp-modal" role="dialog" aria-modal="true" aria-labelledby="cpTitle">' +
        '<div class="cp-head">' +
        '<p class="cp-sub"></p>' +
        '<h3 class="cp-title" id="cpTitle">Customise as per your taste</h3>' +
        '<button type="button" class="cp-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="cp-body"></div>' +
        '<p class="cp-summary" hidden></p>' +
        '<div class="cp-foot">' +
        '<div><div class="cp-total"></div><button type="button" class="cp-view">View Customized Item</button></div>' +
        '<button type="button" class="cp-submit">Add Item to cart</button>' +
        '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    var subEl = overlay.querySelector('.cp-sub');
    var bodyEl = overlay.querySelector('.cp-body');
    var summaryEl = overlay.querySelector('.cp-summary');
    var totalEl = overlay.querySelector('.cp-total');
    var current = null, cfg = NONE, items = [], base = 0, sel = 0;

    function row(kind, i, name, price, v, checked, hidden) {
        var mark = v === undefined ? '' : '<span class="cp-mark ' + (v ? 'veg' : 'nonveg') + '"></span>';
        var type = kind === 'size' ? 'radio' : 'checkbox';
        return '<label class="cp-row"' + (hidden ? ' hidden data-extra-more' : '') + '>' + mark +
            '<span class="cp-name">' + esc(name) + '</span>' +
            (price ? '<span class="cp-price">' + (kind === 'size' ? '' : '+ ') + money(price) + '</span>' : '') +
            '<input type="' + type + '" name="cp-' + kind + '" data-kind="' + kind + '" value="' + i + '"' + (checked ? ' checked' : '') + '>' +
            '</label>';
    }

    function picked(kind, list) {
        var out = [];
        bodyEl.querySelectorAll('input[data-kind="' + kind + '"]').forEach(function (inp) {
            if (inp.checked) out.push(list[parseInt(inp.value, 10)]);
        });
        return out;
    }

    function update() {
        var size = SIZES[sel];
        var addons = picked('addon', items);
        var total = sizePrice(base, size.mult);
        var names = [size.name];
        addons.forEach(function (a) { total += a.p; names.push(a.n); });
        totalEl.textContent = money(total);
        summaryEl.textContent = names.join(', ');
        overlay._state = { total: total, names: names };
    }

    function openPopup(wrap) {
        var card = wrap.closest('.shop-list-inner');
        var t = card.querySelector('.title');
        var p = card.querySelector('.price');
        current = wrap;
        sel = 0;
        cfg = BY_CAT[card.getAttribute('data-cat')] || FOOD;
        base = parseFloat((p ? p.textContent : '').replace(/[^0-9.]/g, '')) || 0;
        var name = t ? t.textContent.replace(/\s+/g, ' ').trim() : '';
        subEl.textContent = name + ' • ' + money(base);

        var html = '<div class="cp-section-title">Size</div><div class="cp-card">' +
            SIZES.map(function (s, i) { return row('size', i, s.name, sizePrice(base, s.mult), undefined, i === 0); }).join('') +
            '</div>';
        items = cfg.addons.concat(cfg.extras);
        if (items.length) {
            var hiddenCount = Math.max(0, items.length - EXTRAS_VISIBLE);
            html += '<div class="cp-section-title">Add on <span>(optional)</span></div><div class="cp-card">' +
                items.map(function (a, i) { return row('addon', i, a.n, a.p, a.v, false, i >= EXTRAS_VISIBLE); }).join('') +
                (hiddenCount ? '<button type="button" class="cp-more">+ ' + hiddenCount + ' more</button>' : '') +
                '</div>';
        }
        bodyEl.innerHTML = html;
        bodyEl.scrollTop = 0;
        summaryEl.hidden = true;
        update();
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        overlay.hidden = true;
        document.body.style.overflow = '';
        current = null;
    }

    bodyEl.addEventListener('change', function (e) {
        if (e.target.getAttribute('data-kind') === 'size') sel = parseInt(e.target.value, 10);
        update();
    });
    bodyEl.addEventListener('click', function (e) {
        if (e.target.classList.contains('cp-more')) {
            bodyEl.querySelectorAll('[data-extra-more]').forEach(function (r) { r.hidden = false; });
            e.target.hidden = true;
        }
    });
    overlay.querySelector('.cp-view').addEventListener('click', function () { summaryEl.hidden = !summaryEl.hidden; });
    overlay.querySelector('.cp-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePopup(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) closePopup(); });

    overlay.querySelector('.cp-submit').addEventListener('click', function () {
        if (!current) return;
        var wrap = current;
        var st = overlay._state;
        var tag = wrap.querySelector('.qty-size');
        if (!tag) {
            tag = document.createElement('span');
            tag.className = 'qty-size';
            wrap.appendChild(tag);
        }
        tag.textContent = st.names.join(', ') + ' · ' + money(st.total);
        tag.hidden = false;
        wrap.querySelector('.qty-val').textContent = '1';
        wrap.querySelector('.add-cart-btn').hidden = true;
        wrap.querySelector('.qty-stepper').hidden = false;
        wrap.querySelector('.qty-cart').hidden = false;
        closePopup();
    });

    document.querySelectorAll('.qty-wrap').forEach(function (wrap) {
        var add = wrap.querySelector('.add-cart-btn');
        var step = wrap.querySelector('.qty-stepper');
        var val = wrap.querySelector('.qty-val');
        var cart = wrap.querySelector('.qty-cart');
        add.addEventListener('click', function () { openPopup(wrap); });
        wrap.querySelector('.qty-inc').addEventListener('click', function () { val.textContent = String(parseInt(val.textContent, 10) + 1); });
        wrap.querySelector('.qty-dec').addEventListener('click', function () {
            var n = parseInt(val.textContent, 10) - 1;
            if (n < 1) {
                step.hidden = true; cart.hidden = true; add.hidden = false; val.textContent = '1';
                var tag = wrap.querySelector('.qty-size');
                if (tag) tag.hidden = true;
            } else { val.textContent = String(n); }
        });
    });
})();
