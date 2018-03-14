var config =   require('./config');
var express =  require('express');
var router =   express.Router();
var sgMail =   require('@sendgrid/mail');

router.get('/api/send/:phone/:key/:message', function(req, res, next) {
  if (req.params.phone == undefined ||
    req.params.key != '898316ee-2d79-46a2-bdf8-0f849faab11f' ||
    req.params.message == undefined) {
    res.status(403).send({"status": "Unauthorized"});
    return;
  }
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  var textMsg = {
    to:      req.params.phone,
    from:    config.emailSender,
    subject: config.textSubject,
    text:    req.params.message
  };
  sgMail.send(textMsg, function(sendErr){
    res.json({"status": "Success"});
    }, function(sendResponse) {
    res.json({"status": "Success"});
  });
});

module.exports = router;
