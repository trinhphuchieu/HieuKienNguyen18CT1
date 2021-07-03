class SinhVien:

    def __init__(self,mssv=0, ten='', diachi='',noisinh='', sodienthoai=0):
        self.mssv = mssv
        self.ten = ten
        self.diachi = diachi
        self.sodienthoai = sodienthoai
        self.noisinh = noisinh
    
    def serialize(self):
        return{
            'mssv': self.mssv,
            'ten': self.ten,
            'diachi': self.diachi,
            'sodienthoai': self.sodienthoai,
            'noisinh': self.noisinh,
                     
        }