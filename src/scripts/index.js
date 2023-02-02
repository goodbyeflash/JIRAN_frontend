import '../styles/reset.scss';
import '../styles/admin.scss';
import '../styles/login.scss';
import '../styles/dodge.scss';
import api from './lib/api';
import dayjs from 'dayjs';
import image1 from '../images/dodge/jm_owp_event01.png';
import image4 from '../images/dodge/jm_owp_event04.png';
import image5 from '../images/dodge/jm_owp_event05.png';
import image6 from '../images/dodge/jm_owp_event06.png';

window.onload = () => {
  updateTable();

  //섹션1 영역
  document.getElementById('section1').getElementsByTagName('img')[0].src =
    image1;

  //섹션2 영역
  document
    .getElementById('section2')
    .getElementsByTagName(
      'embed'
    )[0].src = `${window.location.href}public/dodge/index.html`;

  let number = 16;
  for (let index = 1; index < 16; index++) {
    document
      .getElementById('section3')
      .getElementsByTagName('tbody')[0].innerHTML += `<tr>
    <td>${index}</td>
    <td id='name_${index}'></td>
    <td id='score_${index}'><i class="icon-gold"></i></td>
    <td>${number}</td>
    <td id='name_${number}'></td>
    <td id='score_${number}'><i class="icon-bronze"></i></td>
  </tr>`;
    number++;
  }

  //섹션4 영역
  document.getElementById('section4').getElementsByTagName('img')[0].src =
    image4;

  //섹션5 영역
  document.getElementById('section5').getElementsByTagName('img')[0].src =
    image5;

  //섹션6 영역
  document.getElementById('section6').getElementsByTagName('img')[0].src =
    image6;

  document.body.style.display = 'block';
};

// 데이터 테이블 업데이트
function updateTable() {
  api('get', 'users', undefined, (res) => {
    if (res) {
      if (res.msg == 'OK') {
        res.result.data.forEach((item, index) => {
          document.getElementById(`name_${index + 1}`).innerText = item.name;
          document.getElementById(`score_${index + 1}`).innerText = item.score;
        });
        updateDate();
      }
    }
  });
}

// 날짜 업데이트
function updateDate() {
  const now = dayjs();
  //섹션3 영역
  document
    .getElementById('section3')
    .getElementsByTagName('h1')[0].innerHTML = `${now.format(
    'YYYY년 M월 D일'
  )}(${dayForamt(now.format('d'))}) ${now.format('A')} ${now.format(
    'hh:mm'
  )} <span>최종 순위 기준</span>`;
}

function dayForamt(val) {
  var day = ['일', '월', '화', '수', '목', '금', '토'];
  return day[val];
}

window.addEventListener('message', (e) => {
  if (e.data == 'dataUpdate') {
    updateTable();
  }
});
