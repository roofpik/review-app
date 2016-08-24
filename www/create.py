from restful import Resource
from flask_restful import reqparse
import re
import random
import datetime
import md5
import firedb


class registerUser(Resource):
	def post(self):
		parser = reqparse.RequestParser()
		parser.add_argument('uname', type=str)
		parser.add_argument('uemail', type=str)
		parser.add_argument('umobile', type=str)
		parser.add_argument('uaddress', type=str)
		args = parser.parse_args()
		_uname = args['uname']
		_uemail = args['uemail']
		_umobile = args['umobile']
		_uaddress = args['uaddress']

		if not _uname or not _uemail or not _umobile:
			return {'StatusCode':'400', 'Message':'invalid'}

		fire = firedb.roofpik_connect('users/data/'+_id, auth = True)
		data = fire.get()

		if data:
                        data['userId'] = _uid
                        data['email']['usedFlag'] = True
                        data['email']['activeFlag'] = False
                        data['email']['emailFlag'] = True
                        data['email']['verifiedTime'] = str(datetime.datetime.now())
                else:
                        return {'StatusCode':'400', 'Message':'User does not exist'}

                fire.remove()
                fire_users  = firedb.roofpik_connect('users/data/'+_uid, auth = True)
                fire_users.put(data)

#                userData = {}
#                fire_device = firedb.roofpik_connect("deviceInformation/"+data['deviceId']+"/users", auth = True)
#                userData[_uid] = True
#                fire_device.put(userData)

                fire_referral = firedb.roofpik_connect("referrals/data/"+data['myReferralCode'], auth = True)
                referralData = {
                        'uid': _uid
                }
                fire_referral.put(referralData)
                if('referralCode' in data):
                        fire_refer = firedb.roofpik_connect('referrals/data/'+data['referralCode']+"/referredUsers/"+_uid, auth= True)
                        fire_refer.put(True)

                return {'StatusCode':'200', 'Message':'User successfully created'}

