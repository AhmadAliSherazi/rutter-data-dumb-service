module.exports = {
  apps : [
      {
        name: "Rutter_data_dumb_service",
        script: "node --env-file=.env main.js",
        watch: false,
      }
  ]
}