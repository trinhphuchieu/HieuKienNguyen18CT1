#  Thư viện
from flask import Flask,json
from flask import jsonify
from flask import request
from flask.helpers import make_response
from flask_cors import CORS
import sqlite3
from .actions.TheSV_actions import TheSVActions
from .models.TheSV_models import TheSV

#  flask và sqlite
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app)
connect_data = './db.sqlite3'


@app.route('/')

def home():
    return 'Hello Word'


# hiển thị danh sách thẻ 
@app.route('/api/danhsachtsv',methods=['GET'])

def DanhSachThe():
    TheSV_Actions = TheSVActions(connect_data)
    result = TheSV_Actions.HienThiThe()
    return jsonify(result)

#-------------------- Danh Sach Thẻ -------------------------------------
@app.route('/api/themtsv',methods=['POST'])
def NhanThe(): 
    mssv = request.form['mssv']
    ten = request.form['ten']
    gioitinh = request.form['gioitinh']
    ngaysinh = request.form['ngaysinh']
    lop = request.form['lop']
    nganh = request.form['nganh']
    khoa = request.form['khoa']
    khoahoc = request.form['khoahoc']
    hinhanh = request.form['hinhanh']
    thesv = TheSV(mssv= mssv,ten=ten,gioitinh=gioitinh,ngaysinh=ngaysinh,lop=lop,nganh=nganh,khoa=khoa,khoahoc=khoahoc,hinhanh=hinhanh)
    TheSV_Actions = TheSVActions(connect_data)
    result = TheSV_Actions.ThemTheSV(thesv)
    
    response = make_response(jsonify({"message":"success"}),201)
    response.headers.add("Access-Control-Allow-Origin","*")
    response.content_type="application/json"
    return response

#--------------------- API Xoa The Sinh Vien --------------------------------------
@app.route('/api/xoathesv/<int:id>',methods=['DELETE'])
def XoaThe(id):
    TheSV_Actions = TheSVActions(connect_data)
    thesv = TheSV(id=id)
    TheSV_Actions.XoaTheSV(thesv)
    response = make_response(jsonify({"message":"success"}),201)
    response.headers.add("Access-Control-Allow-Origin","*")
    response.content_type="application/json"
    return response

#-------------------- API Cap Nhat The Sinh Vien-------------------
@app.route('/api/capnhattsv/<int:id>',methods=['PUT','GET'])
def CapNhatThe(id):

    if request.method == 'GET':
        TheSV_Actions = TheSVActions(connect_data)
        result,status_code = TheSV_Actions.XemTheoID(id)
     
        if status_code==200:
            return jsonify(result.serialize()),status_code
        return jsonify({
            'message':result
        }),status_code

    elif request.method=='PUT':   
        body =request.json
        ten = body.get('ten','')
        gioitinh = body.get('gioitinh','')
        ngaysinh = body.get('ngaysinh','')
        lop = body.get('lop','')
        nganh = body.get('nganh','')
        khoa = body.get('khoa','')
        khoahoc = body.get('khoahoc','')
        hinhanh = body.get('hinhanh','')
        thesv = TheSV(ten=ten,gioitinh=gioitinh,ngaysinh=ngaysinh,lop=lop,nganh=nganh,khoa=khoa,khoahoc=khoahoc,hinhanh=hinhanh)
        TheSV_Actions = TheSVActions(connect_data)
        message = TheSV_Actions.CapNhatTheSV(id,thesv)   
        response = make_response(jsonify({"message":"success"}),201)
        response.headers.add("Access-Control-Allow-Origin","*")
        response.content_type="application/json"
        return response


