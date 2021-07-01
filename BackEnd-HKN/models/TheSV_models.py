class TheSV:


    def __init__(self,id=0,mssv=0,ten='',gioitinh='',ngaysinh='',lop='',nganh='',khoa='',khoahoc='',hinhanh=''):
        self.id = id
        self.mssv = mssv
        self.ten=ten
        self.gioitinh=gioitinh
        self.ngaysinh=ngaysinh
        self.lop=lop
        self.nganh=nganh
        self.khoa=khoa
        self.khoahoc=khoahoc
        self.hinhanh=hinhanh

    def serialize(self):
        return{
            'id':self.id,
            'mssv':self.mssv,
            'ten':self.ten,
            'gioitinh':self.gioitinh,
            'ngaysinh':self.ngaysinh,
            'lop':self.lop,
            'nganh':self.nganh,
            'khoa':self.khoa,
            'khoahoc':self.khoahoc,
            'hinhanh':self.hinhanh
        }
        
