참고<br>
https://t-okk.tistory.com/7
https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=mingu216&logNo=221302426428

1. labelIMG 설치 : https://github.com/HumanSignal/labelImg#windows
2. PyQt4 설치 : https://www.riverbankcomputing.com/software/pyqt/download
3. SIP 다운로드 : https://www.riverbankcomputing.com/software/sip/download
4. lxml 다운로드 : https://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml <br>
5. 추가 다운로드 : Anaconda <br>
5.1) 아나콘다 CMD를 관리자권한으로<br>
5.2) labelImg-master 위치로 이동<br>
5.3) 콘다로 pyqt 설치 후 실행<br><br>
conda install pyqt=5<br>
pyrcc5 -o resources.py resources.qrc<br>
python labelImg.py