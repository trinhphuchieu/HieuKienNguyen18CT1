import sqlite3
from ..models import TheSV_models
from flask.helpers import send_file


class TheSVActions:



    #--------------Ket Noi database------------------------
    def __init__(self,db_connection)->None:
        self.db_connection = db_connection
    
    #--------------Hien Thi The Sinh Vien------------------------
    def HienThiThe(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ='SELECT * FROM TheSinhVien'
        cursor.execute(sql)
        rows = cursor.fetchall()      
        result= []
        for row in rows:
            thesv = TheSV_models.TheSV(
                id = row[0],
                mssv = row[1],
                ten  = row[2],
                gioitinh = row[3],
                ngaysinh =row[4],
                lop = row[5],
                nganh = row[6],
                khoa = row[7],
                khoahoc= row[8],
                hinhanh = row[9]
            )
            result.append(thesv.serialize())
        cursor.close()
        return result

    #---------------Them Sinh Vien------------------------
    def ThemTheSV(self,thesv:TheSV_models.TheSV):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        INSERT INTO TheSinhVien VALUES(null,?,?,?,?,?,?,?,?,?)
        """
        cursor.execute(sql,(thesv.mssv,thesv.ten,thesv.gioitinh,thesv.ngaysinh,thesv.lop,thesv.nganh,thesv.khoa,thesv.khoahoc,thesv.hinhanh))
        conn.commit()
        cursor.close()
        return 'Thêm Thành Công'

    #-----------Xoa The Sinh Vien----------------------------
    def XoaTheSV(self,thesv:TheSV_models.TheSV):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        DELETE FROM TheSinhVien WHERE id = ?
        """
        cursor.execute(sql,(thesv.id,))
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        if count ==0:
            return 'Ko tim duoc id xoa',404
        return 'Xoa Thành Công',200

    #-----------Cap Nhat The Sinh Vien----------------------------    
    def CapNhatTheSV(self,id:int,thesv:TheSV_models.TheSV):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        UPDATE TheSinhVien SET ten =?,gioitinh =?,ngaysinh = ?,lop =?,nganh = ?,khoa=?,khoahoc = ?,hinhanh=? WHERE ID = ?
        """
        cursor.execute(sql,(thesv.ten,thesv.gioitinh,thesv.ngaysinh,thesv.lop,thesv.nganh,thesv.khoa,thesv.khoahoc,thesv.hinhanh,id))
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        if count ==0:
            return 'Ko tim duoc id update',404
        return 'update Thành Công',200
    
    #--------------XEM THẺ SINH VIÊN THEO ID-------------------------
    def XemTheoID(self,id:int):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        SELECT * FROM TheSinhVien WHERE id = ?
        """
        cursor.execute(sql,(id,))    
        row = cursor.fetchone()
        cursor.close()
        if row == None:
            return 'Sai ID thẻ ',404
        thesv = TheSV_models.TheSV(
                id = row[0],
                mssv = row[1],
                ten  = row[2],
                gioitinh = row[3],
                ngaysinh =row[4],
                lop = row[5],
                nganh = row[6],
                khoa = row[7],
                khoahoc= row[8],
                hinhanh = row[9],
            )
        return thesv

    def LayAnh(self,id:int):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        SELECT hinhanh FROM TheSinhVien WHERE id = ?
        """
        cursor.execute(sql,(id,))    
        row = cursor.fetchone()
        cursor.close()
        if row == None:
            return 'Sai ID thẻ ',404
        hinhanh = row[0]
        return hinhanh


    def LayTenAnh(self,id:int):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        SELECT hinhanh FROM TheSinhVien WHERE id =?
        """
        cursor.execute(sql, (id,))
        row = cursor.fetchone()
        cursor.close()  
        return row[0]