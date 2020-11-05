
// 브라우저에 요청이 올때, 어떤 작업을 할지 설정

module.exports = function(app, fs)
{
   app.get('/',function(req,res,next){
      res.render('home.html',{  // main
         //title: "MY HOMEPAGE",
         length: 5
      });
   });
   app.get('/problem',function(req,res,next){ //problem
      res.render('problem.html');
   });
   app.get('/index',function(req,res,next){  //tutor
      res.render('index.html');
   });
   app.get('/submit',function(req,res){  //submit
      res.render('submit.html');
   });

   app.post('/submit_src',function(req,res){  //submit
      var content = req.body.content;
      res.render('submit_src', { title: 'Express', content: content, method: "post" });
   });

   app.get('/list', function (req, res) {  //test용
      fs.readFile( __dirname + "/../data" + "user.json", 'utf8', function (err, data) {
          console.log( data );
          res.end( data );
      });
   });


   app.get('/result/:result', function(req, res){   // 검사 결과값 
      fs.readFile( __dirname + "/../data/user.json", 'utf8', function (err, data) {
           var users = JSON.parse(data);
           res.json(users[req.params.result]);
      });
   });

}

