const app = require('./src/app');
const { port } = require('./src/config');

app.listen(port, () => {
  console.log(`🚀 Alerting Service is running on port ${port}`);
});
