(function () {
  'use strict';

  var cfg = window.YEN_CONFIG || {};

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Small helper to build elements safely (text is never treated as HTML)
  function h(tag, props, children) {
    var el = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === 'class') el.className = props[k];
      else if (k === 'text') el.textContent = props[k];
      else el.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }

  /* ---------- Footer year + contact email ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var footEmail = $('#foot-email');
  if (footEmail && cfg.email) {
    footEmail.href = 'mailto:' + cfg.email;
    footEmail.textContent = cfg.email;
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = $('.nav-toggle');
  var nav = $('#nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      });
    });
  }

  /* ---------- Program tabs ---------- */
  var tabs = $$('[role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }
  if (tabs.length) {
    selectTab(tabs[0], false);
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); selectTab(next, true); }
      });
    });
  }

  /* ---------- Opportunities board ---------- */
  var CATEGORIES = ['Hackathons', 'Scholarships', 'Internships', 'Competitions',
    'Youth programs', 'Research', 'Networking events', 'Free courses'];
  var activeCat = 'All';

  function parseLocal(str) {
    var p = String(str).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2], 23, 59, 59);
  }
  function daysLeft(str) { return Math.ceil((parseLocal(str) - new Date()) / 86400000); }
  function sortKey(o) { return o.deadline ? parseLocal(o.deadline).getTime() : 8.64e15; }

  function deadlineLabel(o) {
    if (!o.deadline) return { text: 'Ongoing', soon: false };
    var d = daysLeft(o.deadline);
    var date = parseLocal(o.deadline).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
    if (d <= 14) return { text: 'Closes in ' + d + (d === 1 ? ' day' : ' days') + ' (' + date + ')', soon: true };
    return { text: 'Deadline ' + date, soon: false };
  }

  function oppCard(o) {
    var top = h('div', { class: 'opp-top' }, [
      h('span', { class: 'tag', text: o.category }),
      o.cost ? h('span', { class: 'tag cost', text: o.cost }) : null,
      o.example ? h('span', { class: 'tag example', text: 'Example listing' }) : null
    ]);
    var dl = deadlineLabel(o);
    var foot = h('div', { class: 'opp-foot' }, [
      h('span', { class: 'when' + (dl.soon ? ' soon' : ''), text: dl.text }),
      o.link ? h('a', { class: 'text-link', href: o.link, target: '_blank', rel: 'noopener noreferrer', text: 'View details' }) : null
    ]);
    return h('article', { class: 'opp' }, [
      top,
      h('h3', { text: o.title }),
      o.organization ? h('p', { class: 'org', text: o.organization }) : null,
      o.description ? h('p', { class: 'desc', text: o.description }) : null,
      foot
    ]);
  }

  function renderOpps() {
    var list = $('#opp-list');
    var count = $('#opp-count');
    if (!list) return;
    var all = (window.YEN_OPPORTUNITIES || [])
      .filter(function (o) { return !o.deadline || daysLeft(o.deadline) >= 0; })
      .sort(function (a, b) { return sortKey(a) - sortKey(b); });
    var shown = activeCat === 'All' ? all : all.filter(function (o) { return o.category === activeCat; });

    list.textContent = '';
    shown.forEach(function (o) { list.appendChild(oppCard(o)); });

    if (!shown.length) {
      list.appendChild(h('div', { class: 'empty' }, [
        h('p', { text: activeCat === 'All'
          ? 'No opportunities are listed right now. Check back soon.'
          : 'Nothing is listed under ' + activeCat + ' right now. Know one? Send it our way.' })
      ]));
    }
    if (count) {
      count.textContent = shown.length + (shown.length === 1 ? ' opportunity' : ' opportunities') +
        (activeCat === 'All' ? '' : ' in ' + activeCat);
    }
  }

  var filterBox = $('#opp-filters');
  if (filterBox) {
    ['All'].concat(CATEGORIES).forEach(function (cat) {
      var b = h('button', { type: 'button', 'aria-pressed': String(cat === activeCat), text: cat });
      b.addEventListener('click', function () {
        activeCat = cat;
        $$('button', filterBox).forEach(function (x) {
          x.setAttribute('aria-pressed', String(x.textContent === cat));
        });
        renderOpps();
      });
      filterBox.appendChild(b);
    });
    renderOpps();
  }

  /* ---------- Projects ---------- */
  var projBox = $('#project-list');
  if (projBox) {
    var projects = window.YEN_PROJECTS || [];
    if (!projects.length) {
      projBox.appendChild(h('div', { class: 'empty' }, [
        h('p', { text: 'Our first member projects are on the way. Have something you\'re building? Join YEN and tell us about it.' })
      ]));
    }
    projects.forEach(function (p) {
      var side = p.example
        ? h('span', { class: 'tag example', text: 'Example project' })
        : (p.link ? h('a', { class: 'text-link', href: p.link, target: '_blank', rel: 'noopener noreferrer', text: 'See the project' }) : null);
      projBox.appendChild(h('article', { class: 'project' }, [
        h('div', { class: 'kind', text: p.type }),
        h('div', {}, [
          h('h3', { text: p.title }),
          p.description ? h('p', { text: p.description }) : null,
          p.builtBy ? h('p', { class: 'by', text: 'Built by ' + p.builtBy }) : null
        ]),
        h('div', {}, [side])
      ]));
    });
  }

  /* ---------- "Join as..." buttons preselect the role ---------- */
  var roleSelect = $('#f-role');
  $$('[data-role]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (roleSelect) roleSelect.value = a.getAttribute('data-role');
    });
  });
  var suggest = $('#suggest-link');
  if (suggest && roleSelect) {
    suggest.addEventListener('click', function () {
      var msg = $('#f-msg');
      if (msg && !msg.value) msg.value = 'I\'d like to suggest an opportunity for the board: ';
    });
  }

  /* ---------- Sign-up form ---------- */
  var form = $('#join-form');
  var status = $('#form-status');
  function say(text, isError) {
    if (!status) return;
    status.textContent = text;
    status.style.color = isError ? '#C0262D' : '#0F1745';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var okName = name.value.trim().length > 0;
      var okEmail = /^\S+@\S+\.\S+$/.test(email.value.trim());
      name.setAttribute('aria-invalid', String(!okName));
      email.setAttribute('aria-invalid', String(!okEmail));
      if (!okName) { say('Please add your name.', true); name.focus(); return; }
      if (!okEmail) { say('Please enter a valid email address.', true); email.focus(); return; }
      if (form.elements._gotcha.value) return; // spam trap

      var data = new FormData(form);

      if (cfg.formEndpoint) {
        say('Sending…', false);
        fetch(cfg.formEndpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('bad response');
            form.reset();
            say('Thanks! We\'ll be in touch soon.', false);
          })
          .catch(function () {
            say('That didn\'t send. Please try again, or email us directly.', true);
          });
        return;
      }

      // Fallback until a form service is connected: open the visitor's email app
      if (!cfg.email) { say('The form isn\'t connected yet. Please check back soon.', true); return; }
      var body = 'Name: ' + data.get('name') + '\n' +
        'Email: ' + data.get('email') + '\n' +
        'Joining as: ' + data.get('role') + '\n' +
        'School or neighbourhood: ' + (data.get('area') || '') + '\n\n' +
        (data.get('message') || '');
      window.location.href = 'mailto:' + cfg.email +
        '?subject=' + encodeURIComponent('Join YEN: ' + data.get('role')) +
        '&body=' + encodeURIComponent(body);
      say('Your email app should open with your message ready to send.', false);
    });
  }
})();
