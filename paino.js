let x = document.getElementById("btn-js"),
y = document.getElementById("js"),
audios = document.getElementsByTagName("audio"),
buttons = document.querySelectorAll("ul>li>div"),
blacks = document.querySelectorAll("ul>li>p"),
song = document.getElementById("song"),
check = document.getElementById("check"),
text = document.getElementById("text")

var scroe = {
'晴天':
`3243 157 1751 - 166 655 5432343
刮风这天我试过握着你手
但偏偏雨渐渐大到我看你不见

3453 457 2711 - 115 5654 2345 61 6 77

还要多久我才能在你身边
等到放晴的那天也许我会比较好一点

3243 157 1751 - 166 655 543 2343

从前从前有个人爱你很久
但偏偏风渐渐把距离吹得好远

3453 457 2711 - 115 5654 6712 32 1 1

好不容易又能再多爱一天
但故事的最后你好像还是说了拜拜`,
'最长的电影':
`12433 345431 12433 321622

我们的开始 是很长的电影 放映了三年 我票都还留着

12433 345 4315 438 32211

冰上的芭蕾 脑海中还在旋转 望着你 慢慢忘记你

12433 3454 31 12433 321622

朦胧的时间 我们溜了多远 冰刀画的圈 圈起了谁改变

12433 345 4318 4438 432 778

如果再重来 会不会稍显狼狈 爱是不是 不开口才珍贵

321622 32152211 321622 14321 543323

再给我两分钟 让我把回忆结成冰 别融化了眼泪 你妆都花了 要我怎么记得

34363322 23252272 53411 243211

记得你叫我忘了吧 记得你叫我忘了吧 你说你会哭 不是因为在乎`,
'同桌的你':
`55553457 - 6666465

明天你是否会想起 昨天你写的日记

55557654 - 4444321

明天你是否还惦记 曾经最爱哭的你

55553457 - 6666465

老师们都已想不起 猜不出问题的你

55557654 - 4444321

我也是偶然翻相片 才想起同桌的你

111156113 - 2222176

谁娶了多愁善感的你 谁看了你的日记

77777125 - 7712171

谁把你的长发盘起 谁给你做的嫁衣`
};

var numReg = /[1-9]/g;
var wordReg = /[\u4e00-\u9fa5]+/g;


var str;
var shows;
var words;
var wordsIndex;
var wordsCurrent;
var current;


function play(){
  buttons.forEach((el)=>el.classList.remove('show'))
  var songName = song.value;

  if(songName === ''){
    return alert('请输入歌曲名')
  }

  if(scroe.hasOwnProperty(songName)){
    str = scroe[songName];
    shows = str.match(numReg);
    words = str.match(wordReg);
    wordsIndex = 0;
    wordsCurrent = 0;
    current = 0;
    console.log(songName)
    buttons[shows[0]/1 - 1].classList.add('show');
    text.textContent = words[0]
  }else{
    return alert('您输入的歌曲名尚未加入曲库')
  }
}

check.addEventListener('click',play)

function start(){
  // 显示歌词的部分
  if(wordsCurrent>=words[wordsIndex].length-1){
    wordsCurrent = 0;
    wordsIndex++;
    text.textContent = words[wordsIndex]
  }else{
    wordsCurrent++
  }

  console.log(wordsCurrent)

  if(current === shows.length-1){
    buttons[shows[shows.length-1]/1 - 1].classList.remove('show');
    str = ''
    return console.log('演奏结束',current)
  }

  var showButton = shows[current+1]/1 - 1;
  var hiddenButton = shows[current]/1 - 1;

  buttons[hiddenButton].classList.remove('show');
  buttons[showButton].classList.add('show');
  current++
}

// 给琴键加上数字
buttons.forEach((el,index)=>el.textContent = index+1)

//介绍的隐藏与显示
function hide() {
  y.style.display === "block" ? y.style.display = "none" : y.style.display = "block"
}

x.addEventListener('click',hide);

// 给钢琴添加音频
for (var i = 1; i <= 8; i++) {
  var addaudio = document.createElement("audio");
  addaudio.setAttribute("src", "audios/" + "w" + i + ".ogv");
  document.body.appendChild(addaudio);
}
for (var i = 1; i <= 5; i++) {
  var addaudio = document.createElement("audio");
  addaudio.setAttribute("src", "audios/" + "b" + i + ".ogv");
  document.body.appendChild(addaudio);
}

//alert(blacks.length);
for (var i = 0; i < 8; i++) {
  buttons[i].index = i;
  buttons[i].onmousedown = function () {
    audios[this.index].load();
    audios[this.index].play();

    if(str){
      this.index == shows[current]-1 ? start() : '';
    }
  };
}
for (var i = 0; i < 5; i++) {
  blacks[i].index = i + 8;
  blacks[i].onmousedown = function () {
    audios[this.index].load();
    audios[this.index].play();
    //alert(audios[this.index].src);
  };
}

// 操作键盘钢琴白键发出声音
var keyCodes = new Array(83, 68, 70, 71, 72, 74, 75, 76, 69, 82, 89, 85, 73);
document.body.onkeydown = function (e) {
  for (var i = 0; i < keyCodes.length; i++) {
    if (e.keyCode == keyCodes[i]) {
      if (i < 8) {
        buttons[i].classList.add('white_active');
        if(str){
          i == shows[current]-1 ? start() : '';
        }
        
      } else {
        blacks[i-8].classList.add('black_active');
      }
      audios[i].load();
      audios[i].play();
    }
  }
};

// 操作键盘钢琴黑键发出声音
document.body.onkeyup = function (e) {
  //document.title=e.keyCode;
  for (var i = 0; i < keyCodes.length; i++) {
    if (e.keyCode == keyCodes[i]) {
      if (i < 8) {
        buttons[i].classList.remove('white_active');
      } else {
        blacks[i-8].classList.remove('black_active');
      }
    }
  }
};

window.addEventListener('keydown',function(e){
  if(e.keyCode == 86){
    if(buttons[0].textContent != ''){
      buttons.forEach((el)=>el.textContent = '')
    }else{
      buttons.forEach((el,index)=>el.textContent = index+1)
    }   
  }
})


