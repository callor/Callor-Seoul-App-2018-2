// seoul_key.js로 부터 seoul을 일단 추출
var api = require('../config/seoul_key.js').seoul

var s_url = api.api_url
var s_key = api.api_key
var s_service = api.api_cult

var s_pet = api.api_pet

// 외부 API를 조회하기 위해 request라는 라이브러리 사용
var request = require('request')

module.exports =(app)=>{
	
	app.get('/seoul/:id',(req,res)=>{
		
		let seoul_url = s_url + s_key 
			+ '/json/' + s_service + '/1/100/' + req.params.id

		request({
			url : seoul_url,
			method : 'GET'
		},(err,response,data)=>{
			
			// 실제 데이터가 data 변수에 담겨서 넘어온다
			// data 담긴 값은 단순한 String 형이다
			// String형 값을 json 형태로 변경을 해야한다.
			let json_data = JSON.parse(data)
			
			//	실제 데이터
			let data_row = json_data
				.SearchPerformanceBySubjectService
				.row
				
			let data_count = json_data
				.SearchPerformanceBySubjectService
				.list_total_count
			
			res.render('index',{body:'cult',
								seoul:data_row})
			
		})
	})
	
	app.get('/pet',(req,res)=>{
		
		let seoul_url = s_url + s_key
		+ '/json/' + s_pet + '/1/1000'
		
		request({
			url : seoul_url,
			method:'GET'
		},(err,response,data)=>{
			// 실제 데이터가 data 변수에 담겨서 넘어온다
			// data 담긴 값은 단순한 String 형이다
			// String형 값을 json 형태로 변경을 해야한다.
			let json_data = JSON.parse(data)
			
			//	실제 데이터
			let data_row = json_data
				.vtrHospitalInfo
				.row
				
			let data_count = json_data
				.vtrHospitalInfo
				.list_total_count
			
			// 실제 추출된 데이터를 확인
			console.log(data_row)
			
			// 데이터 개수가 몇개인가 확인
			console.log(data_count)

			res.render('index',{body:'pet',
								seoul:data_row})
			
		})
	})
	
	
	
	
	
}