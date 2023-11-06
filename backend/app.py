# %cd ./backend/darknet/
# !sed -i 's/OPENCV=0/OPENCV=1/' Makefile
# !sed -i 's/GPU=0/GPU=1/' Makefile
# !sed -i 's/CUDNN=0/CUDNN=1/' Makefile
# !sed -i 's/CUDNN_HALF=0/CUDNN_HALF=1/' Makefile
# !sed -i 's/LIBSO=0/LIBSO=1/' Makefile
# !make

# cd backend/darknet

from flask import Flask, request, jsonify
#from flask_socketio import SocketIO
import cv2
import numpy as np
import os
from darknet import *

app = Flask(__name__)
current_directory = os.getcwd()
os.chdir(os.path.join(current_directory, "darknet"))
os.system('make')

print('------------')


# YOLO 모델 초기화 및 설정
yolo_cfg = 'path_to_yolo_cfg_file.cfg'

yolo_weights = 'path_to_yolo_weights.weights'

net = cv2.dnn.readNet(yolo_cfg, yolo_weights)

# 웹 소켓 연결 설정 (socket.io를 사용할 경우)

# YOLOv4 모델을 사용하여 라벨을 인식하고 결과를 반환
def detect_labels(image_data):
    # 이미지 데이터를 OpenCV 형식으로 변환
    image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)

    return labels


# 클라이언트로부터 받아온 이미지 데이터를 처리하는 코드
@app.route('/process_webcam_data', methods=['POST'])
def process_webcam_data():
    data = request.get_json()
    image_data = data['image_data']
    result = detect_labels(image_data)  # 이 함수에서 YOLO 모델을 사용하여 라벨을 인식

    # 예측 결과를 클라이언트로 전송
    return jsonify({'result': result})

socketio = SocketIO(app)

# # 클라이언트로부터 데이터를 받아처리하는 소켓 이벤트 정의
@socketio.on('connect')
def handle_connect():
    print('웹 소켓 연결이 수립되었습니다.')



if __name__ == '__main__':
    app.run(debug=True)


# # Makefile 수정
# makefile_path = os.path.join(current_directory, "backend", "darknet", "Makefile")

# # Makefile 파일이 있는지 확인
# if os.path.exists(makefile_path):
#     with open(makefile_path, "r") as file:
#         makefile_content = file.read()

#     # 필요한 옵션으로 변경
#     makefile_content = makefile_content.replace("OPENCV=0", "OPENCV=1")
#     # makefile_content = makefile_content.replace("GPU=0", "GPU=1")
#     # makefile_content = makefile_content.replace("CUDNN=0", "CUDNN=1")
#     # makefile_content = makefile_content.replace("CUDNN_HALF=0", "CUDNN_HALF=1")
#     makefile_content = makefile_content.replace("LIBSO=0", "LIBSO=1")

#     # 수정된 내용 저장
#     with open(makefile_path, "w") as file:
#         file.write(makefile_content)

#     # Darknet 빌드
#     # os.system("make")
#     # Darknet 빌드 (Windows에서는 'make' 대신 'mingw32-make'를 사용)
#     os.system("mingw32-make")

# else:
#     print("Makefile을 찾을 수 없습니다.")
