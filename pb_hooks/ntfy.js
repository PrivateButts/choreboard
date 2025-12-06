const sendNtfyNotification = (title, message) => {
  console.debug('sending with', process.env.NTFY_URL, process.env.NTFY_BASIC_AUTH_TOKEN);
  const ntfyUrl = process.env.NTFY_URL;
  const res = $http.send({
    url: ntfyUrl,
    method: "POST",
    body: 'Look ma, with auth', // ex. JSON.stringify({"test": 123}) or new FormData()
    headers: {
      'Authorization': `Basic ${process.env.NTFY_BASIC_AUTH_TOKEN}`,
    }, // ex. {"content-type": "application/json"}
    timeout: 120, // in seconds
  })
  if (res.statusCode >= 200 && res.statusCode < 300) {
    $app.logger().info(`ntfy notification sent: ${title}`, "response", res);
  } else {
    $app.logger().error(`Failed to send ntfy notification: ${res.statusCode}`, "response", res);
  }
  return res;
}

module.exports = {
  sendNtfyNotification
}