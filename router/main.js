
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
      var language = req.body.language;
      const execSync = require('child_process').execSync;
      // 컴파일 상태 확인
      var ret = { success: false, stdout: ''};
      var result = "FAIL";
      /// 컴파일을 위한변수



      

      if (language == 0){   // C언어 일경우 
         console.log("C언어");

         fs.writeFileSync('data/c_user_src.c', content, 'utf-8');  // c소스파일 저장            

         // 컴파일 스크립트 작성  (백준알고리즘에서 스크립트 >> 변경가능) 
         // TODO : 서버 OS 변경 하면 디렉토리 변경해줘야함
         const script = `gcc  /Users/yujin/FinalWork/Algorithm-Tutor-Web/data/c_user_src.c -o  /Users/yujin/FinalWork/Algorithm-Tutor-Web/data/c_user_src.o -O2 -Wall -lm -static -std=c99 -DONLINE_JUDGE -DBOJ`;


        try {  // 컴파일 성공
            const stdout = execSync(script).toString();
            ret.success = true;
            ret.stdout = stdout;
            result = "compile success";
        } catch(exception) {  // 컴파일 실패
            const stdout = exception.stderr.toString();
            ret.success = false;
            ret.stdout = stdout;
            result = "compile fail";

        }

      }



      else if(language == 1){  // C++ 일경우
         console.log("c++언어");


         fs.writeFile('data/cpp_user_src.cpp', content, function(err){  // cpp소스파일 저장
            if(err){
              console.log(err)
              res.status(500).send('Error');
            }
            res.send('Success!')
          })
      }

      //TODO : 나머지 언어는 추가하면서 수정할것


      // 채점을 위한 테스트파일 읽어옴


      // 채점 스크립트
      const Judge_script = 'sudo ' + `${testerDir}/libjudger.so` + ' ' + '--max_cpu_time=1000' + ' ' +
                        '--max_real_time= 2000' + ' ' + '--max_memory= 128 * 1024 * 1024' + ' ' +
                        '--max_process_number= 200'  + ' ' + '--max_output_size= 10000'  + ' ' +
                        `--exe_path="${dataDir}/c_user_src.o"` + ' ' + `--input_path="${testerDir}/case1.in"` + ' ' +
                        `--output_path="${testerDir}/case1.out"` + ' ' + `--error_path="${testerDir}/error.txt"` + ' ' + '--uid=0' + ' ' +
                        '--gid=0' + ' ' + '--seccomp_rule_name= c_cpp';

      const JudeStdout = execSync(Judge_script).toString();
      const JudgeStatus = JSON.parse(JudeStdout);

      if(max_memory_usage < JudgeStatus.memory) {
          max_memory_usage = JudgeStatus.memory;
      }
      if(max_time_usage < JudgeStatus.cpu_time) {
          max_time_usage = JudgeStatus.cpu_time;
      }

      // TODO : 채점 잘돌아가면 결과값 어떻게 나타낼지 작성하기
   




      res.render('submit_src', { title: 'Express', content: content, language :language ,result: result, method: "post" });


      
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

