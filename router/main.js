
// 브라우저에 요청이 올때, 어떤 작업을 할지 설정

const { json } = require('body-parser');

module.exports = function (app, fs) {
    app.get("/", function (req, res) {  //main page
        res.render('index', {
            length: 6,
            problem: ["A+B", "두 수 비교하기", "수 정렬하기","순열","팰린드롬인지 확인하기","알파카 문장"],
            difficulty: ["하","하","중","중","중","중"]
        });
        //res.sendFile(path.resolve(__dirname, "index.html"))
    });

    app.get('/tutor', function (req, res, next) {  //tutor
        res.render('tutor.html');
    });

    //req.params.id
    app.get("/submit/:id", function (req, res) {
        problem = [{
            'index': '0',
            'title': "A+B",
            'description': "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
            'input': "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
            'output': "첫째 줄에 A+B를 출력한다.",
            'input_example': "1 2",
            "output_example": "3"

        }, {
            'index': '1',
            'title': "두 수 비교하기",
            'description': "두 정수 A와 B가 주어졌을 때, A와 B를 비교하는 프로그램을 작성하시오.",
            'input': "첫째 줄에 A와 B가 주어진다. A와 B는 공백 한 칸으로 구분되어져 있다.",
            'output': "첫째 줄에 다음 세 가지 중 하나를 출력한다. A가 B보다 큰 경우에는 '>'를 출력한다.<br> A가 B보다 작은 경우에는 '<'를 출력한다. A와 B가 같은 경우에는 '=='를 출력한다.",
            'input_example': "1 2",
            "output_example": "<"
        },{
         'index': '2',
         'title': "수 정렬하기",
         'description': "N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.",
         'input': "처음에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 번째부터 N개의 숫자가 주어진다. <br>이 수는 절댓값이 1,000보다 작거나 같은 정수이다. 수는 중복되지 않는다.",
         'output': "첫째번째 부터 N개의 수가 오름차순으로 정렬한 결과를 차례로 하나씩 출력한다.",
         'input_example': "5 5 2 3 4 1",
         "output_example": "1 2 3 4 5"

     },{
        'index': '3',
        'title': "순열",
        'description': "1부터 N까지의 수를 임의로 배열한 순열은 총 N! = N×(N-1)×…×2×1 가지가 있다. <br> 모든 1 ≤ i ≤ N에 대해서 |P[i] - i| ≤ K를 만족하는 순열 P의 개수를 구하는 프로그램을 작성하시오.",
        'input': "첫째 줄에 N, K가 순서대로 주어진다. N은 100보다 작거나 같은 자연수이고, K는 6보다 작거나 같은 자연수이다.",
        'output': "첫째 줄에 문제의 정답을 출력한다.",
        'input_example': "3 1",
        "output_example": "3"
    },{
        'index': '4',
        'title': "팰린드롬인지 확인하기",
        'description': "알파벳 소문자로만 이루어진 단어가 주어진다. 이때, 이 단어가 팰린드롬인지 아닌지 확인하는 프로그램을 작성하시오.<br> 팰린드롬이란 앞으로 읽을 때와 거꾸로 읽을 때 똑같은 단어를 말한다. <br> level, noon은 팰린드롬이고, baekjoon, online, judge는 팰린드롬이 아니다.",
        'input': "첫째 줄에 단어가 주어진다. 단어의 길이는 1보다 크거나 같고, 100보다 작거나 같으며, 알파벳 소문자로만 이루어져 있다.",
        'output': "첫째 줄에 팰린드롬이면 1, 아니면 0을 출력한다.",
        'input_example': "level",
        "output_example": "1"
    },{
        'index': '5',
        'title': "알파카 문장",
        'description': "알파카는 언제나 신비롭습니다. 알파카들이 사용하는 문장들도 매우 신비한데, 알파카들의 문장에서 등장하는 알파벳들은 앞에서부터 읽으나 뒤에서부터 읽으나 항상 똑같습니다. 알파카 문장의 예로는 'Do geese see god?' (dogeeseseegod), 'Amore, Roma.', 'Rise to vote, sir.' 등이 있습니다. <br> 은기는 알파카를 매우 좋아하기 때문에 알파카들의 서식지에서 빈둥빈둥대면서 알파카들의 소설책을 읽고 있었습니다.<br> 그러던 어느 날, 알파카들이 이상한지 땅을 파고 있었습니다. 궁금한 은기가 구덩이를 보았더니 석판에 고대 알파카 문장이 적혀있었습니다. 이 문장은 약 46억 년 전에 알파카의 조상이 작성했던 문장이라 몇 글자가 지워져 있었습니다. 다행히 일부 남아있는 알파벳 글자들의 순서는 바뀌지 않아서 은기가 고대 문장을 복원시켜 보려고 합니다. <br> 알파카들은 간결한 문장을 좋아하기 때문에 복원된 문장은 가능한 한 가장 짧아야 합니다. 또, 방사성 추정에 의하여 이 문장은 서열이 K등인 알파카가 작성한 문장이기 때문에 가능한 최소 길이의 문장들 중에서 사전 순으로 K번째 문장을 찾아서 복원해야 합니다. <br> 은기를 도와서 고대 알파카 문장을 복원하는 프로그램을 작성해주세요!",
        'input': "입력은 두 줄로 이루어집니다.<br> 첫 번째 줄에는 유실된 알파카 문장 S이 주어집니다. S는 알파벳 소문자로만 이루어져 있고 S의 길이는 1 이상 2,000 이하입니다. <br> 두 번째 줄에는 알파카의 서열 K가 주어집니다. K는 1 ≤ K ≤ 1018을 만족하는 정수입니다.",
        'output': "첫 번째 줄에 복원한 알파카 문장을 출력합니다.<br> 만약 최소 길이의 문장으로 가능한 경우의 수가 k보다 적다면, NONE을 출력합니다.",
        'input_example': "crc <br> 1",
        "output_example": "crc"
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
        var compileResult ="";
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


        compileResult = result;  // compile Result : 컴파일이 잘되었는지 체크 

        //TODO : 나머지 언어는 추가하면서 수정할것
        var prolist = req.body.index; // problem list = index

        if (result != "compile fail") {  // 컴파일을 성공한다면, 정답 체크 ㄱㄱ
            var scorelist = new Array();

            var i = 0;
            var score = 0; // 점수 합산
            

            for (i = 0; i < 5; i++) {  //case list
                // 채점 스크립트
                const Judge_script = 'sudo ' + `/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/libjudger.so` + ' ' + '--max_cpu_time=1000' + ' ' +
                    '--max_real_time=2000' + ' ' + '--max_memory=134217728' + ' ' +
                    '--max_process_number=200' + ' ' + '--max_output_size=10000' + ' ' +
                    `--exe_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/data/c_user_src.o"` + ' ' + `--input_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/problem${prolist}/input${i}.txt"` + ' ' +
                    `--output_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/result_src.txt"` + ' ' + `--error_path="/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/error.txt"` + ' ' + '--uid=0' + ' ' +
                    '--gid=0' + ' ' + '--seccomp_rule_name=c_cpp';

                const src_output = fs.readFileSync(`/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/problem${prolist}/output${i}.txt`, 'utf8').toString();  // 문제의 답 불러옴


                try {  // 컴파일 성공
                    const Judgestdout = execSync(Judge_script).toString();
                    const user_output = fs.readFileSync(`/home/ujin/Desktop/final/Algorithm-Tutor-Web/tester/result_src.txt`, 'utf8').toString();  // user 의 소스 결과값 불러옴        
                    const Judgetatus = JSON.parse(Judgestdout);

                    console.log(Judgetatus);
                    console.log( i + src_output);
                    console.log( i+ user_output);


                    if (user_output == src_output) {
                        result = "성공";
                        score += 20; //테스트케이스 하나당 20점 >> 5개 다 맞으면 100점
                        //scorelist.push( "통과");

                    } else if (user_output != src_output) {
                        result = "실패";
                        //scorelist[i] = "실패";
                    }

                    console.log(result);
                    console.log(user_output);




                    scorelist.push(i + "번 결과 : " + result + "("+ " real_time : "+  Judgetatus['real_time'] + " / " +" memory : " + Judgetatus['memory'] +")"+'\n' + " 출력값 : "+ user_output );

                } catch (exception) {  // 컴파일 실패
                    const stdout = exception.stderr.toString();

                    console.log(stdout);

                }

            }


        }


        //TODO : NO compiler > testcase

        console.log(req.body);
        return res.json({
            'value': true,
            'result': compileResult,
            'score': score,
            'case': scorelist
        });

    });

}

