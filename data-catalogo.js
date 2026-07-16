(function () {
  const PALETTE = window.GLIFO_PALETTE || [];
  const seqEl = document.getElementById('seq');
  const btnTeclado = document.getElementById('btnTeclado');
  const panel = document.getElementById('tecladoPanel');
  const searchEl = document.getElementById('tecladoSearch');
  const gridEl = document.getElementById('tecladoGrid');
  const countEl = document.getElementById('tecladoCount');

  function renderGrid(filter) {
    const q = (filter || '').trim().toUpperCase();
    const list = q
      ? PALETTE.filter(p => p.signo.toUpperCase().includes(q))
      : PALETTE;

    countEl.textContent = list.length + ' signo' + (list.length === 1 ? '' : 's');

    if (list.length === 0) {
      gridEl.innerHTML = '<div class="teclado-empty">No hay signos que coincidan con «' + q + '».</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    list.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'teclado-btn';
      btn.title = p.signo;
      btn.innerHTML = '<span class="g">' + p.glifo + '</span><span class="n">' + p.signo + '</span>';
      btn.addEventListener('click', () => insertGlifo(p.glifo));
      frag.appendChild(btn);
    });
    gridEl.innerHTML = '';
    gridEl.appendChild(frag);
  }

  function insertGlifo(glifo) {
    const start = seqEl.selectionStart != null ? seqEl.selectionStart : seqEl.value.length;
    const end = seqEl.selectionEnd != null ? seqEl.selectionEnd : seqEl.value.length;
    const before = seqEl.value.slice(0, start);
    const after = seqEl.value.slice(end);
    const needsSpaceBefore = before.length > 0 && !/\s$/.test(before);
    const insert = (needsSpaceBefore ? ' ' : '') + glifo + ' ';
    seqEl.value = before + insert + after;
    const pos = (before + insert).length;
    seqEl.focus();
    seqEl.setSelectionRange(pos, pos);
  }

  btnTeclado.addEventListener('click', () => {
    const isHidden = panel.hasAttribute('hidden');
    if (isHidden) {
      panel.removeAttribute('hidden');
      btnTeclado.classList.add('active');
      renderGrid('');
      searchEl.value = '';
      searchEl.focus();
    } else {
      panel.setAttribute('hidden', '');
      btnTeclado.classList.remove('active');
    }
  });

  searchEl.addEventListener('input', () => renderGrid(searchEl.value));
})();
