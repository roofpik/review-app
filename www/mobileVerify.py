from restful import Resource
from flask_restful import reqparse
from random import randint
import requests
import firedb

class resentOtp(Resource):
		def post(self):
			parser = reqparse.RequestParser()
			parser.add_argument('mobno', type=str, help='mobile number')
			args = parser.parse_args()

			_mobno = args['mobno']
			r = randint(1000, 9999)
			_randno = r

			fire_verify  = firedb.roofpik_connect('verifyMobile/'+str(_mobno)+'/otp/'+str(_randno), auth = True)
			fire_verify.put(True)

#  			payload = {'APIKEY': 'rNfGwBJ7xcV', 'MobileNo': _mobno, 'SenderID':'ROOFPK', 'ServiceName': 'TEMPLATE_BASED','Message': 'Greetings! ' + str(_randno) +  ' is your verification code for Roofpik.'}
#			r = requests.get('http://smsapi.24x7sms.com/api_2.0/SendSMS.aspx', params=payload)
			return {'StatusCode':'200','Message':'OTP sent', 'OTP': str(_randno)}

