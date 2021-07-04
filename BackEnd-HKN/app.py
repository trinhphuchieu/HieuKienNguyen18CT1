#  Thư viện
from flask import Flask,json
from flask import jsonify
from flask import request
from flask.helpers import make_response
from flask.helpers import send_file
from flask_cors import CORS
import sqlite3
from .actions.TheSV_actions import TheSVActions
from .actions.SV_actions import SVActions
from .models.TheSV_models import TheSV
from .models.SinhVien_models import SinhVien
from time import time
import os
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
    file = ""     
    if not request.files.get('hinhanh', None):  
        file = ""
    else:
        hinhanh = request.files['hinhanh']
        file = str(int(time()))+'.jpg'
        hinhanh.save(f'uploads\{file}') 

    mssv = request.form['mssv']
    ten = request.form['ten']
    gioitinh = request.form['gioitinh']
    ngaysinh = request.form['ngaysinh']
    lop = request.form['lop']
    nganh = request.form['nganh']
    khoa = request.form['khoa']
    khoahoc = request.form['khoahoc']
    thesv = TheSV(mssv= mssv,ten=ten,gioitinh=gioitinh,ngaysinh=ngaysinh,lop=lop,nganh=nganh,khoa=khoa,khoahoc=khoahoc,hinhanh=file)
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
        result= TheSV_Actions.XemTheoID(id)
        ketqua= []
        ketqua.append(result.serialize())
        return jsonify(ketqua)

    elif request.method=='PUT':
        TheSV_Actions = TheSVActions(connect_data)
        nhanvat = ""
         
        if not request.files.get('hinhanh', None):  
            nhanvat = TheSV_Actions.LayTenAnh(id)
        else:
            hinhanh = request.files['hinhanh']
            nhanvat = str(int(time()))+'.jpg'
            hinhanh.save(f'uploads\{nhanvat}') 
              
        ten = request.form['ten']
        gioitinh = request.form['gioitinh']
        ngaysinh = request.form['ngaysinh']
        lop = request.form['lop']
        nganh = request.form['nganh']
        khoa = request.form['khoa']
        khoahoc = request.form['khoahoc']
        thesv = TheSV(ten=ten,gioitinh=gioitinh,ngaysinh=ngaysinh,lop=lop,nganh=nganh,khoa=khoa,khoahoc=khoahoc,hinhanh=nhanvat)
        
        message = TheSV_Actions.CapNhatTheSV(id,thesv)   
        response = make_response(jsonify({"message":"success"}),201)
        response.headers.add("Access-Control-Allow-Origin","*")
        response.content_type="application/json"
        return response

@app.route('/api/anhthe/<int:id>')
def AnhSV(id):
    TheSV_Actions = TheSVActions(connect_data)
    return send_file(f'uploads\{TheSV_Actions.LayAnh(id)}',mimetype='image/jpeg')
    
#--------------------------------------------- API SINH VIEN --------------------------------------------------
#--------------------------------------------- API SINH VIEN --------------------------------------------------
#--------------------------------------------- API SINH VIEN --------------------------------------------------
#--------------------------------------------- API SINH VIEN --------------------------------------------------


# hiển thị danh sách Sinh Vien
@app.route('/api/danhsachsv', methods=['GET'])
def DanhSachSV():
    SinhVien_Actions = SVActions(connect_data)
    result = SinhVien_Actions.HienThiSV()
    return jsonify(result)



# --------------------- API Xoa  Sinh Vien --------------------------------------


@app.route('/api/xoasv/<int:mssv>', methods=['DELETE'])
def XoaSV(mssv):
    SinhVien_Actions = SVActions(connect_data)
    sv = SinhVien(mssv=mssv)
    SinhVien_Actions.XoaSV(sv)
    SinhVien_Actions.XoaSV1(sv)
    response = make_response(jsonify({"message": "success"}), 201)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.content_type = "application/json"
    return response


# -------------------- API Cap Nhat  Sinh Vien-------------------




@app.route('/api/themsv', methods=['POST'])
def NhanSinhVien():
    mssv = request.form['mssv']
    ten = request.form['ten']
    diachi = request.form['diachi']
    sodienthoai = request.form['sodienthoai']
    noisinh = request.form['noisinh']
    sv = SinhVien(mssv=mssv, ten=ten,
                  diachi=diachi, sodienthoai=sodienthoai, noisinh=noisinh)
    SinhVien_Actions = SVActions(connect_data)
    result = SinhVien_Actions.ThemSV(sv)

    response = make_response(jsonify({"message": "success"}), 201)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.content_type = "application/json"
    return response


@app.route('/api/capnhatsv/<int:mssv>', methods=['PUT', 'GET'])
def CapNhatSV(mssv):
    if request.method == 'GET':
        SinhVien_Actions = SVActions(connect_data)
        result = SinhVien_Actions.XemTheoMSSV(mssv)
        ketqua = []
        ketqua.append(result.serialize())
        return jsonify(ketqua)

    elif request.method == 'PUT':
        ten = request.form['ten']
        diachi = request.form['diachi']
        sodienthoai = request.form['sodienthoai']
        noisinh = request.form['noisinh']
        sv = SinhVien(ten=ten,
                            diachi=diachi, sodienthoai=sodienthoai, noisinh=noisinh)
        SinhVien_Actions = SVActions(connect_data)
        message = SinhVien_Actions.CapNhatSV(mssv,sv)
        response = make_response(jsonify({"message": "success"}), 201)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.content_type = "application/json"
        return response    