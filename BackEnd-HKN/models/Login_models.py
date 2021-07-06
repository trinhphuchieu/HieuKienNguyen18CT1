
class Login:

    def __init__(self,id = 0,taikhoan='',matkhau='',vaitro=''):
        self.id = id
        self.taikhoan=taikhoan
        self.matkhau=matkhau
        self.vaitro=vaitro

    def serialize(self):
        return{
            'id':self.id,
            'taikhoan':self.taikhoan,
            'matkhau':self.matkhau,
            'vaitro':self.vaitro,
        }