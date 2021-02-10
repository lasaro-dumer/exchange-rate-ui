
const express = require('express');
const app = new express();

app.use(express.static('./dist/exchange-ui'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/exchange-ui/'}
);
});

app.listen(process.env.PORT || 8080);
