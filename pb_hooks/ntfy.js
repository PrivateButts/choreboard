const ActionTypes = Object.freeze({
  HTTP: 'http',
  VIEW: 'view',
  // BROADCAST: 'broadcast'
});

class NTFYAction {
  constructor(action, label, url, params = {}) {
    this.action = action.toString();
    this.label = label;
    this.url = url;
    this.params = params;
  }

  as_header() {
    let header = `${this.action}, ${this.label}, ${this.url}`
    if (this.params) {
      for (const [key, value] of Object.entries(this.params)) {
        header += `, ${key}=${value}`
      }
    }
    return header
  }
}

const sendNtfyNotification = (title, message, tags = [], actions = []) => {
  const ntfyUrl = process.env.NTFY_URL;
  const headers = {
    'Authorization': `Basic ${process.env.NTFY_BASIC_AUTH_TOKEN}`,
    "content-type": "application/json",
    "Title": title,
  }

  if (tags) {
    headers["Tags"] = tags.join(',')
  }

  if (actions) {
    headers["Actions"] = actions.map(action => action.as_header()).join(';')
  }

  $app.logger().debug('Sending ntfy notification', "title", title);
  const request = {
    url: ntfyUrl,
    method: "POST",
    body: message,
    headers,
    timeout: 60, // in seconds
  }
  const res = $http.send(request)
  if (res.statusCode >= 200 && res.statusCode < 300) {
    $app.logger().info(`ntfy notification sent: ${title}`, "response", res);
  } else {
    $app.logger().error(
      `Failed to send ntfy notification: ${res.statusCode}`,
      "request", request,
      "response", res
    );
  }
  return res;
}

module.exports = {
  sendNtfyNotification,
  NTFYAction,
  ActionTypes,
}