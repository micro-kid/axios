import request from './request'

document.querySelector('.send').onclick = function () {
  request.post('/api/interceptor', {
    text: document.querySelector('.input').value
  }).then(res => {
    console.log(res)
  })
}