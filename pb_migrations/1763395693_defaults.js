/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let settings = app.settings()

  // for all available settings fields you could check
  // /jsvm/interfaces/core.Settings.html
  settings.meta.appName = "Choreboard"
  settings.meta.appURL = $os.getenv("APP_URL") || "http://localhost:8080"
  settings.logs.maxDays = 2
  settings.logs.logAuthId = true
  settings.logs.logIP = false

  app.save(settings)

  // create a default admin user
  let superusers = app.findCollectionByNameOrId("_superusers")

  let record = new Record(superusers)

  // note: the values can be eventually loaded via $os.getenv(key)
  // or from a special local config file
  record.set("email", $os.getenv("ADMIN_EMAIL") || "admin@example.com")
  record.set("password", $os.getenv("ADMIN_PASSWORD") || "1234567890")

  try {
    app.save(record)
  } catch (error) {
    console.warn("Error creating superuser:", error)
  }
}, (app) => {
  // add down queries...
})
