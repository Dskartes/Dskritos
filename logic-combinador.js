(function(){
  const DATA = window.SIGNARIO_DATA || [];
  const INV = window.INVERTED_INDEX || {};
  const GLIFO_INDEX = window.GLIFO_INDEX || {};
  const INDEX = {};
  DATA.forEach(d => { INDEX[d.signo.toUpperCase()] = d; });

  function isCuneiformChar(ch){
    const cp = ch.codePointAt(0);
    return (cp >= 0x12000 && cp <= 0x1254F) ||
           (cp >= 0xF0000 && cp <= 0xFFFFD) ||
           (cp >= 0x100000 && cp <= 0x10FFFD);
  }

  function convertCuneiformToNames(raw){
    const chars = Array.from(raw);
    let out = '';
    let changed = false;
    let i = 0;
    while(i < chars.length){
      if(isCuneiformChar(chars[i])){
        changed = true;
        let j = i;
        while(j < chars.length && isCuneiformChar(chars[j])) j++;
        let pos = i;
        while(pos < j){
          let matched = false;
          for(let len = j - pos; len >= 1; len--){
            const substr = chars.slice(pos, pos + len).join('');
            if(GLIFO_INDEX[substr]){
              out += GLIFO_INDEX[substr] + '.';
              pos += len;
              matched = true;
              break;
            }
          }
          if(!matched){
            out += chars[pos] + '.';
            pos += 1;
          }
        }
        i = j;
      } else {
        out += chars[i];
        i++;
      }
    }
    return {text: out, changed};
  }

  let mode = 'signo';

  const seqEl = document.getElementById('seq');
  const seqLabel = document.getElementById('seqLabel');
  const seqHint = document.getElementById('seqHint');
  const examplesRow = document.getElementById('examplesRow');
  const tokensRowEl = document.getElementById('tokensRow');
  const resultsEl = document.getElementById('results');
  const btnRun = document.getElementById('btnRun');
  const btnClear = document.getElementById('btnClear');
  const modeSignoBtn = document.getElementById('modeSigno');
  const modeFonBtn = document.getElementById('modeFon');

  const EMPTY_HTML = `<div class="empty-state"><div class="big-glyph">𒀭</div><p id="emptyText">Escribe una secuencia arriba y presiona «Combinar lecturas».</p></div>`;

  function setMode(m){
    mode = m;
    modeSignoBtn.classList.toggle('active', m==='signo');
    modeFonBtn.classList.toggle('active', m==='fonetico');
    if(m === 'signo'){
      seqLabel.textContent = 'Secuencia de signos';
      seqEl.placeholder = 'AN.GA.LU2  —  o también:  AN GA LU2';
      seqHint.innerHTML = 'Separa los signos con un punto <code>.</code> o un espacio. Usa los nombres de transliteración tal como aparecen en el signario (ej. <code>AN</code>, <code>DINGIR</code>, <code>GA2</code>).';
      examplesRow.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;">ejemplos:</span>
        <span class="ex-chip" data-ex="AN.GA">AN.GA</span>
        <span class="ex-chip" data-ex="DINGIR.LUGAL">DINGIR.LUGAL</span>
        <span class="ex-chip" data-ex="AN.NA.GA2">AN.NA.GA2</span>`;
    } else {
      seqLabel.textContent = 'Secuencia de valores fonéticos (sílabas)';
      seqEl.placeholder = 'sa9-har-an  —  o también:  sa9.har.an';
      seqHint.innerHTML = 'Separa las sílabas con un guion <code>-</code> o un punto <code>.</code>. Para cada sílaba, la app busca primero la lectura exacta (ej. <code>sa9</code>) y, si no la encuentra, signos con la misma base silábica (<code>sa</code>, <code>sa2</code>, <code>sa3</code>...).';
      examplesRow.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;">ejemplos:</span>
        <span class="ex-chip" data-ex="sa9-har-an">sa9-har-an</span>
        <span class="ex-chip" data-ex="an-na">an-na</span>
        <span class="ex-chip" data-ex="ka-di">ka-di</span>`;
    }
    rebindExampleChips();
  }

  function rebindExampleChips(){
    document.querySelectorAll('.ex-chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        seqEl.value = chip.dataset.ex;
        run();
      });
    });
  }

  modeSignoBtn.addEventListener('click', ()=>setMode('signo'));
  modeFonBtn.addEventListener('click', ()=>setMode('fonetico'));

  btnClear.addEventListener('click', ()=>{
    seqEl.value = '';
    tokensRowEl.innerHTML = '';
    resultsEl.innerHTML = EMPTY_HTML;
  });

  btnRun.addEventListener('click', run);
  seqEl.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && (e.metaKey || e.ctrlKey)){ run(); }
  });

  // ---------- MODO: por nombre de signo ----------
  function lookupSigno(name){
    const key = name.trim().toUpperCase();
    if(!key) return null;
    return INDEX[key] || null;
  }

  function getReadingsForToken(entry){
    if(!entry) return [];
    const out = [];
    (entry.lecturas || []).forEach(l=>{
      if(l.lectura) out.push({lectura: l.lectura, glosa: l.glosa || ''});
    });
    if(out.length === 0 && entry.also){
      entry.also.split(',').slice(0,6).forEach(v=>{
        v = v.trim();
        if(v) out.push({lectura: v, glosa: '(variante, sin glosa registrada)'});
      });
    }
    return out;
  }

  function buildTokensSigno(tokens){
    return tokens.map(tok=>{
      const entry = lookupSigno(tok);
      const readings = getReadingsForToken(entry);
      const opts = readings.map(r => ({label: r.lectura, glosa: r.glosa, signo: tok.toUpperCase(), glifo: entry ? entry.glifo : ''}));
      return {tok, found: !!entry, glifo: entry ? entry.glifo : '', opts};
    });
  }

  // ---------- MODO: por valor fonético ----------
  function baseSyllable(s){
    return s.replace(/\d+$/,'');
  }

  function lookupFonetico(syll){
    const key = syll.trim().toLowerCase();
    if(!key) return {exact:[], approx:[]};
    const exact = INV[key] || [];
    const base = baseSyllable(key);
    let approx = [];
    if(base !== key){
      approx = (INV[base] || []).filter(e => e.lectura.toLowerCase() !== key);
    }
    return {exact, approx};
  }

  function buildTokensFonetico(tokens){
    return tokens.map(tok=>{
      const {exact, approx} = lookupFonetico(tok);
      const found = exact.length > 0 || approx.length > 0;
      const glifo = exact[0] ? exact[0].glifo : (approx[0] ? approx[0].glifo : '');
      const opts = [];
      exact.forEach(e => opts.push({label: e.lectura, glosa: e.glosa, signo: e.signo, glifo: e.glifo, exact:true}));
      approx.slice(0,8).forEach(e => opts.push({label: e.lectura, glosa: e.glosa, signo: e.signo, glifo: e.glifo, exact:false}));
      return {tok, found, glifo, opts};
    });
  }

  // ---------- Render comun ----------
  function run(){
    let raw = seqEl.value.trim();
    if(!raw){ return; }

    const conv = convertCuneiformToNames(raw);
    let autoConverted = false;
    if(conv.changed){
      raw = conv.text;
      autoConverted = true;
      if(mode !== 'signo'){ setMode('signo'); }
      seqEl.value = raw;
    }

    const splitter = mode === 'fonetico' ? /[-.\s]+/ : /[.\s]+/;
    const tokens = raw.split(splitter).map(t=>t.trim()).filter(Boolean);

    const tokenData = mode === 'signo' ? buildTokensSigno(tokens) : buildTokensFonetico(tokens);

    tokensRowEl.innerHTML = autoConverted
      ? '<div class="auto-note">𒀭 Detectamos cuneiforme en el texto y lo convertimos a nombres de signo automáticamente.</div>'
      : '';
    tokenData.forEach(t=>{
      const card = document.createElement('div');
      card.className = 'token-card' + (!t.found ? ' not-found' : '');
      const glyphHtml = t.glifo || '—';
      let countHtml;
      if(!t.found){
        countHtml = `<div class="token-count">no encontrado</div>`;
      } else if(mode === 'fonetico'){
        const nExact = t.opts.filter(o=>o.exact).length;
        const nApprox = t.opts.filter(o=>!o.exact).length;
        countHtml = `<div class="token-count">${nExact} exacta${nExact===1?'':'s'}${nApprox>0 ? ', '+nApprox+' aprox.' : ''}</div>`;
      } else {
        countHtml = `<div class="token-count">${t.opts.length} lectura${t.opts.length===1?'':'s'}</div>`;
      }
      card.innerHTML = `
        <div class="token-glyph">${glyphHtml}</div>
        <div class="token-name">${t.tok}</div>
        ${countHtml}
      `;
      tokensRowEl.appendChild(card);
    });

    const usable = tokenData.filter(t => t.opts.length > 0);
    if(usable.length === 0){
      const msg = mode === 'fonetico'
        ? 'Ninguna de las sílabas escritas se encontró en el signario, ni de forma exacta ni aproximada. Revisa la ortografía (ej. <strong>an</strong>, <strong>sa9</strong>, <strong>har</strong>).'
        : 'Ninguno de los signos escritos se encontró en el signario, o no tienen lecturas registradas. Revisa la ortografía de los nombres (ej. <strong>AN</strong>, <strong>GA2</strong>, <strong>DINGIR</strong>).';
      resultsEl.innerHTML = `<div class="empty-state"><div class="big-glyph">?</div><p>${msg}</p></div>`;
      return;
    }

    const LIMIT = 400;
    let combos = [[]];
    let truncated = false;
    for(const t of tokenData){
      const opts = t.opts.length > 0 ? t.opts : [{label:'('+t.tok+')', glosa:'no encontrado', signo:'', exact:false}];
      const next = [];
      for(const combo of combos){
        for(const opt of opts){
          next.push([...combo, opt]);
          if(next.length >= LIMIT){ truncated = true; break; }
        }
        if(truncated) break;
      }
      combos = next;
      if(truncated) break;
    }

    const title = mode === 'fonetico'
      ? tokenData.map(t=>t.tok).join('-')
      : tokenData.map(t=>t.tok.toUpperCase()).join('.');

    let html = `
      <div class="results-meta">
        <div class="results-title">${title}</div>
        <div class="results-count">${combos.length} combinación${combos.length===1?'':'es'}</div>
      </div>
      <div class="combo-list">
    `;
    combos.forEach(combo=>{
      const reading = combo.map(c=>c.label).join(mode==='fonetico' ? '-' : '');
      const glosas = combo.map(c=>`<span class="seg">${c.glosa || '—'}</span>`).join('<span class="sep">+</span>');
      let signRow = '';
      if(mode === 'fonetico'){
        signRow = `<div class="combo-also">signos: ${combo.map(c => {
          const tag = c.exact === undefined ? '' : (c.exact ? '<span class="match-tag exact">exacta</span>' : '<span class="match-tag approx">aprox.</span>');
          return `<span class="signo-pick">${c.signo || '?'}</span>${tag}`;
        }).join('  &nbsp;·&nbsp;  ')}</div>`;
      }
      html += `
        <div class="combo-row">
          <div class="combo-reading">${reading}</div>
          <div class="combo-glosas">${glosas}</div>
          ${signRow}
        </div>
      `;
    });
    html += `</div>`;
    if(truncated){
      html += `<div class="limit-note">Se muestran las primeras ${LIMIT} combinaciones. La secuencia genera más de las que caben aquí cómodamente — prueba con menos sílabas/signos para ver el set completo.</div>`;
    }
    resultsEl.innerHTML = html;
  }

  setMode('signo');
})();