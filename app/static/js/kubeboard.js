const HTTP_ENDPOINT = "/config";
const AUTO_REFRESH_INTERVAL = 2000;
const VALIDATION_CHECK_DURATION = 1500;

let autoRefreshIntervalRef = null;

document.addEventListener('DOMContentLoaded', async () => {
  refresh_config();

  // Setup eventListeners
  // > refresh button
  document.querySelector('#refresh').addEventListener("click", function () {
    refresh_config();
    _display_action_validation()
  });
  // > automatic refresh toggle
  document.querySelector('#autoRefreshCheckbox').addEventListener("change", function (event) {
    if (event.currentTarget.checked) {
      refresh_config();
      autoRefreshIntervalRef = setInterval(() => {
        refresh_config();
      }, AUTO_REFRESH_INTERVAL);
    } else {
      if (autoRefreshIntervalRef) clearInterval(autoRefreshIntervalRef);
    }
  });
}, false);

refresh_config = async () => {
  // Retrieve ingresses from /config endpoint
  const ingresses = await _fetch_ingresses()

  // Reset grid
  document.querySelector('#app_grid').innerHTML = "";

  // Update DOM with retrieved configuration
  for (let i = 0; i < ingresses.length; i++) {
    const _ingress_html = `
      <a class="app_item" href="http://${ingresses[i].url}" target="_blank" rel="noreferrer">
          <div class="app_item_icon">
            <i class="fa ${ingresses[i].icon}" aria-hidden="true"></i>
          </div>
          <div class="app_item_details">
            <h3>${ingresses[i].name}</h3>
            <span>${ingresses[i].url}</span>
          </div>
        </a>
    `
    document.querySelector('#app_grid').insertAdjacentHTML('beforeend', _ingress_html);
  }
}

_fetch_ingresses = async () => {
  // Send the request to backend
  http_response = await fetch(HTTP_ENDPOINT);
  console.debug(http_response)

  // Return to user
  if (!http_response.ok) {
    throw new Error(http_response.status);
  }
  return await http_response.json();
}

_display_action_validation = () => {
  element = document.querySelector('#controls .fa-check');
  element.classList.remove("hidden")
  setTimeout(() => {
    element.classList.add("hidden")
  }, VALIDATION_CHECK_DURATION);
}
