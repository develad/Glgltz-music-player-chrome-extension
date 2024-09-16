const songs = document.querySelector('.songs-outter');
const controlIcon = document.querySelector('.control-icon');
const equ = document.querySelector('#equ');

let firstLoad = true;

const getData = async () => {
  if (firstLoad) {
    songs.innerHTML = `
    <div class="box">
    <h1 style="text-align:center;">
    בטעינה...
    </h1>
    <img id="spinner" src="./assets/white spinner.gif"/>
    </div>
    `;
    firstLoad = !firstLoad;
  }
  const res = await fetch(
    'https://express-gcloud-424017.oa.r.appspot.com/glgltz'
  );
  const data = await res.json();
  return data;
};

function showSongs() {
  getData().then((data) => {
    const timeA = upTime([data[0].CurrentSong][0].startTime);
    const timeB = data[0].NextSong && upTime([data[0].NextSong][0].startTime);
    songs.innerHTML = `
        <h1>מתנגן עכשיו:</h1>
        <span class="song-title">${[data[0].CurrentSong][0].titleName}</span>
        <h2>${[data[0].CurrentSong][0].artistName}</h2>
        <h2>${[data[0].CurrentSong][0].Year}</h2>
        <h2>החל להתנגן ב: ${timeA}</h2>
        ${
          (data[0].NextSong ?? '') &&
          `
          <div class="line"></div>
          <h1>לאחר מכן:</h1>
          <span class="song-title">${[data[0].NextSong][0].titleName}</span>
          <h2>${[data[0].NextSong][0].artistName}</h2>
          <h2>${[data[0].NextSong][0].Year}</h2>
          <h2>יתחיל להתנגן ב: ${timeB}</h2>`
        }
        
        `;
  });
}
showSongs();
setInterval(showSongs, 1000 * 30);

let isPlaying = false;
const radio = new Audio('https://glzwizzlv.bynetcdn.com/glglz_mp3');

const playRadio = () => {
  if (!isPlaying) {
    radio.load();
    radio.play();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-stop-circle" id="play" ></i>`;
    controlIcon.classList.add('spin');
    equ.style.display = 'block';
    setTimeout(() => {
      controlIcon.classList.remove('spin');
    }, 500);
  } else {
    radio.pause();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-play-circle" id="stop"></i>`;
    controlIcon.classList.add('spin');
    equ.style.display = 'none';
    setTimeout(() => {
      controlIcon.classList.remove('spin');
    }, 500);
  }
};

controlIcon.addEventListener('click', playRadio);

document.querySelector('body').addEventListener('keydown', (e) => {
  if (e.code === 'Space') playRadio();
});

function upTime(uptime) {
  const time = uptime.split('T')[1].split('.')[0].split(':');
  return `${time[0]}:${time[1]}`;
}
