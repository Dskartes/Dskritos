.hero{
  padding:6px 0 8px;
}
.hero-glyphs{
  font-family:'Noto Sans Cuneiform', serif;
  font-size:clamp(34px,7vw,54px);
  color:var(--terracotta);
  letter-spacing:0.08em;
  margin-bottom:14px;
  line-height:1;
}
.hero h1{
  font-size:clamp(32px,5vw,46px);
  max-width:16ch;
}
.hero .subtitle{
  max-width:56ch;
  font-size:16.5px;
}
.hero-actions{
  display:flex;
  gap:12px;
  margin-top:24px;
  flex-wrap:wrap;
}
.hero-btn{
  font-family:'JetBrains Mono', monospace;
  font-size:12px;
  letter-spacing:0.06em;
  text-transform:uppercase;
  text-decoration:none;
  padding:12px 22px;
  border-radius:2px;
  transition:background 0.12s ease, border-color 0.12s ease, transform 0.08s ease;
}
.hero-btn:active{ transform:translateY(1px); }
.hero-btn.primary{ background:var(--terracotta); color:#fff; }
.hero-btn.primary:hover{ background:var(--terracotta-dark); }
.hero-btn.ghost{ background:transparent; color:var(--clay-900); border:1px solid var(--clay-200); }
.hero-btn.ghost:hover{ border-color:var(--terracotta); color:var(--terracotta-dark); }

/* Franja de estadísticas */
.stats-strip{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
  margin:38px 0 44px;
}
.stat{
  padding:18px 16px;
  text-align:center;
  border-left:1px solid var(--line);
}
.stat:first-child{ border-left:none; }
.stat-num{
  font-family:'Spectral', serif;
  font-weight:600;
  font-size:26px;
  color:var(--clay-900);
}
.stat-label{
  font-family:'JetBrains Mono', monospace;
  font-size:10.5px;
  letter-spacing:0.06em;
  text-transform:uppercase;
  color:var(--clay-700);
  margin-top:4px;
}

/* Tarjetas de herramientas */
.tools-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
  gap:16px;
  margin-bottom:12px;
}
.tool-card{
  display:flex;
  flex-direction:column;
  gap:10px;
  background:var(--clay-50);
  border:1px solid var(--line);
  border-radius:3px;
  padding:24px;
  text-decoration:none;
  color:inherit;
  position:relative;
  overflow:hidden;
  transition:border-color 0.12s ease, transform 0.08s ease, box-shadow 0.12s ease;
}
.tool-card::before{
  content:"";
  position:absolute;
  top:0; left:0; right:0;
  height:3px;
  background:linear-gradient(90deg, var(--terracotta), var(--lapis) 65%, transparent);
}
.tool-card:hover{
  border-color:var(--terracotta);
  transform:translateY(-2px);
  box-shadow:0 4px 14px rgba(58,48,34,0.1);
}
.tool-glyph{
  font-family:'Noto Sans Cuneiform', serif;
  font-size:28px;
  color:var(--terracotta);
}
.tool-name{
  font-family:'Spectral', serif;
  font-weight:600;
  font-size:19px;
  color:var(--clay-900);
  margin:0;
}
.tool-desc{
  font-size:13.5px;
  color:var(--clay-700);
  line-height:1.55;
  margin:0;
  flex-grow:1;
}
.tool-cta{
  font-family:'JetBrains Mono', monospace;
  font-size:11px;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--terracotta-dark);
}

/* Sección "acerca de" */
.about-block{
  margin-top:52px;
  padding-top:32px;
  border-top:1px solid var(--line);
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:36px;
}
.about-block h2{
  font-family:'Spectral', serif;
  font-weight:600;
  font-size:21px;
  color:var(--clay-900);
  margin:0 0 12px;
}
.about-block p{
  font-size:14.5px;
  color:var(--clay-700);
  line-height:1.65;
  margin:0 0 10px;
}

@media (max-width:720px){
  .stats-strip{ grid-template-columns:repeat(2, 1fr); }
  .stat:nth-child(3){ border-left:none; }
  .about-block{ grid-template-columns:1fr; gap:20px; }
}
