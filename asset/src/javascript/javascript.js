const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(()=>{
  function getNumberUrl(from, to) {
    var pathName = window.location.search.toLowerCase();
    endNum = pathName.indexOf(to, pathName);
    var numSong = window.location.search.slice(from, endNum).match(/\d/g);
    numSong = parseInt(numSong.join(""));
    return numSong;
  }
  function getPathSearch(keyWord) {
    var pathSearch = window.location.search.toLowerCase();
    pathSearch = pathSearch.indexOf(keyWord);
    console.log(pathSearch);
    return pathSearch;
  }
  var listSongs = [
    // {
    //   name: "No",
    // },
    {
      name: "Lặng Yên",
      author: "Bùi Anh Tuấn",
      src: "./asset/audio/langyen.mp3",
      img: "./asset/image/1.jpg",
    },
    {
      name: "Chuyện đôi ta",
      author: "no author",
      src: "./asset/audio/chuyendoita.mp3",
      img: "./asset/image/2.jpg",
    },
    {
      name: "Ngày Mai Em Đi Mất ft DatGMusic",
      author: "Đạt G",
      src: "./asset/audio/Đạt G  Ngày Mai Em Đi Mất  Live at DearOcean DatGMusic.mp3",
      img: "./asset/image/3.jpg",
    },
    {
      name: "Suýt nữa thì",
      author: "Indie",
      src: "./asset/audio/SUÝT NỮA THÌ  OFFICIAL OST  CHUYẾN ĐI CỦA THANH XUÂN  ANDIEZ x BITIS HUNTER  LYRIC VIDEO.mp3",
      img: "./asset/image/4.jpg",
    },
    {
      name: " Anh tự do nhưng cô đơn",
      author: "Đạt G",
      src: "./asset/audio/anhtudonhungcodon.mp3",
      img: "./asset/image/5.jpg",
    },
  ];
  if (
    getNumberUrl("?song=", "?es?") != -1 &&
    getNumberUrl("?song=", "?es?") <= listSongs.length
  ) {


    autoGetSong();
    function autoGetSong() {
      insertInfoSong(getNumberUrl("?song=", "?es?"));
      runAudio(getNumberUrl("?song=", "?es?"));
      $(".audio").play();
      setTimeSong();
    }
    function getOneSong(index) {
      listSongs[index];
      var oneSong = [
        {
          name: listSongs[index].name,
          author: listSongs[index].author,
          src: listSongs[index].src,
          img: listSongs[index].img,
        },
      ];
      return oneSong;
    }
    function insertInfoSong(index) {
      const numberSong = getNumberUrl(index);
      var songInfo = getOneSong(numberSong)[0];
      $(".count_song").querySelector(".stt").innerHTML = numberSong + 1;
      $(".count_song").querySelector(".lenght_list").innerHTML =
        listSongs.length;
      $(".content").querySelector(".name-song").innerHTML = songInfo.name;
      $(".content").querySelector(".name").innerHTML = songInfo.author;
      $(".card_play_music").querySelector(".img").querySelector("img").src = songInfo.img;
    }
    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;
      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    }
    function setTimeSong() {
      var autoRun = setInterval(autoRunCurent, 1000);
      function autoRunCurent() {
        $(".time.current").textContent = getTimeCodeFromNum(
          $(".audio").currentTime
        );
        $(".time.full").textContent = getTimeCodeFromNum(
          $(".audio").duration - $(".audio").currentTime
        );
        time_line = parseInt(
          ($(".audio").currentTime / $(".audio").duration) * 100
        );
        $(".time_line").value = time_line;
        $(".time_line").style.backgroundSize = time_line + "%" + "100%";

        if ($(".audio").currentTime == $(".audio").duration) {
          clearInterval(autoRun);
        }
      }
    }
    function runAudio(index) {
      var songInfo = getOneSong(index)[0];
      if (songInfo.src != $(".src_song").value) {
        $(".audio").addEventListener("loadeddata", () => {});
        $(".audio").src = songInfo.src;
        $(".src_song").value = songInfo.src;
      }
      return songInfo;
    }
    $(".fa-solid.fa-circle-play.active").addEventListener("click",()=>{
      $(".audio").play();
      $(".fa-solid.fa-circle-play.active").style.zIndex = -1;
      $(".fa-solid.fa-circle-pause.active").style.zIndex = 1;
      $(".mix-song").style.opacity = "1";
      setInterval(() => {
        if ($(".audio").currentTime == $(".audio").duration) {
          var numSong = getNumberUrl("?song=", "?es?") + 1;
          numSong = numSong > listSongs.length ? 0 : numSong ;
          history.pushState("", "", "index.html?" + "song=" + numSong + "?es?");
          insertInfoSong(numSong);
          setTimeSong();
          runAudio(numSong);
          $(".audio").play();
          $(".audio").setAttribute("autoplay", "");
        }
      }, 1000);
    });
    $(".fa-solid.fa-circle-pause.active").addEventListener("click",()=>{
      $(".audio").pause();
      $(".fa-solid.fa-circle-play.active").style.zIndex = 1;
      $(".fa-solid.fa-circle-pause.active").style.zIndex = -1;
      $(".mix-song").style.opacity = "0";
    });

    // $(".fa-solid.fa-circle-play.active").addEventListener("click", () => {
    //   insertInfoSong(getNumberUrl("?song=", "?es?"));
    //   $(".audio").play();
    //   setTimeSong();
    // });


    $(".fa-solid.fa-backward-step").addEventListener("click", () => {
      $(".mix-song").style.opacity = "1";
      var numSong = getNumberUrl("?song=", "?es?") - 1;
      numSong = numSong < 0 ? numSong + 1 : numSong;
      history.pushState(
        "",
        "",
        "index.html?" + "song=" + numSong + "?es?"
      );
      $(".fa-solid.fa-circle-play.active").style.zIndex = -1;
      $(".fa-solid.fa-circle-pause.active").style.zIndex = 1;
      $(".playSongs").classList.add("active");
      insertInfoSong(numSong);
      runAudio(numSong);
      $(".audio").play();
    });
    $(".fa-solid.fa-forward-step").addEventListener("click", () => {
      $(".mix-song").style.opacity = "1";
      var numSong = getNumberUrl("?song=", "?es?") + 1;
      numSong = numSong > listSongs.length - 1 ? numSong - 1 : numSong;
      history.pushState(
        "",
        "",
        "index.html?" + "song=" + numSong + "?es?"
      );
      $(".playSongs").classList.add("active");
      $(".fa-solid.fa-circle-play.active").style.zIndex = -1;
      $(".fa-solid.fa-circle-pause.active").style.zIndex = 1;
      insertInfoSong(numSong);
      runAudio(numSong);
      $(".audio").play();
    });
    $(".fa-solid.fa-repeat-1").addEventListener("click", () => {
      if ($(".fa-solid.fa-repeat-1.active") == null) {
        $(".audio").setAttribute("loop", "");
        $(".fa-solid.fa-repeat-1").classList.add("active");
      } else {
        $(".audio").removeAttribute("loop");
        $(".fa-solid.fa-repeat-1").classList.remove("active");
      }
    });
    $(".fa-solid.fa-shuffle").addEventListener("click", ()=>{
      if ($(".fa-solid.fa-shuffle.active") != null){
        $(".fa-solid.fa-shuffle").classList.remove("active");
        $(".audio").removeAttribute("autoplay");
      }else{
        $(".fa-solid.fa-shuffle").classList.add("active");
        $(".audio").removeAttribute("loop");
        $(".fa-solid.fa-repeat-1").classList.remove("active");
          setInterval(()=>{
              if ($(".audio").currentTime == $(".audio").duration){
                var randNum = randomNumSong();
                randNum = randNum == getNumberUrl("?song=", "?es?") ? randNum - 1 : randNum;
                randNum = randNum < 0 ? 1 : randNum ;
                    history.pushState(
                      "",
                      "",
                      "index.html?" + "song=" + randNum + "?es?"
                    );
                      insertInfoSong(randNum);
                      setTimeSong();
                      runAudio(randNum);
                      $(".audio").play();
                      $(".audio").setAttribute("autoplay", "");
                console.log("end");
              }
          },1000);
      }
    });    
    function randomNumSong(){
      var numRandom = Math.floor(Math.random() * listSongs.length + 0);
        return numRandom;
    }
    (() => {
      $(".volumn")
        .querySelector(".open")
        .addEventListener("click", () => {
          if ($(".volumn.active") != null) {
            $(".volumn").classList.remove("active");
            $(".fa-solid.fa-volume.open").style.color = "var(--color--black)";
          } else {
            $(".audio").volume = 1;
            $(".volumn").classList.add("active");
            $(".fa-solid.fa-volume.open").style.color = "#ff4500";
            $(".fa-solid.fa-volume-xmark").style.color = "var(--color--black)";
          }
        });
      $(".volumn")
        .querySelector(".volumn_new")
        .addEventListener("input", (e) => {
          $(".audio").volume = $(".volumn_new").value / 100;
        });
      $(".volumn")
        .querySelector(".fa-solid.fa-volume-xmark")
        .addEventListener("click", () => {
          if ($(".audio").volume == 0) {
            $(".audio").volume = 1;
            $(".fa-solid.fa-volume-xmark").style.color = "var(--color--black)";
          } else {
            $(".audio").volume = 0;
            $(".fa-solid.fa-volume-xmark").style.color = "#ff4500";
          }
        });
    })();
    document.addEventListener("keydown", (e) => {
      var key = 0;
      if (e.keyCode === 32) {
        if(key == 0){
          $(".playSongs").querySelector(".fa-solid.fa-circle-play.active");
          var btnPlay = $(".playSongs").querySelector(".fa-solid.fa-circle-play.active");
          if (btnPlay.style.zIndex == 1){
              $(".audio").play();
              $(".fa-solid.fa-circle-play.active").style.zIndex = -1;
              $(".fa-solid.fa-circle-pause.active").style.zIndex = 1;
              $(".mix-song").style.opacity = "1";
          }else{
              $(".audio").pause();
              $(".fa-solid.fa-circle-play.active").style.zIndex = 1;
              $(".fa-solid.fa-circle-pause.active").style.zIndex = -1;
              $(".mix-song").style.opacity = "0";
          }

        }

      }
    });

    (()=>{
      $(".love").addEventListener("click", () => {
        if ($("i.fa-solid.fa-heart.love.active") == null) {
          $(".love").classList.add("active");
          $(".love_song").value = "1";
          console.log($(".love_song").value);
        } else {
          $(".love").classList.remove("active");
          $(".love_song").value = "0";
          console.log($(".love_song").value);
        }
      });
    })();
      
    (()=>{
        $(".time_line").style.backgroundSize = $(".time_line").value + "%" + "100%";
        $(".time_line").value = 0;
        var time_line = $(".time_line").value;
        $(".time_line").style.backgroundSize = time_line + "%" + "100%";
        $(".time_line").addEventListener("input", () => {
          $(".audio").currentTime =
            ($(".audio").duration / 100) * $(".time_line").value;
          time_line = $(".time_line").value;
          var currentTime = getTimeCodeFromNum(
            ($(".audio").duration / 100) * $(".time_line").value
          );
          $(".time.current").innerHTML = currentTime;
          $(".time_line").style.backgroundSize = time_line + "%" + "100%";
        });
    })();
    
  } else {
    $(".audio").src = "not found";
    $(".name-song").innerHTML = "Bài hát không tồn tại";
    $(".name").innerHTML = "Bài hát không tồn tại";
  }


})();