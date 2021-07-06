import sqlite3
from ..models import Login_models
from hashlib import md5


class LoginActions:

    def __init__(self, db_connection) -> None:
        self.db_connection = db_connection

    def DangNhap(self, user: Login_models.Login):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT *
            FROM DangNhap
            WHERE taikhoan LIKE ? AND matkhau LIKE ?
        """
        hashed = md5(user.matkhau.encode()).hexdigest()
        cursor.execute(sql,(user.taikhoan, hashed))
        row = cursor.fetchone()
        if row == None:
            return 'Sai tài khoản hoặc mật khẩu', 401
        xacthuc = Login_models.Login(
            id=row[0],
            taikhoan=row[1],
            vaitro=row[3]
        )
        return xacthuc, 200


    def DangKy(self, user: Login_models.Login):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO DangNhap
            VALUES(NULL,?,?,?)
           
        """
        hashed = md5(user.matkhau.encode()).hexdigest()
        cursor.execute(sql,(user.taikhoan,hashed,user.vaitro))
        row = cursor.fetchone()
        conn.commit()
        cursor.close()
        xacthuc ="dang ky thanh cong"
        return xacthuc, 200
