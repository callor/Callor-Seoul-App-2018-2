var naver = require('../config/naver_key.js')
var request = require('request')

// Naver 조회를 위한 Setting
var options = (api_url)=>{
	return {
		url : api_url,
		headers : {
			'X-Naver-Client-Id' : naver.Client_Id,
			'X-Naver-Client-Secret' : naver.Client_Secret
		}
	}
}

module.exports = (app)=>{
	
	app.get('/naver/map',(req,res)=>{
		res.render('index',{body:'map'})
	})
	
	// 주소를 이용해서 위도 경도를 추출하는 부분
	// naver 지도서비스에 있는 주소->좌표 변환 API를 이용해서
	// 주소로 부터 좌표를 얻을 예정
	app.get('/naver/map/:addr',(req,res)=>{
		
		let addr = req.params.addr
		// addr = '광주시 북구 경양로 170'

		// 주소를 좌표로 바꾸는 api 주소
		let api_url 
		= 'https://openapi.naver.com/v1/map/geocode'
		api_url += '?query=' + encodeURI(addr)
		
		console.log(options(api_url))
		request.get(options(api_url),
				
				// naver로 부터 전달받은 결과
				(err,response,data)=>{
					if(!err && response.statusCode == 200) {
						console.log(data)
						
						// String 형 data를 JSON 형으로 변환
						let jSonData = JSON.parse(data)
						
						// 필요한 부분만 추출
						let addrXY = jSonData
										.result
										.items[0]
										.point
						res.render('index',{body:'map',point:addrXY})
					} else {
						console.log(err)
					}
		})
	})
}