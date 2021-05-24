(() => {
    
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0;
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; 

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values : {
                messageA_opacity : [0, 1]
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            },
            values : {
                messageA_opacity : [0, 1]
            }
        },
        {
            //2
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            },
            values : {
                messageA_opacity : [0, 1]
            }
        },
        {
            //3
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            },
            values : {
                messageA_opacity : [0, 1]
            }
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length ; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        console.log(sceneInfo)

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i =0; i< sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 scene에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0] ;

        return rv;
    }


    function playAnimation() {

        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch(currentScene) {
            case 0:
                console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                let messageA_opacity_out = values.messageA_opacity[1]; 
                console.log( messageA_opacity_in);
                // calcValues()
                break;
            case 1:
                console.log('1 play');
                console.log( calcValues(values.messageA_opacity, currentYOffset));
                break;
            case 2:
                console.log('2 play');
                console.log( calcValues(values.messageA_opacity, currentYOffset));
                break;
            case 3:
                console.log('3 play');
                console.log( calcValues(values.messageA_opacity, currentYOffset));
                break;
            default :
                break;
        }
    }


    function scrollLoop() {
        enterNewScene=false;
        prevScrollHeight =0;
        for (let i=0; i< currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene=true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight) {
            enterNewScene=true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }


        

        // console.log(currentScene);
        // console.log(prevScrollHeight);
        // console.log(yOffset);
        if(enterNewScene) return;
        playAnimation();
    }
        

    window.addEventListener('resize', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    
    setLayout();
})()