import '../styles/reset.scss';
import '../styles/admin.scss';
import '../styles/login.scss';
import '../styles/dodge.scss';
import api from './lib/api';

window.onload = () => {
  api('get', 'users', undefined, (res) => {
    if (res) {
      if (res.msg == 'OK') {
        res.result.data.forEach((item) => {
          console.log(item);
          document.getElementById(
            'list'
          ).innerHTML += `<li>${item.name}/${item.score}</li>`;
        });
      }
    }
  });
};
