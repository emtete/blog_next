INSERT INTO "Posts" VALUES 
(1,'victor_77','deepCopy','긁어쓰는 JavaScript','``` js\nconst deepCopy = (obj) => JSON.parse(JSON.stringify(obj));\n\n```',NULL,'2020-10-04 11:48:09','2020-10-04 11:57:17',1,4,0),
(2,'victor_77','블로그 개발 리뷰','리뷰','## 개발기간 :\n\n<span class=\"size\" style=\"font-size:1.125rem\">2020 / 08 / 08 \\~ 2020 / 10 / 04 (약 2개월)</span>\n<br>\n## 기술 스펙 :\n\nfront : ES 6, React, Next, Redux\nback : Node JS, Express, Sequelize(MySQL)\n<br>\n## 서드 파티 라이브러리 :\n\nfront : tui editor, highlight.js, material ui, js-cookie\nback : bcrypt, passport, cors, dotenv, cookie-parser\n<br>\n## 세부 구현사항 :\n\n### 로그인\n\n유저, 권한 관리\n<br>\n### 관리자 페이지\n\n메뉴관리 : 트리메뉴(2Depth) 추가, 수정, 삭제, 순서 변경 구현\n글관리 : 메뉴 변경 구현\n<br>\n### 사용자 페이지\n\n포스트 리스트 : 아코디언 형식 출력, 글쓰기, 수정  구현\n카드 리스트    : 카드 형식 출력, 모달 디테일 페이지, 글쓰기, 수정 구현\n\n<br>\n## 후기\n\n1. 블로그를 개발하면서 겪은 시행착오\n2. 블로그를 개발한 이후, 다음의 목표\n\n<br>\n> 1. 블로그를 개발하면서 겪은 시행착오\n\n이 블로그를 만들면서 느낀건, `기획단계에서 판단을 잘못하면, 개발이 산으로 간다`는 것이었습니다.\n개발 초반에는 메뉴를 무한뎁스로 만들려고 했습니다. 1주일정도를 날리고 나서 \'이러다간 정말 큰일나겠다\' 라고 생각하고 계획을 바꿨습니다. 일단 2뎁스로 만들고, 관리자 페이지도 직접 디자인하는것에 한계를 느끼고 타 사이트를 참고하며 만들었습니다. 기획부터 디자인 퍼블리싱 개발, 백엔드까지.. 혼자 다 하려니 \'일이 끝이 없구나\' 라는 생각이 들었습니다.\n\n기획 이외의 시행착오라면, `SPA 방식의 개발`도 처음인데, `SSR을 지원하는 NEXT로 개발`하려니 \'산넘어 산이구나..\' 라는 생각이 들었습니다. material-ui를 적용할 때도 SSR을 적용하는 설정을 해줘야 합니다. wysiwig editor 라이브러리를 사용할 경우, window객체를 사용하기 때문에, 서버에서 실행되면 에러가 납니다. 그래서 에디터를 import 할 때, next에서 제공하는 dynamic이라는 함수를 사용해야 합니다. 찾아보면 다 해결방법이 나오지만.. 가끔은 지칠 때도 있었습니다.\n\n그리고 `리덕스 사가를 통한 API요청을 처리하는 과정`에선 혼란스러웠습니다.\n글로만 표현해서 전달이 잘 안될 수 있는데요. 이전(자바)에 개발하는 방식은 요청을 보내면 그 응답을 화면에 뿌려주기만 하면 됬습니다. 하지만 리덕스 사가를 이용해서 개발하게 되면, 요청에 대한 응답이 store에 저장되고 그 값들의 처리과정(loading, done, error)까지 관리해주게 되는데요. 이 부분이 이전 정적 페이지를 개발할 때와 다른 부분이고, 시행착오를 거쳐야 하는 부분인 것 같습니다. 그리고 리덕스 사가를 사용할 때의 개발방식과 정적방식의 요청, 응답 처리 둘 중 어느게 좋은지는 아직까지 잘 모르겠습니다.\n<br>\n> 2\\. 블로그를 개발한 이후\\, 다음의 목표\n\n끝없이 이어졌던 이슈사항을 처리하면서 이제 겨우 \'거의 다 왔다\'라고 할 수 있을 정도가 되었습니다. 하지만 이제 겨우 배포하고 글을 작성해서 조회 할 수 있을 정도인 것 같습니다. 아직 가끔씩 에러가 나는 경우도 있고, 적용해보고 싶은것들이 많이 남아있습니다.\n`일단 검색엔진 최적화`가 되지 않았습니다. 처음엔 next만 쓰면 될거라고 생각했는데, 아니더라구요..\n 그리고 배포과정에서 사용되는 `젠킨스나 도커`를 적용할 계획입니다. 첫 배포당시 nginx, https 인증서까지 적용하고 젠킨스까지 하려고 했지만, 설정이 잘못됬는지 젠킨스 적용 이후 nginx 실행이 안되서 다시 원복했습니다. 젠킨스는 천천히.. 적용해야겠습니다.\n 그리고 `메뉴를 3뎁스`까지 적용하고, `코드도 계속 정리`하는 것까지가  이후의 계획입니다.','https://i.imgur.com/OCGRjWh.png','2020-10-05 02:57:54','2020-10-27 02:03:47',1,7,0),
(3,'victor_77','Node JS 설치(Ubuntu Linux)','긁어쓰는 NodeJS','```\n$ sudo apt-get update\n$ sudo apt-get install -y build-essential\n$ sudo apt-get install curl\n$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --\n$ sudo apt-get install -y nodejs\n```',NULL,'2020-10-05 08:46:35','2020-10-05 08:47:06',1,9,0),
(4,'victor_77','로그인','긁어쓰는 MySQL','```\nmysql -u root -p\n```',NULL,'2020-10-05 08:48:34','2020-10-05 08:48:34',1,5,0),
(5,'victor_77','Redux란?','라이브러리 소개','## 리덕스란?\n\n상태관리 라이브러리입니다.\n\n대체적으로 리액트에서 사용합니다.\n\n그리고 리액트에선 컴포넌트(컴포넌트는 html의 묶음)를 사용하는데\n\n컴포넌트에선 필요한 값을 부모, 자녀 노드와 같이 인접한 노드끼리만 값을 주고받을 수 있게 되어있는데요.\n\n그렇기 때문에 아래 예시와 같이 컴포넌트 사이에 많은 컴포넌트가 있다면 값을 전달하기 위해 쓸때없이 많은 컴포넌트가 값을 주고받아야 합니다.\n\n그 문제를 해결해주는 라이브러리가 redux입니다.\n\nex)\n\n``` js\n<div>\n    <div2>\n    ...\n        <div9>\n        </div9>\n    ...\n    </div2>\n</div>\n```\n\n## 리덕스와 같이 사용하는 redux-thunk, redux-saga\n\n대표적으로 redux-thunk와 redux-saga가 있습니다.\n\n두 라이브러리는 redux의 middleware라고 하는데요.\n\nmiddleware는 redux의 부족한 기능을 추가해주는\n\n것이라고 생각하면 될 것 같습니다.\n\n<br>\n리덕스의 부족한 부분은 비동기 처리가 되지 않는다는 것입니다.\n\n그래서 백엔드와의 요청을 주고받는 기능을 처리하지 못하게 되는데요.\n\n그래서 redux-saga와 redux-thunk를 사용하게 됩니다.\n\nthunk와 사가 둘 다 비동기 방식을 지원하지만\n\nthunk는 딱 그 기능만 제공하는 정말 간단한 라이브러리인 반면\n\nredux-saga는 비동기 요청을 처리하면서 발생하는 문제를 해결해주는 기능을 지원합니다.\n\ndelay, takeLatest\n\n같은 요청 여러번할때 제어해주는 기능 등..\n\n스로틀, 디바운스로 요청이 3개 이상 발생할 경우 요청을 차단합니다.','https://media.vlpt.us/images/ppohee/post/3312c04a-cdee-4953-a6c6-705a7860c72d/redux.jpg','2020-10-05 09:58:55','2020-10-13 01:49:52',1,10,0),
(6,'victor_77','MySQL 삭제','긁어쓰는 MySQL','맥(brew)\n```\n> cd /usr/local/var\n> rm -rf mysql\n> brew uninstall mysql\n```',NULL,'2020-10-05 13:14:11','2020-10-06 02:35:20',1,5,0),
(9,'victor_77','MySQL 설치 후 설정','긁어쓰는 MySQL','brew로 서비스 실행:\n\n```\nbrew services start mysql\n```\n<br>\nroot계정 패스워스 설정 :\n\n```\nALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'password\';\n```\n<br>\n데이터베이스 생성 :\n\n```\nCREATE DATABASE databaseName;\n```\n<br>\n유저 생성 :\n\n```\nCREATE USER \'username\'@\'localhost\' IDENTIFIED BY \'password\';\n```\n<br>\n유저 생성 적용:\n\n```\nFLUSH PRIVILEGES;\n```\n<br>\n유저 생성 확인:\n\n```\nSELECT User, Host, authentication_string FROM mysql.user;\n```\n<br>\n유저에 DB권한 부여\n\n```\nGRANT ALL PRIVILEGES ON dtabasename.* to username@localhost;\n```\n<br>\n권한 확인\n\n```\nSHOW GRANTS FOR \'username\'@\'localhost\';\n```\n<br>\n출처 : [https://dejavuqa.tistory.com/317](https://dejavuqa.tistory.com/317)',NULL,'2020-10-06 02:31:55','2020-10-08 06:01:37',1,5,0),
(10,'victor_77','MySQL 설치','긁어쓰는 MySQL','우분투\n```\nsudo apt-get update\nsudo apt-get install mysql-server\nsudo ufw allow mysql\nsudo systemctl start mysql\nsudo systemctl enable mysql(서버 재시동 시 자동실행)\n```\n\n맥\n```\nbrew install mysql\n```',NULL,'2020-10-06 02:33:56','2020-10-06 02:33:56',1,5,0),
(11,'victor_77','Sequalize','긁어쓰는 NodeJS','최초 DB생성 :\n\n```\nnpx sequelize db:create\n```\n<br>\n마이그레이션 파일 생성 :\n\n```\nnpx sequelize migration:create --name post_migration_0\n```\n<br>\n파일 내용으로 DB수정 :\n\n```\nnpx sequelize db:migrate\n```\n<br>\n마이그레이션 파일 생성 예시:\n\n``` js\nreturn await queryInterface.addColumn(\"posts\", \"categoryName\", {\n    type: Sequelize.STRING(50),\n});\n```',NULL,'2020-10-06 02:54:22','2020-10-12 05:49:36',1,9,0),
(12,'victor_77','배포과정에서 겪은 시행착오','리뷰','1. 배포 중 시행착오\n2. 아마존의 요금체계\n3. 결론\n\n<br>\n> 1. 배포 중 시행착오\n\n프론트와 백엔드 서버가 따로 있기 때문에 서버를 2대 구매해야 했습니다.\n그래서 <b>*nginx의 리버스 프록시를 이용해, 한대의 서버에서 구동*</b>하도록 설정을 <i>**시도**</i>했습니다. 작동이 잘 되지 않고 진전이 없어서 <b>*포기*</b>했습니다.\n<b>*저렴한 국내 호스팅 업체*</b>를 알아봤습니다. 대부분 AMP(apach, mysql, php)를 지원했고, ssh를 지원하는 서버는 아마존보다 훨씬 비쌌습니다. <b>*포기*</b>했습니다. <b>*결국 아마존에서 배포*</b>하기로 결정했습니다. 한대는 프리티어, 한대는 t3a.nano 유형으로 구매하여 배포했습니다.\n<br>\n> 2\\. 아마존의 요금체계\n\n다들 보셨겠지만 aws 사이트는 복잡합니다. 처음 들어가면 뭐가 뭔지 구분이 안되서 쓰지 않으려 했지만, 가격적으로 나쁘지 않아 선택했습니다.\n요금이 책정되는 방식도 복잡합니다. 프리티어가 무료지만, 한정적인 조건이기 때문에 체크해둬야 합니다. <b>*저같은 경우, 서버를 2대 사용*</b>하기 때문에 한대는 무료적용이 되지만, <i>**나머지 한대는 금액이 발생**</i>합니다.(750(약 한달)시간 무료이니, 두대를 사용하면 1500시간이 됩니다.) <i>**ec2 instance는 정지시켜두면 요금이 발생하지 않아**</i>, 하루 12시간만 운영하면 프리티어 조건으로 사용 할 수 있다고 생각했지만, 인스턴스에 연결해 두었던 탄력적 ip(고정ip)의 사용금액이 무료이지만, <b>*인스턴스를 종료하게 되면 탄력적ip 사용요금이 발생*</b>합니다. 이런식으로 여러가지 조건에 의해, 요금의  발생여부가 결정되서 처음엔 복잡합니다. 그래도 다른 호스팅 업체보다 좋은 조건인건 맞는 것 같습니다.\n<br>\n> 3\\. 결론\n\n마이크로소프트의 애져, 백엔드 서비스를 지원하는 파이어베이스 등, 아직 시도해보지 않은 호스팅 서비스도 있습니다. 그렇지만 일단 AWS도 좋은 서비스를 제공하기 때문에 일단 AWS의 EC2 서비스 중, <i>**한대는**</i> <span class=\"colour\" style=\"color: rgb(22, 25, 31);\"><b>*t2.micro(프리티어 적용), 나머지 한대는 t3a.nano유형을 적용*</b>했습니다. 아마 한달에 4000 \\~ 5000 원정도 비용이 나올 것 같습니다.</span>\n<span class=\"colour\" style=\"color: rgb(22, 25, 31);\"></span>','https://i.imgur.com/1husdnO.jpg','2020-10-07 05:11:21','2020-10-13 01:45:32',1,7,0),
(13,'victor_77','재부팅시 명령어 자동실행(crontab)','긁어쓰는 우분투 설정','```\n에디트 모드로 설정하기:\ncrontab -e\n\n아래 내용 수정, 저장하기: \n@reboot /home/test/test/programstart.sh(명령어) \n\n```',NULL,'2020-10-08 05:46:52','2020-10-08 05:46:52',1,12,0),
(14,'victor_77','nginx 설치 및 설정','긁어쓰는 우분투 설정','```\nsudo apt-get install nginx\n\nsudo service nginx start\nsudo service nginx stop\nsudo service nginx restart\n\n아래의 파일 내용에 서버 설정 넣기(프록시 설정)\nsudo vim /etc/nginx/nginx.conf\n\nserver {\n    server_name dev-life.kr;\n    location / {\n        proxy_set_header HOST $host;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        proxy_pass http://127.0.0.1:3000;\n        proxy_redirect off;\n    }\n}\n```',NULL,'2020-10-08 05:49:43','2020-10-08 05:51:57',1,12,0),
(15,'victor_77','nginx에 https 설정하기','긁어쓰는 우분투 설정','```\n명령어로 certbot 다운받기:\nwget https://dl.eff.org/certbot-auto\n\n받은 certbot 파일 실행권한 주기:\nchmod a+x certbot-auto\n\ncertbot 실행:\n./certbot-auto\n```',NULL,'2020-10-08 05:54:51','2020-10-08 05:55:21',1,12,0),
(16,'victor_77','해당 포트에서 실행중인 서비스 확인하기','긁어쓰는 우분투 설정','```\nsudo lsof -i tcp:80\n```',NULL,'2020-10-08 05:57:21','2020-10-08 05:57:21',1,12,0),
(17,'victor_77','Wysiwyg Editor 적용 후기','리뷰','## 느낀점\n\n<b>*완벽한 에디터는 없다*</b>는걸 느꼈습니다. 어떤 에디터이건 만족스러운 부분이 있으면 아쉬운 부분도 꼭 있었던 것 같습니다. 다 좋은데 마크다운을 지원하지 않거나, 적용되어 있는 CSS가 마음에 들지 않는 경우 등 입니다. 그래서 에디터의 기초가 되는 부분만 받아서(draft js, CodeMirror) 직접 구현하거나, 아쉬운대로 쓸 수도 있고, CSS의 일부만 수정 할 수도 있습니다.\n<br>\n## 사용 환경\n\nReact, Next.js\n<br>\n## 알아본 에디터의 종류\n\n(더 많지만 직접 받아서 적용하고 사용까지 한 에디터만 소개하겠습니다.)\ndraft.js\ntui editor\n<br>\n## 서버사이드 랜더링과 에디터\n\n대부분의 에디터는 <b>*window객체*</b>를 사용합니다.\n그래서 서버에서 실행할 경우, window객체가 없기 때문에 에러가 납니다. 그래서 보통 Next js에서 제공하는 dynamic 함수를 사용하여 적용합니다.\n<br>\n## 각 에디터의 특징\n\n> 1. draft js\n\ndraft js에서 제공하는 에디터는, <b>*에터디의 가장 기초가 되는 기능들만 제공*</b>합니다. 그래서 직접 구현하거나, 다른사람들이 draft 를 사용해서 <i>**만들어놓은 라이브러리**</i>를 받아서 사용하는 방식이 있습니다. 종류도 많고 좋지만.. 완성도가 높진 않습니다. 플러그인을 받아서 사용할 수 도 있고, 완성된 형태로 올라와 있는 것도 있습니다. 저는 <b>*react-draft-wysiwyg*</b> 를 받아서 적용하고 사용하려고 했지만, 에디터에서 작성한 글을 DB에 저장하기 위해 변환하게 되는데, 그 <b>*변환된 내용이 너무 지저분*</b>했습니다. 그래서 <b>*마크다운으로 사용하려고 했지만 지원하지 않아서*</b> 적용했던 내용을 다 날리고 tui editor를 적용했습니다.\n\n사람들이 만들어 놓은 라이브러리를 정리해서 소개해주는 사이트 입니다.\n[보러가기](https://awesomeopensource.com/project/nikgraf/awesome-draft-js)\n\n<br>\n> 2\\. tui editor\n\n많은 기능이 지원됩니다. 엑셀을 복사해서 붙여넣을 수도 있고, 차트도 구현되어 있고, 코드블럭도 구현되어 있습니다. 직접 구현하지 않아도 되면서 <b>*가장 만족스러운 에디터*</b>입니다. 필요한 내용은 플러그인을 받아서 적용하는 방식으로 되어있고, 자바스크립트로 구현되어 있습니다. 자바스크립트로 구현되어 있는 내용을 React, Vue로 사용할 수 있도록 만들어진 인터페이스(?)를 제공합니다. Next js를 사용하면서 에디터를 적용하는게 까다롭고 잘 안되는 에디터들도 많은데, 이 에디터는 <b>*다른것들에 비해서 좀 더 깔끔하게 적용*</b> 됬습니다. 하지만 Next js 의dynamic 함수로 import를 하는 것 이외에 하나를 더 신경 써야 하는데요. 이 에디터는 작성된 글의 내용을 instance를 통해서 불러옵니다. 그런데 instance를 불러올 때, forwardRef를 사용해야 합니다.\n\n자세한 해결방법이 나온 사이트입니다.\n[보러가기](https://myeongjae.kim/blog/2020/04/05/tui-editor-with-nextjs)\n\n<br>\n## 시행착오\n\n처음 에디터를 적용할 때, <b>*window객체가 없다는 애러*</b>에 당황했습니다. 검색하고 여러 에디터들을 받아서 적용하는 과정에서 적응이 됬지만, React를 위해 나온 에디터들도 Next에서 제대로 적용이 안되는 경우도 있었습니다.(물론 제가 부족해서 적용이 안된것일 수도 있습니다.)\n\n에디터로 작성한 결과를 <b>*DB에 저장하기 위해 결과를 변환할 때, 그 내용이 깔끔하게 변환되는지*</b>도 생각해봐야 했습니다. 그래서 마크다운 에디터를 사용하는게 가장 좋을것 같다고 생각했습니다.\n\n<b>*코드블럭을 지원*</b>하는지 확인하고 적용했어야 했는데, 처음엔 그냥 다 지원할 것이라고 생각했습니다. 그런데 아니었습니다.','https://i.imgur.com/XPXP6Wh.jpeg','2020-10-09 02:12:34','2020-10-16 01:39:05',1,7,0),
(18,'victor_77','제로초 강의 후기','리뷰','# React로 NodeBird SNS 만들기 후기\n<br>\n## 강의 프로젝트 스펙\n\nfront : React, Next.js, Redux and Saga, AWS EC2 배포\nback : Node JS, Express, Sequelize(MySQL)\n<br>\n## 서드 파티 라이브러리\n\nfornt : ant-d, styled-component, immer, cross-env, faker, immer, moment, pm2, shortid, swr\nback : bcrypt, cookie-parser, cors, cross-env, dotenv, helmet, hpp, morgan, multer, passport\n\n<br>\n## 강의 시간\n\n약 16시간\n강의 수 91\n<br>\n## 가격\n\n8만 8천원\n<br>\n## 후기\n\n1. 느낀점\n2. 장점\n3. 단점\n4. 결론\n\n<br>\n<br>\n> 1\\. 느낀점\n\n깊은 지식보다는 전체적인 흐름을 알기 좋은 강의입니다.(물론 서버사이드 랜더링과 같은, 기본개념과 알아야 할 사전지식은 알려주십니다) 서버사이드 랜더링이 적용된 사이트를 만드는 과정(백엔드 프론트 모두)을 알 수 있습니다. 강의 순서는 프론트를 모두 구현한 다음 백엔드를 구현하는 방식으로 진행됩니다. 리뉴얼 이전 강의에서는 프론트와 백엔드를 같이 진행했는데, 어지럽다는 의견이 나와서 강의 순서를 바꾸셨다고 합니다. 그런데 제 입장에서는 저한테 필요한 부분을 찾아서 보는 입장이라서 이전 순서로 구성되 있었으면 하는 생각이 있었습니다. 제가 강의를 보는 순서는, 예를들면, 로그인을 구현하는 부분만 보려고 한다면, 일단 프론트 강의에서 로그인 부분을 찾아보고, 다시 백엔드 강의에서 로그인 부분을 찾아보는 순서로 강의를 봤습니다. 제 입장에선 아쉬운 부분이었지만 다른사람들 입장에선 좋은 부분도 분명 있고, 프론트 개발자와 백엔드 개발자 입장에서 강의를 볼 수 있기 때문에 무엇이 좋다고 말 할 순 없는 부분인 것 같습니다.\n\n<br>\n> 2\\. 장점\n\n일부러 에러를 발생시키고 그 에러를 해결하는 과정을 보여주기 때문에, 수강하는 사람 입장에서 시행착오를 줄일 수 있습니다.\n\nUI 프레임워크 중, material-ui를 많이 사용한다고 알고 있었습니다. 그래서 이 강의에서도 material-ui를 사용할 거라고 생각하고 있었습니다. 그래서 ant-design을 사용하는것에 처음엔 실망했지만, 제 프로젝트에서는 material-ui를 사용했고, ant-design과 비교하며 개발 할 수 있어서 좋았습니다.\n\nNext.js를 다루는 강좌입니다. 많은 강좌들이  React와 Node.js는 많이 다루지만, Next.js를 다루는 강의는 찾기 힘듭니다. 아마 많은분들이 수강한 이유인 것 같습니다.\n\n<br>\n> 3\\. 단점\n\n제로초님 유튜브에 리액트 무료강의가 있습니다. 강의에서 babel과 webpack을 다룹니다. CRA로 강의를 진행하지 않기 때문에, 리액트 개발환경을 더 깊이 이해 할 수 있었습니다. 그래서 이 강의에서도 그런 부분을 기대하고 있었습니다. 하지만 그만큼의 섬세함이 이 강의엔 없었습니다. Next.js를 사용하는 방식에 대해서 단순한 사용법(이런식으로 사용하면 됩니다 정도) 정도만 알 수 있는 정도입니다.\n\n편집도 아쉬운 부분입니다. 처음 ant-desing으로 화면을 만듭니다. 그런데 제 컴퓨터에서는 어설프게 적용됩니다. 나만 그런건가? 라고 생각해서 검색도 해보며 찾아봤습니다. 나중에 보니 질문글에 다른분 질문이 있었고, 답변엔 \'다른 강의에서 나옵니다\' 라는 답변이 있었습니다. 이런 부분을 확인 할 수 있게 적어만 줘도 시간을 아낄 수 있을것같아서 아쉬운 부분입니다.\n\n<br>\n> 4\\. 결론\n\n섬세함은 부족하지만 가격이 상대적으로 싼 편입니다. 이 강의를 통해서 사이트를 만드는 전체적인 뼈대를 알 수 있습니다. 살은 직접 붙여야 합니다. 그리고 Next.js까지 다루는 강의를 찾기가 힘들기 때문에 서버사이드 랜더링을 사용해야 하는 분들은 대부분 이 강의를 선택하는게 좋을 것 같습니다.\n\n<br>\n<br>\n','https://i.imgur.com/TuzwK27.png','2020-10-09 05:32:29','2020-10-13 01:46:10',1,7,0),
(19,'victor_77','백업','긁어쓰는 MySQL','DB별 백업\n\n```\nmysqldump -u root -p DB명 > 파일명.sql\n```\n<br>\nDB별 복원\n\n```\nmysql -u root -p DB명 < 파일명.sql\n```',NULL,'2020-10-13 03:48:21','2020-10-13 03:52:36',1,5,0),
(20,'victor_77','계획','개발일지','2. morgan 알아보기\n3. 긁어쓰는 CSS페이지 타이틀 나오지 않는 문제 해결하기\n5. 권한관리 코딩\n6. 로그관리\n7. 랜더링 최적화\n8. 헤로쿠 알아보기..\n9. 시간이 된다면 postgresql로 변경하기\n\n<br>\n* 색인 생성 결과 확인하기\n* 트리구조 개선\n* spost\n* 조회수, 방문자수 추가\n* 트리 셰이킹\n* about 페이지 디테일 수정\n* 코드 정리(redux-saga 정리, CSS 정리)\n* 개발 히스토리의 내용을 일반화하기\n* 로그인 모달 반응형 적용하기',NULL,'2020-10-16 12:20:00','2020-10-27 14:36:47',1,13,0),
(21,'victor_77','서버관리','개발일지','백엔드 서버가 가끔 멈춰있는걸 봅니다.\n메모리가 부족해서 그런 것 같습니다.\n\n프론트는 aws의 t2.micro(1G memory)\n백엔드는 aws의 t3a.nano(0.5G memory)\n\n백엔드의 경우, mysql과 npm을 같이 돌리기 때문에 그런게 아닌가 합니다.\n그래서 서로 유형을 바꿔서 돌리고 있습니다.',NULL,'2020-10-16 12:24:36','2020-10-16 12:24:36',1,13,0),
(22,'victor_77','개발 히스토리','개발일지','## 2020 / 10 / 17 토요일\n\n* url형식 개선( 2시간 ) :\n\n<br>\n* tui editor chart 적용( 30분 )\n\n<br>\n<br>\n## 2020 / 10 / 18 일요일\n\n* sitemap 적용( 1시간 30분 ) :\n일단 되는지 확인하는 용도로 post/1, post/2 두개만 적용했고, 구글 크롤러가 크롤링하는 걸 기다려야 할 것 같다. 일단 google search console에는 sitemap이 제대로 등록되었다.\n그리고 적용하는 과정에서 tui editor chart에서 에러가 났다. 서버 사이드 랜더링 이슈였다. 처음엔 dynamic 함수를 이용하면 해결될거라 생각했다. 막상 적용하니 다른 에러가 나왔다. 그래서 일단 차트는 제외하고 개발해야 겠다.\n\n<br>\n* 코드 정리 (1시간 10분)\n\n<br>\n* swr vs redux-saga 이미지 편집 (30분)\n\n<br>\n<br>\n## 2020 / 10 / 19 월요일\n\n* 리덕스 사가 리뷰 글 작성(1시간 30분)\n\n<br>\n* swr 리랜더링 최적화(1시간 30분) :\n처음 swr을 사용해서 요청을 보내려고 했지만 useEffect와 같이 사용하지 못해서 axios만 사용하기로 했다.\n\n<br>\n* 리덕스 사가로 작성된 write post, update post 걷어내기(2시간)\n\n<br>\n* 필요없는 코드, 글관리 리덕스 사가 걷어내기(1시간 10분)\n\n<br>\n<br>\n## 2020 / 10 / 20 화요일\n\n* 코드 정리 (40분)\n\n<br>\n<br>\n## 2020 / 10 / 21 수요일\n* about페이지 작성(40분)\n<br>\n* 로그인 관련 에러수정(30분)\n<br>\n* 메인페이지 모든 글 불러오기(2시간 30분)\n<br>\n* sequalize  concat(1시간)\n<br>\n* post 공지 속성 추가(1시간 30분)\n\n<br>\n<br>\n## 2020 / 10 / 22 목요일\n\n* 관리자 페이지 글관리 에러 해결하기( 15분 )\ncheckbox 태그의 checked에 undefined가 들어가는 문제.\n<br>\n* 메인화면에 공지사항 요청하기(14:20 ~ 14:30)\n <br>\n* 메인 스크롤 요청 구현하기(공지 제외)(14:30 ~ 16:44 )\n<br>\n* 서버에 적용(17:30 ~ 18:10 )\n<br>\n* baseUrl 적용(19:25 ~ 19:50)\n<br>\n* 각 아이디 별 포스트 요청 적용하기(19:50 ~ 20:30)\n<br>\n<br>\n## 2020 / 10 / 23 금요일\n\n* 메인페이지 에러 수정(9:15)\n<br>\n* 메인페이지 스크롤 요청 수정(~12:00)\n<br>\n* 로그아웃 후 다시 로그인되는 버그 그리고 서버에 적용(15:00~15:45):\n로그아웃 요청 후 바로 메인페이지로 이동하도록 코드를 짰다. 로그아웃 요청 처리 중 메인페이지로 넘어갔고, 로그아웃이 처리되기 전에 SSR의 처리가 시작된다. 쿠키에 로그인정보가 남아있어서 ssr처리중 로그인정보도 같이 포함되어 처리되는 중 로그아웃이 처리가 된 후, 메인페이지 요청처리가 완료되면서 로그인이 다시 되는것처럼 화면에 표시되는 에러였다.\n<br>\n<br>\n## 2020 / 10 / 23 금요일\n* 메인페이지 반응형 적용(13:30 ~ 14:30)\n<br>\n* 메타태그 내용 개선하기(14:30 ~ 35)',NULL,'2020-10-16 13:20:27','2020-10-24 05:35:32',1,13,0),
(24,'victor_77','Redux-Saga 사용 후기','리뷰','## 글의 구성\n* 참고사항\n* 느낀점\n* axios만으로 비동기 요청을 하는 경우\n* 리덕스 사가로 비동기 요청하는 코드\n<br>\n## 참고사항\n1. 일단 이 글은 리덕스 사가로 비동기 요청을 해보신 분이 이해하기 쉬운 글입니다.\n2. 리덕스 사가의 비효율성에 대한 글입니다.\n3. 하지만 필요없다는 말은 아닙니다. 사용법을 배워볼 가치는 있다고 생각하며, 분명 필요한 때가 있을 수도 있다고 생각합니다.\n<br>\n## 느낀점\n\n리덕스 사가를 사용하면서 생각했습니다. `꼭 이렇게까지 써야하나..?` 라구요. 그래서 리덕스 사가를 걷어내고 axios만 이용해서 구현해봤습니다. 그리고 리덕스 사가로 구현했을 때와 axios만으로 구현했을 때의 코드를 밑에 작성했습니다. 너무 차이가 납니다. 그 이유는, 비동기 요청을 리덕스를 통해서 하려고 하기 때문입니다. 그런데 굳이 그렇게 할 이유가 없습니다. 기능상의 차이를 따져본다면, 리덕스 사가로 구현할 경우, 비동기 요청으로 받은 값을 저장하고 재사용 할 수 있다는 것입니다. 하지만 axios만으로 값을 받아와서 리덕스 스토어에 저장하면 되기 때문에, 리덕스 사가를 걷어냈습니다.\n\n<br>\n## axios만으로 비동기 요청을 하는 경우\n\n1. 값을 저장할 state를 선언합니다.\n2. 값을 받아오기 위한 코드를 작성합니다.\n\n<br>\n> 1. 값을 저장할 state를 선언합니다.\n\n``` js\nconst [items, setItems] = useState([]);\n```\n<br>\n> 2\\. 값을 받아오기 위한 코드를 작성합니다\\.\n\n``` js\nuseEffect(() => {\n    axios\n    .get(\n        `${backUrl}post/getList?...`,\n        { withCredentials: true }\n    )\n    .then((result) => setItems(result.data))\n    .catch((err) => {\n        alert(err);\n    });\n}, [loginInfo, router.query]);\n```\n<br>\n<br>\n## 리덕스 사가로 비동기 요청하는 코드\n\n문제가 되는 부분은, 요청 과정에서 너무 많은 코드를 작성해야 된다는 것입니다.\n요청과정에서 작성해야 하는 코드를 순서대로 정리하면(프론트),\n\n1. 리덕스의 리듀서를 작성합니다.\n2. 리덕스의 사가에서 비동기 요청을 작성합니다.\n3. 특정 컴포넌트에서 특정 시점(useEffect)에 dispatch합니다.\n4. 값을 받아 사용하는 컴포넌트에서 useSelect로 값을 받습니다.\n\n<br>\n위의 내용들의 코드를 아래와 같이 작성합니다.\n<br>\n> 1. 리덕스의 리듀서를 작성합니다.\n\n``` javascript\nexport const initialState = {\n    item: {\n        totalCount: 0,\n        items: [],\n    },\n    getListLoading: false,\n    getListDone: false,\n    getListError: null,\n}\n\nconst reducer = (state = initialState, action) => {\n    switch (action.type) {\n       case \"GET_POST_LIST_REQUEST\":\n      return {\n        ...state,\n        getListLoading: true,\n        getListDone: false,\n        getListError: null,\n      };\n\n    case \"GET_POST_LIST_SUCCESS\":\n      jsonData = getData(action.data);\n      return {\n        ...state,\n        item: {\n          totalCount: action.data.length,\n          items: jsonData,\n        },\n        getListLoading: false,\n        getListDone: true,\n        getListError: null,\n      };\n\n    case \"GET_POST_LIST_FAILURE\":\n      return {\n        ...state,\n        getListLoading: false,\n        getListDone: false,\n        getListError: String(action.error),\n      };\n\n    case \"GET_POST_LIST_RESET\":\n      return {\n        ...state,\n        getListLoading: false,\n        getListDone: false,\n        getListError: null,\n      };\n    }\n}\n```\n<br>\n> 2. 리덕스의 사가에서 비동기 요청을 작성합니다.\n\n``` javascript\nfunction getPostListAPI(data) {\n	let request = \"/post/getList\";\n	return axios.get(request);\n}\n\n// 비동기 액션 크리에이터\nfunction* getPostList(action) {\n	try {\n		const result = yield call(getPostListAPI, action.data);\n		yield put({\n			type: \"GET_POST_LIST_SUCCESS\",\n			data: result.data, // 성공 결과\n		});\n	} catch (err) {\n		yield put({\n// put은 dispatch와 같은 기능을 한다.\n		type: \"GET_POST_LIST_FAILURE\",\n		data: err.response.data, // 실패 결과\n		});\n	}\n}\n\nfunction* watchGetPostList() {\n    yield takeLatest(\"GET_POST_LIST_REQUEST\", getPostList);\n}\n\nexport default function* postSaga() {\n      yield all([\n           fork(watchGetPostList)\n      ]);\n}\n```\n<br>\n> 3. 특정 컴포넌트에서 특정 시점(useEffect)에 dispatch합니다.\n\n``` javascript\n// 글 목록 호출\nuseEffect(() => {\n	const data = {\n		...\n	};\ndispatch({ type: \"GET_POST_LIST_REQUEST\", data });\n// 로그인 정보와 화면에 뿌려줄 데이터가 바뀌는 경우\n}, [router.query, loginInfo]);\n```\n<br>\n> 4\\. 값을 받아 사용하는 컴포넌트에서 useSelect로 값을 받습니다\\.\n\n``` js\nconst { items, getListDone, getListError } = useSelector(\n    (state) => ({\n        items: state.post.item.items,\n        getListDone: state.post.getListDone,\n        getListError: state.post.getListError,\n    }),\n    (prev, next) => {\n        return (\n            next.items === prev.items &&\n            next.getListDone === prev.getListDone &&\n            next.getListError === prev.getListError\n        );\n    }\n);\n```\n<br>\n<br>\n\n\n##','https://i.imgur.com/nloeLOP.jpeg','2020-10-18 11:42:45','2020-10-27 00:50:43',1,7,0),
(25,'victor_77','about','about','## 최종호\n\n자바보다 자바스크립트를 좋아하고, 리액트를 좋아합니다.\n\n<br>\n<br>\n## Skills\n\n* Front : es5/6, TypeScript, React, Redux, Material-ui\n* Back : Java, Node, Express, Sequelize, MySQL, Oracle\n* Cloude service : AWS\n\n<br>\n<br>\n## Works\n1. 태영건설 차세대 ERP 프로젝트\n<br>\n\n\n> 1. 태영건설 차세대 ERP 프로젝트 :\n* 근무형태 : 인력업체를 통한 파견\n* 개발기간 : 2019.04 \\~ 2020.04(1년 1개월)\n* 담당업무 : 구매자재 부서의 구매업무(입찰, 계약 등) 담당\n* 기술스펙 : ES5, Spring framework, oracle stored procedure\n* 약 30개의 화면 개발 중 세부기능사항 :\n    1. 공인인증서 적용\n    2. 파일 업, 다운로드\n    3. 동적 피벗 쿼리 적용\n    4. 원본 rtf파일과 정보를 조합하여 pdf파일(계약서) 생성\n    5. 입찰정보를 엑셀파일을 업로드하여 입력받는 기능\n    6. 입찰정보를 엑셀파일로 다운로드하는 기능\n    7. 보고서 출력기능\n    8. 전자결재\n    9. 보증서\n    10. 인지세\n\n<br>\n<br>\n## Sub Project\n\n1. 포트폴리오 사이트\n2. 블로그 사이트\n\n<br>\n> 1. 포트폴리오 사이트\n\n* 개발기간 : 2020.05 \\~ 2020.06(약 1개월)\n* 기술스펙 : React, TypeScript, Sass, Cypress(테스트 라이브러리)\n* https://emtete.github.io/portfolio/\n\n<br>\n> 2\\. 블로그 사이트\n\n* 개발기간 : 2020.08 \\~ 2020.10(약 2개월)\n* 기술스펙 :\n    1. Front : React, Next js, Redux, Material-ui, Sass, Toust-Ui\n    2. Back : Node, Express, Sequelize, MySQL\n    3. Cloude service : AWS\n* 세부 구현사항 :\n    1. 로그인\n유저, 권한 관리\n    2. 관리자 페이지\n메뉴관리 : 트리메뉴(2Depth) 추가, 수정, 삭제, 순서 변경 구현\n글관리 : 메뉴 변경 구현\n    3. 사용자 페이지\n포스트 리스트 : 아코디언 형식 출력, 글쓰기, 수정  구현\n카드 리스트    : 카드 형식 출력, 모달 디테일 페이지, 글쓰기, 수정 구현\n    4. 서버 사이드 랜더링 ( 메인페이지, 개별 post페이지 )\n    5. google search console을 이용한 검색엔진 최적화 ( 계속 적용중.. )\n    6. 모바일 화면 최적화 ( 사용자 페이지 )',NULL,'2020-10-20 10:27:02','2020-10-27 06:17:56',1,14,0),
(26,'victor_77','개발 히스토리 2','개발일지','## 2020-10-26 월요일\n* sitemap 동적생성 (2시간)\n* 최초 접속시, drawer 안보이도록(10분)\n* 쿠키 expires 30분 설정 (13:50 ~ 14:00)\n* 페이지 이동시 새로고침 문제 고민(14:00~14:30)\n* 모바일 최적화 (14:30 ~ 20:40)\n<br><br>\n## 2020-10-27 화요일\n* 모바일 최적화(14:07~15:15)\n* pm2 로그관리\n* winston 로그관리 라이브러리',NULL,'2020-10-26 04:37:26','2020-10-27 11:04:11',1,13,0),
(27,'victor_77','margin, padding 줄여쓰기','','\n* margin: [margin-top] [margin-right] [margin-bottom] [margin-left];\n* margin: [margin-top] [margin-left = margin-right] [margin-bottom];\n* margin: [margin-top=margin-bottom] [margin-left = margin-right];\n* margin: [margin-top = margin-bottom = margin-left = margin-right];\n\n<br>\n\n출처: https://zzaps.tistory.com/68 ',NULL,'2020-10-27 06:26:24','2020-10-27 06:26:24',1,15,0),
(28,'victor_77','vim 단축키','긁어쓰는 우분투 설정','gg    첫줄로 이동\ndG    현재 줄부터 마지막 줄 까지 삭제\n<br>\n\n출처: https://noota.tistory.com/entry/vi-전체-지우기 [누더기]',NULL,'2020-10-27 08:03:55','2020-10-27 08:04:04',1,12,0);