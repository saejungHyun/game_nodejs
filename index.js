var express = require('express');
var app = express();
app.use('/static',express.static(__dirname+'/public'));
//스테틱을 퍼블릭과 매핑시킨다

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
var port = 13110;

app.get('/',function(req,res){
  res.send('hello world');
    });

app.get('/ex01',function(req,res){
  res.render('ex01/index.html');
  //ex01요청하면 index.html에 있는거 불러와라
    });

app.listen(port, function(){
  console.log('포트번호'+port);
});
//포트지정
