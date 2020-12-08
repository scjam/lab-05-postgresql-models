require('dotenv').config();
require('./lib/utils/pool').connect();
const app = require('./index');
const port = 4000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
