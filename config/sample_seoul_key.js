/**
 * 이 프로젝트를 실제로 구동하기 위해서는
 * 아래의 api_key 값을 자신이 발급받은 인증키로 변경한 후
 * 이 파일을 seoul_key.js 로 변경하여야 됩니다.
 */
var seoul_api = {
	api_key : 'Your_API_Key',
	api_url : 'http://openAPI.seoul.go.kr:8088/',
	api_name : 'SearchPerformanceBySubjectService'
}

exports.seoul = seoul_api