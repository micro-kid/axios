import request from './request'

document.querySelector('.send').onclick = function () {
  request.get('/api/cancel', {})
}