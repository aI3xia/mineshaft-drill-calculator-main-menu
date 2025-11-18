interface Resource {
  id: string;
  title: string;
  description: string;
  iconClass: string;
  color: string;
  available: boolean;
  url?: string;
}

type ViewType = "menu" | string;

const Resources: Record<string, Resource> = {
  drillCalculator: {
    id: "drill-calculator",
    title: "Mineshaft Drill Calculator",
    description:
      "Calculate drill depths, resource yields, and optimal configurations for the Mineshaft Drill",
    iconClass: "calculator-icon",
    color: "blue",
    available: true,
    url: "./calculator.html", 
  },
  productionCalculator: {
    id: "production-calculator",
    title: "Production Calculator",
    description:
      "Calculate ratios and optimal production chain(s) for every item or fluid",
    iconClass: "package-icon",
    color: "purple",
    available: false,
  },
};

let Elements: {
  app: HTMLElement;
};

let currentView: ViewType = "menu";

function createIcon(iconClass: string): string {
  const icons: Record<string, string> = {
    "calculator-icon": "",
    "book-icon": "",
    "package-icon": "",
    "zap-icon": "",

    "arrow-left-icon": "←",
    "chevron-right-icon": "›",
  };
  return icons[iconClass] || "";
}

function createResourceCard(resource: Resource): HTMLElement {
  const card = document.createElement("div");
  card.className = `resource-card ${resource.color} ${
    !resource.available ? "unavailable" : ""
  }`;

  let statusBadge = "";
  if (!resource.available) {
    statusBadge = '<div class="status-badge">Coming Soon</div>';
  }

  const icon = createIcon(resource.iconClass);
  const chevron = resource.available ? createIcon("chevron-right-icon") : "";

  card.innerHTML = `
    ${statusBadge}
    <div class="card-content">
      <div class="icon-container ${resource.color}">
        <span class="icon">${icon}</span>
      </div>
      <div class="card-text">
        <h3 class="card-title">
          ${resource.title}
          ${chevron ? `<span class="chevron">${chevron}</span>` : ""}
        </h3>
        <p class="card-description">${resource.description}</p>
      </div>
    </div>
  `;

  if (resource.available) {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => handleResourceClick(resource));
  }

  return card;
}

function handleResourceClick(resource: Resource): void {
  if (resource.available) {
    if (resource.url) {
      
      window.location.href = resource.url;
    } else {
      
      currentView = resource.id;
      renderResourceView(resource);
    }
  }
}

function renderMainMenu(): void {
  Elements.app.innerHTML = `
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="header-icon">${createIcon("wrench-icon")}</div>
        <h1 class="title">Industrialist Wiki</h1>
        <p class="subtitle">Resource Hub & Calculators</p>
      </div>
      
      <!-- Resource Grid -->
      <div class="resource-grid" id="resource-grid"></div>
      
      <!-- Footer -->
      <div class="footer">
        <p>Built for the Industrialist community</p>
        <p>
          <a href="https://industrialist.miraheze.org/" target="_blank" rel="noopener noreferrer">
            Visit the Industrialist Wiki
          </a>
        </p>
      </div>
    </div>
  `;

  const grid = document.getElementById("resource-grid")!;
  Object.values(Resources).forEach((resource) => {
    grid.appendChild(createResourceCard(resource));
  });
}

function renderResourceView(resource: Resource): void {
  const icon = createIcon(resource.iconClass);

  Elements.app.innerHTML = `
    <div class="container">
      <!-- Back Button -->
      <button class="back-button" id="back-button">
        ${createIcon("arrow-left-icon")} Back to Menu
      </button>
      
      <!-- Resource Content -->
      <div class="resource-view">
        <div class="resource-header">
          <div class="icon-container ${resource.color}">
            <span class="icon">${icon}</span>
          </div>
          <div>
            <h2 class="resource-title">${resource.title}</h2>
            <p class="resource-description">${resource.description}</p>
          </div>
        </div>
        
        <div class="resource-content" id="resource-content">
          ${
            resource.id === "drill-calculator"
              ? `<iframe src="${resource.url}" class="calculator-iframe" title="${resource.title}"></iframe>`
              : `<div class="coming-soon">
                <p>This resource is under development.</p>
                <p>Check back soon for updates!</p>
              </div>`
          }
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-button")!.addEventListener("click", () => {
    currentView = "menu";
    renderMainMenu();
  });
}

function init(): void {

  Elements = {
    app: document.getElementById("app")!,
  };

  if (!Elements.app) {
    console.error("App element not found!");
    return;
  }

  renderMainMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
