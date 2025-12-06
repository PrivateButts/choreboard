cronAdd("weekly_wrap_up", "0 0 * * 0", async () => {
  const ntfy = require(`${__hooks}/ntfy.js`)
  try {
    // This hook runs every week on Sunday at midnight
    $app.logger().info("Weekly wrap-up cron job started");

    // Get who won the most points this week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekScoreList = $app.findRecordsByFilter(
      'scores_weekly',
      `week_start = "${weekStart.toISOString().split("T")[0]}"`,
      "-weekly_score",
      1,
      0
    )

    if (weekScoreList.length === 0) {
      $app.logger().warn("No scores found for the week.");
      ntfy.sendNtfyNotification("No scores found", "No scores found for the week.");
      return;
    }

    const weekScore = weekScoreList[0];
    const topUser = $app.findRecordById("users", weekScore.getString("user_id"));

    // Send notification to the ntfy group
    if (topUser) {
      const message = `Weekly wrap-up: ${topUser.getString("email")} won with ${weekScore.get("weekly_score")} points!`;
      ntfy.sendNtfyNotification("Weekly Wrap-Up", message);
    }

  } catch (error) {
    console.error("Error in weekly_wrap_up cron job:", error);
    $app.logger().error(
      "Error in weekly_wrap_up cron job:",
      "message", error.message,
      "stack", error.stack
    );
    ntfy.sendNtfyNotification("Error in weekly_wrap_up", error.message);
  }
});