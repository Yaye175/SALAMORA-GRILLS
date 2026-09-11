/* =============================================================
   SALAMORA GRILLS — app logic
   No framework, no build step. Data comes from config.js + menu.js.
   ============================================================= */
(function () {
  'use strict';

  var CFG  = window.SALAMORA;
  var DATA = window.SALAMORA_MENU;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DAYS      = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var DAYS_SHORT= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  /* ---------------------------------------------------------
     FORMATTING
  --------------------------------------------------------- */
  function naira(n) {
    return '₦' + Number(n).toLocaleString('en-NG');
  }

  function pretty12(hhmm) {
    var p = hhmm.split(':'), h = +p[0], m = +p[1];
    var ap = h >= 12 ? 'pm' : 'am';
    var hh = h % 12; if (hh === 0) hh = 12;
    return hh + (m ? ':' + String(m).padStart(2, '0') : '') + ap;
  }

  /* ---------------------------------------------------------
     WHATSAPP
     Every order path on this site funnels into one prefilled chat.
  --------------------------------------------------------- */
  function waLink(lines) {
    var body = (Array.isArray(lines) ? lines.join('\n') : String(lines));
    return 'https://wa.me/' + CFG.contact.whatsapp + '?text=' + encodeURIComponent(body);
  }
  function openWA(lines) {
    window.open(waLink(lines), '_blank', 'noopener');
  }
  var HELLO = 'Hello Salamora Grills 👋';

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3200);
  }

  /* ---------------------------------------------------------
     OPENING HOURS — evaluated in Africa/Lagos, never the
     visitor's local timezone.
  --------------------------------------------------------- */
  function toMin(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }

  function lagosNow() {
    var fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: CFG.hours.timeZone,
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });
    var p = {};
    fmt.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var day = DAYS_SHORT.indexOf(p.weekday);
    if (day < 0) day = new Date().getDay(); // engine fallback
    return { day: day, mins: (+p.hour) * 60 + (+p.minute) };
  }

  function slot(day) { return CFG.hours.week[(day + 7) % 7] || null; }

  // `close: '00:00'` means midnight at the END of the day, so the day runs
  // right up to the handover point rather than closing in the small hours.
  function closesAtMidnight(sl) { return !!sl && !sl.allDay && sl.close === '00:00'; }

  // A day hands over to the next only if that next day starts at midnight.
  function picksUpAtMidnight(sl) { return !!sl && (sl.allDay || sl.open === '00:00'); }

  /**
   * Days join into one continuous run when each hands over to the next at
   * midnight, so Friday 09:00 -> Saturday -> Sunday 24:00 is one unbroken
   * stretch. Returns the index of the day the run finishes on.
   */
  function runEndsOn(day) {
    for (var i = 0; i < 7; i++) {
      var cur = slot(day);
      if (!cur || !(cur.allDay || closesAtMidnight(cur))) break;
      var next = slot(day + 1);
      if (!picksUpAtMidnight(next)) break;
      day = day + 1;
      if (!next.allDay) break; // opens at midnight but closes during that day
    }
    return (day + 7) % 7;
  }

  function openState() {
    var now = lagosNow();
    var today = slot(now.day);
    var yday = slot(now.day - 1);

    // A timed shift that started yesterday and runs past midnight.
    if (yday && !yday.allDay) {
      var yo = toMin(yday.open), yc = toMin(yday.close);
      if (yc <= yo && now.mins < yc) {
        return { open: true, until: yday.close };
      }
    }

    if (today) {
      if (today.allDay) {
        return { open: true, allDay: true, runEnd: runEndsOn(now.day) };
      }
      var o = toMin(today.open), c = toMin(today.close);
      var isOpen = (c > o) ? (now.mins >= o && now.mins < c) : (now.mins >= o);
      if (isOpen) {
        var end = runEndsOn(now.day);
        // A day that runs to midnight and hands over stays open past today.
        if (end !== now.day) return { open: true, runEnd: end };
        return { open: true, until: today.close };
      }
      if (now.mins < o) return { open: false, nextDay: now.day, nextAt: today.open };
    }

    // Scan forward for the next opening.
    for (var i = 1; i <= 7; i++) {
      var sl = slot(now.day + i);
      if (sl) {
        return {
          open: false,
          nextDay: (now.day + i) % 7,
          nextAt: sl.allDay ? '00:00' : sl.open
        };
      }
    }
    return { open: false };
  }

  function renderStatus() {
    var st = openState();
    var pip  = $('#statusPip');
    var nowL = $('#statusNow');
    var nxtL = $('#statusNext');
    var bar  = $('#hdrStatus');
    if (!pip) return;

    var now = lagosNow();
    if (st.open) {
      pip.className = 'status__pip is-open';
      nowL.textContent = 'Open now';
      var detail;
      if (st.runEnd != null && st.runEnd !== now.day) {
        detail = (st.allDay ? 'Open 24 hours through ' : 'Open through ') + DAYS[st.runEnd];
      } else if (st.allDay) {
        detail = 'Open 24 hours today';
      } else {
        detail = 'Kitchen closes ' + pretty12(st.until);
      }
      nxtL.textContent = detail;
      if (bar) {
        bar.hidden = false;
        bar.className = 'hdr__status is-open';
        bar.textContent = '● Open now · ' + detail.replace(/^Kitchen c/, 'c') + ' · ordering live';
      }
    } else {
      pip.className = 'status__pip is-closed';
      nowL.textContent = 'Closed right now';
      if (st.nextAt != null) {
        var when = (st.nextDay === now.day) ? 'today' :
                   (st.nextDay === (now.day + 1) % 7) ? 'tomorrow' : DAYS[st.nextDay];
        nxtL.textContent = 'Opens ' + when + ' at ' + pretty12(st.nextAt);
        if (bar) {
          bar.hidden = false;
          bar.className = 'hdr__status';
          bar.textContent = '● Closed · opens ' + when + ' ' + pretty12(st.nextAt) + ' · pre-orders welcome';
        }
      } else {
        nxtL.textContent = 'Check WhatsApp for hours';
      }
    }

    // Hours table
    var tb = $('#hoursTable tbody');
    if (tb) {
      tb.innerHTML = '';
      for (var i = 0; i < 7; i++) {
        var d = (1 + i) % 7; // start the week on Monday
        var s = slot(d);
        var tr = document.createElement('tr');
        if (d === now.day) tr.className = 'is-today';
        var rolls = closesAtMidnight(s) && picksUpAtMidnight(slot(d + 1));
        var when = !s ? 'Closed'
                 : s.allDay ? 'Open 24 hours'
                 : rolls ? 'From ' + pretty12(s.open)
                 : pretty12(s.open) + ' – ' + pretty12(s.close);
        tr.innerHTML = '<td>' + DAYS[d] + '</td><td>' + when + '</td>';
        tb.appendChild(tr);
      }
    }
  }

  /* ---------------------------------------------------------
     HEADER + NAV
  --------------------------------------------------------- */
  function initHeader() {
    var hdr = $('#hdr'), nav = $('#nav'), burger = $('#burger');

    var onScroll = function () {
      hdr.classList.toggle('is-stuck', window.scrollY > 12);
      var fab = $('#fab');
      if (fab) fab.classList.toggle('is-on', window.scrollY > 560);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // The floating order button must not sit on top of a form field or duplicate
    // a CTA that is already visible.
    var fab = $('#fab');
    var rivals = ['#tally', '#lead'].map(function (s) { return $(s); }).filter(Boolean);
    if (fab && rivals.length && 'IntersectionObserver' in window) {
      var showing = 0;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { showing += e.isIntersecting ? 1 : -1; });
        showing = Math.max(0, showing);
        fab.classList.toggle('is-muted', showing > 0);
      }, { rootMargin: '-80px 0px -80px 0px' });
      rivals.forEach(function (el) { io.observe(el); });
    }

    function setNav(open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
    $$('#nav a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------------------------------------------------------
     TICKER
  --------------------------------------------------------- */
  function initTicker() {
    var track = $('#tickerTrack');
    if (!track) return;
    var html = CFG.ticker.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    track.innerHTML = html + html; // duplicated for a seamless loop
    if (REDUCED) track.style.animation = 'none';
  }

  /* ---------------------------------------------------------
     PICTURE TILE
     Renders a real <img> when a path exists, otherwise a styled
     grill-grate placeholder (never a broken image icon).
  --------------------------------------------------------- */
  function picture(item, cls) {
    if (item.img) {
      return '<div class="' + cls + '"><img src="' + item.img + '" alt="' + item.name +
             '" loading="lazy" decoding="async"></div>';
    }
    return '<div class="' + cls + '"><span class="dish__ph">Photo pending</span></div>';
  }

  /* ---------------------------------------------------------
     HERO CAROUSEL
  --------------------------------------------------------- */
  function initCarousel() {
    var track = $('#carTrack'), dots = $('#carDots');
    if (!track) return;

    var picks = DATA.items.filter(function (i) { return i.featured; });
    if (!picks.length) picks = DATA.items.slice(0, 3);

    track.innerHTML = picks.map(function (it, i) {
      return '<article class="slide" role="group" aria-roledescription="slide" ' +
             'aria-label="' + (i + 1) + ' of ' + picks.length + '">' +
             picture(it, 'slide__pic') +
             '<div class="slide__body">' +
               '<h3 class="slide__name">' + it.name + '</h3>' +
               '<p class="slide__meta">' + it.serves + ' · ' + it.count + ' item' + (it.count > 1 ? 's' : '') + '</p>' +
               '<p class="slide__price">' + naira(it.price) + '</p>' +
             '</div></article>';
    }).join('');

    dots.innerHTML = picks.map(function (it, i) {
      return '<button type="button" role="tab" aria-selected="' + (i === 0) +
             '" aria-label="' + it.name + '"></button>';
    }).join('');

    var btns = $$('button', dots);
    var idx = 0, paused = false;

    function goto(i) {
      idx = (i + picks.length) % picks.length;
      var card = track.children[idx];
      if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: REDUCED ? 'auto' : 'smooth' });
      btns.forEach(function (b, n) { b.setAttribute('aria-selected', String(n === idx)); });
    }

    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { paused = true; goto(i); });
    });

    // Keep dots honest when the user swipes the track directly.
    var settle;
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var best = 0, min = Infinity;
        Array.prototype.forEach.call(track.children, function (c, i) {
          var d = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (d < min) { min = d; best = i; }
        });
        idx = best;
        btns.forEach(function (b, n) { b.setAttribute('aria-selected', String(n === idx)); });
      }, 90);
    }, { passive: true });

    track.addEventListener('pointerdown', function () { paused = true; });

    // The track is a horizontally scrollable region, so it needs keyboard
    // control as well as a pointer (WCAG 2.1.1).
    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      paused = true;
      goto(idx + (e.key === 'ArrowRight' ? 1 : -1));
    });

    if (!REDUCED) {
      setInterval(function () {
        if (!paused && !document.hidden) goto(idx + 1);
      }, 4500);
    }
  }

  /* ---------------------------------------------------------
     MENU — tabs + grid
  --------------------------------------------------------- */
  function initMenu() {
    var tabsEl = $('#tabs'), grid = $('#menuGrid');
    if (!tabsEl) return;

    var cats = DATA.categories.concat([{ id: 'all', label: 'Everything', short: 'All' }]);
    // Mora Meat Combos open first: the signature line, the one with the most
    // photography, and short enough to keep the initial mobile page sane.
    // 'Everything' is one tap away, last in the row.
    var DEFAULT_CAT = cats[0].id;

    tabsEl.innerHTML = cats.map(function (c) {
      return '<button class="tab" type="button" role="tab" data-cat="' + c.id +
             '" aria-selected="' + (c.id === DEFAULT_CAT) + '">' + c.label + '</button>';
    }).join('');

    function render(cat) {
      var list = (cat === 'all') ? DATA.items : DATA.items.filter(function (i) { return i.cat === cat; });
      grid.innerHTML = list.map(function (it, i) {
        var tag = it.tags && it.tags[0];
        return '<button class="dish" type="button" data-name="' + it.name + '" data-price="' + it.price +
               '" style="animation-delay:' + Math.min(i * 26, 320) + 'ms">' +
          (tag ? '<span class="tag tag--' + tag + '">' + tag + '</span>' : '') +
          picture(it, 'dish__pic') +
          '<div class="dish__body">' +
            '<div class="dish__top">' +
              '<h3 class="dish__name">' + it.name + '</h3>' +
              '<span class="dish__price">' + naira(it.price) + '</span>' +
            '</div>' +
            '<p class="dish__desc">' + it.desc + '</p>' +
            '<div class="dish__foot">' +
              '<span class="dish__meta">' + it.serves + ' · ' + it.count + ' item' + (it.count > 1 ? 's' : '') + '</span>' +
              '<span class="dish__cta">Order</span>' +
            '</div>' +
          '</div></button>';
      }).join('');
    }

    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.tab');
      if (!b) return;
      $$('.tab', tabsEl).forEach(function (t) { t.setAttribute('aria-selected', String(t === b)); });
      render(b.dataset.cat);
    });

    grid.addEventListener('click', function (e) {
      var d = e.target.closest('.dish');
      if (!d) return;
      openWA([
        HELLO,
        'I would like to order:',
        '',
        '• ' + d.dataset.name + ' — ' + naira(d.dataset.price),
        '',
        'Is this available now?'
      ]);
      toast('Opening WhatsApp…');
    });

    render(DEFAULT_CAT);
  }

  /* ---------------------------------------------------------
     BUILD YOUR MORA COMBO
     Mirrors the Mora Meat Combos section of the real menu: any base
     plus Mora Meat or Chicken is one price, "Mixture of 2" carries a
     small upcharge, and extras are priced from the Extras list.
  --------------------------------------------------------- */
  function initBuilder() {
    var B = DATA.builder;
    var form = $('#builder');
    if (!form) return;

    var qty = 1;

    $('#optBase').innerHTML = B.bases.map(function (b) {
      return '<label class="opt"><input type="radio" name="base" value="' + b.id + '">' +
        '<span class="opt__box"></span>' +
        '<span class="opt__t"><span class="opt__n">' + b.name + '</span>' +
        '<span class="opt__s">' + b.note + '</span></span>' +
        '<span class="opt__p">' + naira(b.price) + '</span></label>';
    }).join('');

    $('#optProtein').innerHTML = B.proteins.map(function (p) {
      return '<label class="opt"><input type="radio" name="protein" value="' + p.id + '">' +
        '<span class="opt__box"></span>' +
        '<span class="opt__t"><span class="opt__n">' + p.name + '</span>' +
        '<span class="opt__s">' + p.note + '</span></span>' +
        '<span class="opt__p">' + (p.price ? '+' + naira(p.price) : 'Included') + '</span></label>';
    }).join('');

    $('#optExtras').innerHTML = B.extras.map(function (x) {
      return '<label class="opt"><input type="checkbox" name="extra" value="' + x.id + '">' +
        '<span class="opt__box"></span>' +
        '<span class="opt__t"><span class="opt__n">' + x.name + '</span></span>' +
        '<span class="opt__p">+' + naira(x.price) + '</span></label>';
    }).join('');

    function byId(arr, id) {
      for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
      return null;
    }

    function state() {
      var b = form.querySelector('input[name=base]:checked');
      var p = form.querySelector('input[name=protein]:checked');
      return {
        base: b ? byId(B.bases, b.value) : null,
        protein: p ? byId(B.proteins, p.value) : null,
        extras: $$('input[name=extra]:checked', form).map(function (i) { return byId(B.extras, i.value); })
      };
    }

    function unitPrice(s) {
      var t = s.base ? s.base.price : 0;
      if (s.protein) t += s.protein.price;
      s.extras.forEach(function (x) { t += x.price; });
      return t;
    }

    function update() {
      var s = state();
      var n = s.extras.length;

      var cnt = $('#extraCount');
      cnt.textContent = n ? n + ' added' : 'Optional';
      cnt.classList.toggle('is-done', n > 0);
      $('#extraHint').textContent = n
        ? 'Added to your combo.'
        : 'Skip this step if you like.';
      $('#extraHint').classList.toggle('is-warn', false);

      var rows = [];
      if (s.base) {
        rows.push(['<strong>' + s.base.name + '</strong>', naira(s.base.price)]);
        if (s.protein) rows.push([s.protein.name, s.protein.price ? '+' + naira(s.protein.price) : 'incl.']);
        s.extras.forEach(function (x) { rows.push([x.name, '+' + naira(x.price)]); });
      }

      $('#tallyList').innerHTML = rows.length
        ? rows.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('')
        : '<li class="empty">Nothing picked yet…</li>';

      $('#tallyTotal').textContent = naira(unitPrice(s) * qty);
      $('#qtyVal').textContent = qty;

      var ready = !!s.base && !!s.protein;
      $('#builderSend').disabled = !ready;
      $('#builderMsg').textContent = ready
        ? 'You\u2019ll get a chat with this combo already written out.'
        : (!s.base ? 'Pick a base to start.' : 'Now choose your protein.');
    }

    form.addEventListener('change', update);
    $('#qtyUp').addEventListener('click', function () { qty = Math.min(qty + 1, 20); update(); });
    $('#qtyDown').addEventListener('click', function () { qty = Math.max(qty - 1, 1); update(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = state();
      if (!s.base || !s.protein) return;
      var lines = [
        HELLO,
        'I built a combo on your site:',
        '',
        'Base: ' + s.base.name,
        'Protein: ' + s.protein.name
      ];
      if (s.extras.length) {
        lines.push('Extras: ' + s.extras.map(function (x) { return x.name; }).join(', '));
      }
      lines.push(
        'Quantity: ' + qty,
        '',
        'Estimated total: ' + naira(unitPrice(s) * qty),
        '(Website estimate \u2014 please confirm the final price.)'
      );
      openWA(lines);
      toast('Opening WhatsApp\u2026');
    });

    update();
  }

  /* ---------------------------------------------------------
     CATERING LEAD FORM
     No backend exists. This composes a WhatsApp message instead
     of silently dropping the enquiry into a dead <form action>.
  --------------------------------------------------------- */
  function initLead() {
    var form = $('#lead');
    if (!form) return;

    function setErr(input, msg) {
      var fld = input.closest('.fld');
      var err = fld.querySelector('.fld__e');
      fld.classList.toggle('is-bad', !!msg);
      if (err) err.textContent = msg || '';
      return !msg;
    }

    var checks = [
      ['#ldName',   function (v) { return v.trim().length >= 2 ? '' : 'Tell us who to call you.'; }],
      ['#ldPhone',  function (v) { return v.replace(/\D/g, '').length >= 10 ? '' : 'Enter a reachable phone number.'; }],
      ['#ldGuests', function (v) { return (+v >= 10) ? '' : 'Minimum 10 guests for catering.'; }]
    ];

    checks.forEach(function (c) {
      var el = $(c[0]);
      el.addEventListener('blur', function () { setErr(el, c[1](el.value)); });
      el.addEventListener('input', function () {
        if (el.closest('.fld').classList.contains('is-bad')) setErr(el, c[1](el.value));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      checks.forEach(function (c) {
        var el = $(c[0]);
        if (!setErr(el, c[1](el.value))) { ok = false; if (!first) first = el; }
      });
      if (!ok) { first.focus(); toast('Check the highlighted fields'); return; }

      var lines = [
        HELLO,
        'Catering enquiry from your website:',
        '',
        'Name: ' + $('#ldName').value.trim(),
        'Phone: ' + $('#ldPhone').value.trim(),
        'Event: ' + $('#ldType').value,
        'Guests: ' + $('#ldGuests').value
      ];
      if ($('#ldDate').value) lines.push('Date: ' + $('#ldDate').value);
      if ($('#ldArea').value.trim()) lines.push('Area: ' + $('#ldArea').value.trim());
      if ($('#ldNotes').value.trim()) lines.push('', 'Notes: ' + $('#ldNotes').value.trim());
      lines.push('', 'Please send a quote.');

      openWA(lines);
      toast('Opening WhatsApp with your enquiry…');
    });
  }

  /* ---------------------------------------------------------
     MAP — click to load.
     Third-party iframes are not loaded until asked for. On a
     metered Abuja mobile connection that is real money saved,
     and most people tap "Get directions" anyway.
  --------------------------------------------------------- */
  function initMap() {
    var btn = $('#mapLoad'), box = $('#map');
    if (!btn) return;
    var q = encodeURIComponent(CFG.location.mapQuery);

    $('#dirBtn').href = 'https://www.google.com/maps/search/?api=1&query=' + q;

    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=' + q + '&output=embed';
      f.title = 'Map showing ' + CFG.location.full;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(f);
    });
  }

  /* ---------------------------------------------------------
     CONTACT / FOOTER WIRING
  --------------------------------------------------------- */
  function initContact() {
    // Swap {{PHONE}} placeholders for the configured number.
    $$('a, p').forEach(function (el) {
      if (el.children.length === 0 && el.textContent.indexOf('{{PHONE}}') > -1) {
        el.textContent = el.textContent.replace('{{PHONE}}', CFG.contact.phoneDisplay);
      }
    });
    $$('.lead__alt').forEach(function (el) {
      el.innerHTML = el.innerHTML.replace('{{PHONE}}', CFG.contact.phoneDisplay);
    });

    var tel = 'tel:' + CFG.contact.phoneDial;
    var callBtn = $('#callBtn'); if (callBtn) callBtn.href = tel;
    var ldCall  = $('#ldCall');  if (ldCall)  ldCall.href  = tel;

    var ig = $('#igLink');
    if (ig) { ig.href = CFG.brand.instagramUrl; $('#igHandle').textContent = '@' + CFG.brand.instagram; }

    // Generic order CTAs (header, hero, fab)
    $$('[data-wa]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        openWA([HELLO, 'I’d like to place an order.', '', 'What’s available on the grill right now?']);
      });
    });

    var chat = $('#quickChat');
    if (chat) {
      var links = [
        ['Place an order',   waLink([HELLO, 'I’d like to place an order.'])],
        ['Book a table',     waLink([HELLO, 'I’d like to book a table at Jabi.', '', 'Date / time:', 'Number of guests:'])],
        ['Catering quote',   waLink([HELLO, 'I need a catering quote.', '', 'Event:', 'Guests:', 'Date:'])],
        ['Delivery check',   waLink([HELLO, 'Do you deliver to my area?', '', 'My area:'])],
        ['Call ' + CFG.contact.phoneDisplay, tel]
      ];
      chat.innerHTML = links.map(function (l) {
        return '<li><a href="' + l[1] + '"' + (l[1].indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') +
               '>' + l[0] + '</a></li>';
      }).join('');
    }

    var areas = $('#areas');
    if (areas) areas.innerHTML = CFG.deliveryAreas.map(function (a) { return '<li>' + a + '</li>'; }).join('');

    var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     BOOT
  --------------------------------------------------------- */
  function boot() {
    initHeader();
    initTicker();
    initCarousel();
    initMenu();
    initBuilder();
    initLead();
    initMap();
    initContact();
    renderStatus();
    setInterval(renderStatus, 60000); // keep the open/closed pip honest
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
