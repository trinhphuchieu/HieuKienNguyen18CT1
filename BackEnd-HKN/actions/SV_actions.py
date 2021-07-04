import sqlite3
from ..models import SinhVien_models
from flask.helpers import send_file


class SVActions:

    # --------------Ket Noi database------------------------
    def __init__(self, db_connection) -> None:
        self.db_connection = db_connection

    # --------------Hien Thi The Sinh Vien------------------------
    def HienThiSV(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = 'SELECT * FROM SinhVien'
        cursor.execute(sql)
        rows = cursor.fetchall()
        result = []
        for row in rows:
            SinhVien = SinhVien_models.SinhVien(
                mssv=row[0],
                ten=row[1],
                diachi=row[2],
                sodienthoai=row[3],
                noisinh=row[4],
            )
            result.append(SinhVien.serialize())
        cursor.close()
        return result

    # ---------------Them Sinh Vien------------------------
    def ThemSV(self, SinhVien: SinhVien_models.SinhVien):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        INSERT INTO SinhVien VALUES(?,?,?,?,?)
        """
        cursor.execute(sql, (
        SinhVien.mssv, SinhVien.ten, SinhVien.diachi, SinhVien.sodienthoai, SinhVien.noisinh))
        conn.commit()
        cursor.close()
        return 'Thêm Thành Công'

    # -----------Xoa Sinh Vien----------------------------
    def XoaSV(self, SinhVien: SinhVien_models.SinhVien):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        DELETE FROM SinhVien WHERE mssv = ?
        """
        cursor.execute(sql, (SinhVien.mssv,))
        
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        
        if count == 0:
            return 'Ko tim duoc mssv xoa', 404
        return 'Xoa Thành Công', 200

    def XoaSV1(self, SinhVien: SinhVien_models.SinhVien):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        DELETE FROM TheSinhVien WHERE mssv = ?
        """
        cursor.execute(sql, (SinhVien.mssv,))
        
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        
        if count == 0:
            return 'Ko tim duoc mssv xoa', 404
        return 'Xoa Thành Công', 200

    # -----------Cap Nhat The Sinh Vien----------------------------
    def CapNhatSV(self, mssv: int, SinhVien: SinhVien_models.SinhVien):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        UPDATE SinhVien SET ten =?,diachi =?,sodienthoai = ?,noisinh =? WHERE mssv = ?
        """
        cursor.execute(sql, (
        SinhVien.ten, SinhVien.diachi, SinhVien.sodienthoai, SinhVien.noisinh,
        mssv))
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        
        if count == 0:
            return 'Ko tim duoc mssv update', 404
        xoabangthe(mssv)
        return 'update Thành Công', 200

    # --------------XEM SINH VIÊN THEO mssv-------------------------

    def XemTheoMSSV(self, mssv: int):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        SELECT * FROM SinhVien WHERE mssv = ?
        """
        cursor.execute(sql, (mssv,))
        row = cursor.fetchone()
        cursor.close()
        if row == None:
            return 'Sai mssv ', 404
        SinhVien = SinhVien_models.SinhVien(
            mssv=row[0],
            ten=row[1],
            diachi=row[2],
            sodienthoai=row[3],
            noisinh=row[4],
        )
        return SinhVien


