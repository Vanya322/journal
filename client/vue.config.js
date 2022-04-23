module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/niu-schedules": {
        target: 'http://services.niu.ranepa.ru/wp-content/plugins/rasp/rasp_json_data.php',
        changeOrigin: true
      }
    },
  }
}
