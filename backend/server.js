const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
const axios = require('axios');

// Flask AI 서버의 엔드포인트 주소
const flaskServerUrl = 'http://localhost:5000/process_webcam_data';

// 웹캠 데이터를 Flask 서버로 전송
function sendWebcamDataToFlask(dataUrl) {
  axios.post(flaskServerUrl, { image_data: dataUrl })
    .then(response => {
      const result = response.data.result;
      // 처리 결과를 사용하여 필요한 작업을 수행
    })
    .catch(error => {
      console.error('Flask 서버로 데이터 전송 중 오류 발생:', error);
    });
}

// 클라이언트에서 웹캠 데이터를 받아오고 Flask 서버로 전송
// 이미지 데이터를 받아옴

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('웹 소켓 연결이 수립되었습니다.');

  socket.on('webcamData', (dataUrl) => {
    io.emit('webcamData', dataUrl); // 모든 클라이언트에게 데이터 전송
  });

  socket.on('disconnect', () => {
    console.log('웹 소켓 연결이 끊어졌습니다.');
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
