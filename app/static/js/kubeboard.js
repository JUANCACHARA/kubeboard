const HTTP_ENDPOINT = "/config";
const AUTO_REFRESH_INTERVAL = 5000;
const VALIDATION_CHECK_DURATION = 1500;

let autoRefreshIntervalRef = null;

document.addEventListener('DOMContentLoaded', async () => {
  refresh_config().then(() => {
    _update_last_refresh();
  });

  // ===
  // Setup eventListeners
  // ===
  // > refresh button
  document.querySelector('#refresh').addEventListener("click", function () {
    refresh_config().then(() => {
      _display_action_validation()
      _update_last_refresh();
    })
  });

  // > automatic refresh toggle
  document.querySelector('#automaticRefresh').addEventListener("click", function () {
    if (!autoRefreshIntervalRef) {
      autoRefreshIntervalRef = setInterval(() => {
        refresh_config().then(() => {
          _update_last_refresh();
        });
      }, AUTO_REFRESH_INTERVAL);
      _toggle_button("#automaticRefresh", true);

    } else {
      if (autoRefreshIntervalRef) {
        clearInterval(autoRefreshIntervalRef);
        autoRefreshIntervalRef = null;
      }
      _toggle_button("#automaticRefresh", false);

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
            <span class="mdi ${ingresses[i].icon}" aria-hidden="true"></span>
          </div>
          <div class="app_item_details">
            <h3>${ingresses[i].name}</h3>
            <span>${ingresses[i].url}</span>
          </div>
        </a>
    `
    document.querySelector('#app_grid').insertAdjacentHTML('beforeend', _ingress_html);
  }

  return;
}

_update_last_refresh = () => {
  document.querySelector('#lastRefresh').innerHTML = `<strong>Last refresh:</strong> ${new Date().toUTCString()}`;
}

_fetch_ingresses = async () => {
  // Send the request to backend
  const http_response = await fetch(HTTP_ENDPOINT);
  console.debug(http_response)

  // Return to user
  if (!http_response.ok) {
    throw new Error(http_response.status);
  }
  return await http_response.json();
}

_display_action_validation = () => {
  const check_element = document.querySelector('#controls .mdi-check');
  check_element.classList.remove("hidden")
  setTimeout(() => {
    check_element.classList.add("hidden")
  }, VALIDATION_CHECK_DURATION);
}

_toggle_button = (selector, status = true) => {
  const auto_element = document.querySelector(selector);
  if (status) {
    auto_element.classList.add("active")
  } else {
    auto_element.classList.remove("active")
  }
}
