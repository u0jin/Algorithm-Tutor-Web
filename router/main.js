
// 브라우저에 요청이 올때, 어떤 작업을 할지 설정

module.exports = function (app, fs) {
   app.get("/", function (req, res) {  //main page
       res.render('index', {
           length: 3,
           problem: ["Hello", "good", "world"]
       });
       //res.sendFile(path.resolve(__dirname, "index.html"))
   });

   app.get('/tutor', function (req, res, next) {  //tutor
       res.render('tutor.html');
   });

   //req.params.id
   app.get("/submit/:id", function (req, res) {
       problem = [{
           'index': '1',
           'title': "문자열 내림차순으로 배치하기",
           'description': "문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요. s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.",
           'input': "Zbcdefg",
           'output': "gfedcbZ",
           'input_example': "Zbcdefg",
           "output_example": "gfedcbZ"

       }, {
           'index': '2',
           'title': "입력하기01",
           'description': "알아서 풀어야할듯 ㅋㅋ",
           'input': "3 2",
           'output': "5",
           'input_example': "3 2",
           "output_example": "5"
       }];
       res.render('submit', {
           index: problem[req.params.id]
       });
       //res.sendFile(path.resolve(__dirname, 'submit.html'));
   });



   app.post('/submit_src', function (req, res) {  //submit

       var content = req.body.content;
       var language = req.body.language;
       const execSync = require('child_process').execSync;
       // 컴파일 상태 확인
       var ret = { success: false, stdout: '' };
       var result = "FAIL";
       //var src_result ="FAIL";



       if (language == 0) {   // C언어 일경우 
           console.log("C언어");

           fs.writeFileSync('data/c_user_src.c', content, 'utf-8');  // c소스파일 저장            

           // 컴파일 스크립트 작성  (백준알고리즘에서 스크립트 >> 변경가능) 
           // TODO : 서버 OS 변경 하면 디렉토리 변경해줘야함
           //const script = `gcc  /home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.c -o  /home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.o -O2 -Wall -lm -static -std=c99 -DONLINE_JUDGE -DBOJ`;
           const script = `gcc  /home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.c -o  /home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.o `;


           try {  // 컴파일 성공
               const stdout = execSync(script).toString();
               ret.success = true;
               ret.stdout = stdout;
               result = "compile success";
           } catch (exception) {  // 컴파일 실패
               const stdout = exception.stderr.toString();
               ret.success = false;
               ret.stdout = stdout;
               result = "compile fail";

           }

       }



       else if (language == 1) {  // C++ 일경우
           console.log("c++언어");

           fs.writeFile('data/cpp_user_src.cpp', content, function (err) {  // cpp소스파일 저장
               if (err) {
                   console.log(err)
                   res.status(500).send('Error');
               }
               res.send('Success!')
           })
       }

       //TODO : 나머지 언어는 추가하면서 수정할것

       var scorelist =[];  

       for (var i = 0; i < 1; i++) {
           // 채점 스크립트
           const Judge_script = 'sudo ' + `/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/libjudger.so` + ' ' + '--max_cpu_time=1000' + ' ' +
               '--max_real_time=2000' + ' ' + '--max_memory=134217728' + ' ' +
               '--max_process_number=200' + ' ' + '--max_output_size=10000' + ' ' +
               `--exe_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.o"` + ' ' + `--input_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/problem${i}/input${i}.txt"` + ' ' +
               `--output_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/result_src.txt"` + ' ' + `--error_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/error.txt"` + ' ' + '--uid=0' + ' ' +
               '--gid=0' + ' ' + '--seccomp_rule_name=c_cpp';

           const src_output = fs.readFileSync(`/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/problem${i}/output${i}.txt`, 'utf8').toString();  //   문제의 답 불러옴

           const user_output = fs.readFileSync(`/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/result_src.txt`, 'utf8').toString();  // user 의 소스 결과값 불러옴


           if (result == "compile success") {  // 컴파일을 성공한다면, 정답 체크 ㄱㄱ

               try {  // 컴파일 성공
                   const Judgestdout = execSync(Judge_script).toString();
                   const Judgetatus = JSON.parse(Judgestdout);

                   if (user_output == src_output) {
                       result = " SUCCESS ";
                       scorelist.append("통과");

                   } else {
                       result = "WRONG ANSWER";
                       scorelist.append("실패");
                   }

               } catch (exception) {  // 컴파일 실패
                   const stdout = exception.stderr.toString();

                   console.log(stdout);

               }
           }
       }
       //res.render('submit_src', { result: result, method: "post" });

       
       var score = result;

       console.log(req.body);
       return res.json({
           'value': true,
           'score': score,
           'case': [
               "1번 테스트 케이스 "+ scorelist[i],
               "2번 테스트 케이스 통과",
               "3번 테스트 케이스 통과",
               "4번 테스트 케이스 통과",
               "5번 테스트 케이스 통과",
               "6번 테스트 케이스 실패",
           ]
       });

   });

}

