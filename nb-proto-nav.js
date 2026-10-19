// Prototype navigator: a small floating menu on every page so viewers can
// move between roles and screens without editing the URL.
(function () {
  if (window.__nbProtoNav) return;
  window.__nbProtoNav = true;

  var PAGES = [
    { group: 'Start', label: 'Welcome and sign-in', sub: 'Landing, sign-in, first-time setup', href: '/sign-in', icon: 'log-in' },
    { group: 'Workspaces', label: 'Student', sub: 'Check-in, requests, support plan', href: '/student', icon: 'graduation-cap' },
    { group: 'Workspaces', label: 'Support Officer', sub: 'Caseload, cases, support plans', href: '/support-officer', icon: 'heart-handshake' },
    { group: 'Workspaces', label: 'Lecturer', sub: 'Accommodations, Teaching Studio', href: '/lecturer', icon: 'presentation' },
    { group: 'Workspaces', label: 'Department Head and Admin', sub: 'Inclusion dashboard, audit log', href: '/leadership', icon: 'chart-column' },
    { group: 'About the design', label: 'Overview board', sub: 'Privacy board, one student four views', href: '/overview', icon: 'layout-grid' },
    { group: 'About the design', label: 'Design system', sub: 'Colours, type, components', href: '/design-system', icon: 'palette' }
  ];

  function norm(p) {
    p = (p || '/').replace(/\.html$/, '').replace(/\/+$/, '');
    return p === '' || p === '/index' ? '/' : p;
  }
  var here = norm(location.pathname);
  if (here === '/') here = '/sign-in';

  function icon(name, size) {
    return '<nb-icon name="' + name + '" size="' + (size || 18) + '"></nb-icon>';
  }

  var host = document.createElement('div');
  host.id = 'nb-proto-nav';
  var root = host.attachShadow({ mode: 'open' });

  var items = '';
  var lastGroup = '';
  PAGES.forEach(function (p) {
    if (p.group !== lastGroup) {
      items += '<li class="grp" role="presentation">' + p.group + '</li>';
      lastGroup = p.group;
    }
    var cur = norm(p.href) === here;
    items +=
      '<li role="none"><a role="menuitem" href="' + p.href + '"' + (cur ? ' aria-current="page" class="cur"' : '') + '>' +
      '<span class="ic">' + icon(p.icon, 18) + '</span>' +
      '<span class="tx"><span class="lb">' + p.label + (cur ? ' <span class="you">You are here</span>' : '') + '</span>' +
      '<span class="sb">' + p.sub + '</span></span></a></li>';
  });

  root.innerHTML =
    '<style>' +
    ':host{all:initial}' +
    '.wrap{position:fixed;right:16px;bottom:16px;z-index:2147483000;font-family:"Atkinson Hyperlegible",Lexend,system-ui,sans-serif;color:var(--text,#1F2328)}' +
    '.fab{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--primary,#2F5D8A);background:var(--primary,#2F5D8A);color:var(--on-primary,#fff);font:700 15px/1 inherit;font-family:inherit;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.18)}' +
    '.fab:focus-visible,a:focus-visible,.x:focus-visible{outline:3px solid var(--primary,#2F5D8A);outline-offset:2px}' +
    '.panel{position:absolute;right:0;bottom:56px;width:min(340px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 96px));overflow:auto;background:var(--surface,#fff);border:1px solid var(--border,#E3DED6);border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.2);padding:8px}' +
    '.panel[hidden]{display:none}' +
    '.hd{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px 4px}' +
    '.hd b{font-size:15px}' +
    '.hd span{font-size:12.5px;color:var(--text-muted,#5B6470)}' +
    '.x{border:0;background:transparent;color:var(--text-muted,#5B6470);width:36px;height:36px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}' +
    'ul{list-style:none;margin:0;padding:0}' +
    '.grp{font-size:12px;font-weight:700;letter-spacing:.02em;color:var(--text-muted,#5B6470);padding:12px 10px 4px}' +
    'a{display:flex;gap:12px;align-items:flex-start;padding:10px;border-radius:8px;text-decoration:none;color:inherit;min-height:44px}' +
    'a:hover{background:var(--surface-2,#F3F0EB)}' +
    'a.cur{background:var(--primary-bg,#E6EEF6)}' +
    '.ic{flex:none;width:32px;height:32px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:var(--surface-2,#F3F0EB);color:var(--primary,#2F5D8A)}' +
    '.tx{display:flex;flex-direction:column;gap:2px;line-height:1.3}' +
    '.lb{font-weight:700;font-size:15px}' +
    '.sb{font-size:13px;color:var(--text-muted,#5B6470)}' +
    '.you{font-weight:700;font-size:11.5px;color:var(--primary,#2F5D8A);margin-left:4px}' +
    '.ft{border-top:1px solid var(--border,#E3DED6);margin-top:6px;padding:10px;font-size:12.5px;color:var(--text-muted,#5B6470);line-height:1.4}' +
    '@media (prefers-reduced-motion:no-preference){.panel{transition:opacity .12s}}' +
    '@media (max-width:767px){.wrap{right:12px;bottom:84px}.fab{width:48px;height:48px;padding:0;justify-content:center}.fab .lbl{display:none}}' +
    '</style>' +
    '<div class="wrap">' +
    '<div class="panel" id="p" role="menu" aria-label="Prototype pages" hidden>' +
    '<div class="hd"><span><b>NeuroBridge prototype</b><br><span>Jump to any role or screen</span></span>' +
    '<button class="x" type="button" aria-label="Close menu">' + icon('x', 18) + '</button></div>' +
    '<ul>' + items + '</ul>' +
    '<div class="ft">Sample data only. Nothing you enter is saved or sent.</div>' +
    '</div>' +
    '<button class="fab" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="p" aria-label="Prototype menu">' + icon('compass', 20) + '<span class="lbl">Prototype menu</span></button>' +
    '</div>';

  var fab = root.querySelector('.fab');
  var panel = root.querySelector('.panel');
  var closeBtn = root.querySelector('.x');

  function setOpen(open) {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open) {
      var first = root.querySelector('a.cur') || root.querySelector('a');
      if (first) first.focus();
    }
  }
  fab.addEventListener('click', function () { setOpen(panel.hidden); });
  closeBtn.addEventListener('click', function () { setOpen(false); fab.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); fab.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && e.composedPath().indexOf(host) === -1) setOpen(false);
  });

  function mount() { document.body.appendChild(host); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
