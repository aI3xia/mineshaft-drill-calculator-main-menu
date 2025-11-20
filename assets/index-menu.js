(function(){const e={drillCalculator:{id:"drill-calculator",title:"Mineshaft Drill Calculator",description:"Calculate drill depths, resource yields, and optimal configurations for the Mineshaft Drill",available:!0,url:"./calculator.html"},productionCalculator:{id:"production-calculator",title:"Production Calculator",description:"Calculate ratios and optimal production chain(s) for every item or fluid",available:!1}};let t="menu",n;function a(o){const l={"arrow-left-icon":"←","chevron-right-icon":"›"};return l[o]||""}function c(o){const l=document.createElement("div");l.className=`resource-card ${o.color} ${o.available?"":"unavailable"}`;let r="";o.available||(r='<div class="status-badge">Coming Soon™</div>');const i=a(o.iconClass),d=o.available?a("chevron-right-icon"):"";return l.innerHTML=`
    ${r}
    <div class="card-content">
      <div class="icon-container ${o.color}">
        <span class="icon">${i}</span>
      </div>
      <div class="card-text">
        <h3 class="card-title">
          ${o.title}
          ${d?`<span class="chevron">${d}</span>`:""}
        </h3>
        <p class="card-description">${o.description}</p>
      </div>
    </div>
  `,o.available&&(l.style.cursor="pointer",l.addEventListener("click",()=>s(o))),l}function s(o){o.available&&(o.url?window.location.href=o.url:u(o))}function m(){if(!n)return;n.innerHTML=`
    <div class="container">
      <div class="header">
        <div class="header-icon">${a("wrench-icon")}</div>
        <h1 class="title">Industrialist Wiki</h1>
        <p class="subtitle">Resource Hub & Calculators</p>
      </div>
      <div class="resource-grid" id="resource-grid"></div>
      <div class="footer">
        <p>Built for the Industrialist community</p>
        <p>
          <a href="https://industrialist.miraheze.org/" target="_blank" rel="noopener noreferrer">
            Visit the Industrialist Wiki
          </a>
        </p>
      </div>
    </div>
  `;const o=document.getElementById("resource-grid");Object.values(e).forEach(l=>{o.appendChild(c(l))})}function u(o){if(!n)return;const l=a(o.iconClass);n.innerHTML=`
    <div class="container">
      <button class="back-button" id="back-button">
        ${a("arrow-left-icon")} Back to Menu
      </button>
      <div class="resource-view">
        <div class="resource-header">
          <div class="icon-container ${o.color}">
            <span class="icon">${l}</span>
          </div>
          <div>
            <h2 class="resource-title">${o.title}</h2>
            <p class="resource-description">${o.description}</p>
          </div>
        </div>
        <div class="resource-content" id="resource-content">
          ${o.id==="drill-calculator"?`<iframe src="${o.url}" class="calculator-iframe" title="${o.title}"></iframe>`:'<div class="coming-soon"><p>This resource is under development.</p><p>Check back soon for updates!</p></div>'}
        </div>
      </div>
    </div>
  `,document.getElementById("back-button").addEventListener("click",()=>{t="menu",m()})}function p(){console.log("Init function called"),console.log("Document ready state:",document.readyState),n=document.getElementById("app"),console.log("App element:",n),n||(console.error("App element not found!"),console.log("Available elements:",document.body.innerHTML),n=document.createElement("div"),n.id="app",document.body.appendChild(n),console.log("Created app element")),console.log("App initialized successfully"),m()}console.log("Script loaded"),document.readyState==="loading"?(console.log("Document still loading, adding event listener"),document.addEventListener("DOMContentLoaded",p)):(console.log("Document already loaded, calling init immediately"),p()),setTimeout(()=>{n||(console.log("Backup initialization triggered"),p())},100)})();
