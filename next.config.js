module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // ファイルの変更を監視する間隔（ミリ秒）
      aggregateTimeout: 300, // 変更があったときに再ビルドを開始するまでの遅延（ミリ秒）
    };
    return config;
  },
};
