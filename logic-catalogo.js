(function(){
  const DATA = window.CATALOGO || [];
  const gridEl = document.getElementById('grid');
  const searchEl = document.getElementById('searchInput');
  const searchMeta = document.getElementById('searchMeta');
  const panel = document.getElementById('detailPanel');
  const btnClose = document.getElementById('btnClose');

  let activeSigno = null;

  function renderGrid(filter){
    const f = (filter || '').trim().toUpperCase();
    const filtered = f ? DATA.filter(d => d.signo.toUpperCase().includes(f)) : DATA;
    searchMeta.textContent = filtered.length + ' / ' + DATA.length + ' signos';

    if(filtered.length === 0){
      gridEl.innerHTML = `<div class="no-results" style="grid-column:1/-1;"><div class="big-glyph">?</div><p>Ningún signo simple coincide con «${f}».</p></div>`;
      return;
    }

    gridEl.innerHTML = '';
    filtered.forEach(d=>{
      const tile = document.createElement('div');
      const hasCompounds = d.total_compuestos > 0;
      tile.className = 'simple-tile' + (hasCompounds ? '' : ' no-compounds') + (activeSigno === d.signo ? ' active' : '');
      tile.innerHTML = `
        <div class="tile-glyph">${d.glifo || '—'}</div>
        <div class="tile-name">${d.signo}</div>
        ${hasCompounds ? `<div class="tile-badge">${d.total_compuestos}</div>` : ''}
      `;
      if(hasCompounds){
        tile.addEventListener('click', ()=> openDetail(d));
      }
      gridEl.appendChild(tile);
    });
  }

  function openDetail(d){
    activeSigno = d.signo;
    renderGrid(searchEl.value);

    document.getElementById('detailGlyph').textContent = d.glifo || '—';
    document.getElementById('detailName').textContent = d.signo;

    const readingsTxt = (d.lecturas || []).map(l => l.lectura).filter(Boolean).join(', ');
    document.getElementById('detailReadings').textContent = readingsTxt ? 'lecturas: ' + readingsTxt : '';

    document.getElementById('exPrimary').textContent = d.signo + '×' + d.signo;

    const primaryGrid = document.getElementById('primaryGrid');
    const secondaryGrid = document.getElementById('secondaryGrid');

    if(d.compuestos_primary.length){
      primaryGrid.innerHTML = d.compuestos_primary.map(c => `
        <div class="compound-tile">
          <div class="compound-glyph">${c.glifo || '—'}</div>
          <div class="compound-name">${c.signo}</div>
        </div>
      `).join('');
    } else {
      primaryGrid.innerHTML = `<div class="empty-group">No hay compuestos donde ${d.signo} sea el primer componente.</div>`;
    }

    if(d.compuestos_secondary.length){
      secondaryGrid.innerHTML = d.compuestos_secondary.map(c => `
        <div class="compound-tile">
          <div class="compound-glyph">${c.glifo || '—'}</div>
          <div class="compound-name">${c.signo}</div>
        </div>
      `).join('');
    } else {
      secondaryGrid.innerHTML = `<div class="empty-group">No hay compuestos donde ${d.signo} aparezca en otra posición.</div>`;
    }

    panel.classList.add('open');
    panel.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  btnClose.addEventListener('click', ()=>{
    panel.classList.remove('open');
    activeSigno = null;
    renderGrid(searchEl.value);
  });

  searchEl.addEventListener('input', ()=> renderGrid(searchEl.value));

  renderGrid('');
})();