---

title: JSON 배열의 파라미터 컨트롤러로 받기 및 출력하기
author: jaycee
description: 가끔 햇갈리는 JSON 배열 파라미터 받는 방법을 알아보자.
category: spring
published : true
tag: spring,JSON

---

웹페이지를 초기화 할때, 공통코드들을 읽어서 셀렉트박스나, 체크박스에 입력하는 경우가 빈번하다.

jsp로 서블릿 페이지로 한번에 화면을 그릴 수도 있지만, ajax형태로 한꺼번에 처리할 수도 있다.

개인적으로 서버에서 처리하는 것보다 ajax 형태로 불러오는 것을 선호한다.

이럴때 공통코드마다 ajax를 여러번 호출하는 것 보다 여러 공통코드를 한번에 요청하고 한번에 받아오면,
클라이언트-서버 단 통신 횟수가 줄어들게 되어 페이지 로딩시간 단축에 좋은 효과가 있다.

무엇보다도 코드가 짧아진다.

아래와 같이 구현할 수 있다.

코드를 설명하자면..
파라미터 오브젝트의 trgtObj 변수는 클라이언트에서 data응답을 받을 때 입력받을 오브젝트의 명이다.
objPrmtr.trgtObj = 'objCity' 로 입력하여 요청하면 응답받는 data에서 data.objCity 형태로 읽어와서 사용할 수 있다.

## javascript
``` javascript
function fn_initCmmnnCd(){

  var arrPrmtr = new Array(); //Object를 배열로 저장할 Array
  var objPrmtr = new Object(); //key, value형태로 저장할 Object
  
  //시도 조회
  objPrmtr = new Object();
  objPrmtr.trgtObj = 'objCity';
  objPrmtr.codeId = '064';
  objPrmtr.useYn = 'Y';
  arrPrmtr.push(objPrmtr);

  //상품 종류 조회
  objPrmtr = new Object();
  objPrmtr.trgtObj = 'objGoodsType';
  objPrmtr.codeId = '066';
  objPrmtr.useYn = 'Y';
  arrPrmtr.push(objPrmtr);

  $.ajax({
          url:'/rep/cm/selectCmmnnCodeList.do',
          type:'post',
	  contentType:'application/json; charset=UTF-8'
          dataType:'json',
          data:JSON.stringify(arrPrmtr),
          success:function(data){

              //시도 세팅
              data.objCity.forEach(function(item, idx, arr){
                $('#select_locate').append("<option value='"+item.detailCode+"'>"+item.codeNm+"</option>");
              });

              //상품종류 세팅
              data.objGoodsType.forEach(function(item, idx, arr){
                $('#selectGoodsType').append("<option value='"+item.detailCode+"'>"+item.codeNm+"</option>");
              });
           }
  });
}
```

## 컨트롤러
``` java
@PostMapping(value="/cm/selectCmmnnCodeList.do")
public ModelAndView selectCmmnnCodeList(@RequestBody CmmnnCdVO[] srchCmmnnCdArr) {

  ModelAndView jsonModel = new ModelAndView("jsonView");
  for(CmmnnCdVO cmmnnCdVO: cmmnnCdArr){
    //공통코드 조회 후 
    jsonModel.addObject(srchCmmnnCdVO.getTrgtObj(), cmmnnService.selectCmmnnCodeList(srchCmmnnCdVO));
  }

  return jsonModel;
}
```

## 공통코드 및 검색 기능 겸용 VO
``` java
public class CmmnnCdVO implements Serializable {
	/** 웹으로 출력 시 입력시킬 대상 오브젝트명*/
	private String trgtObj;

	/**
	 * @return the trgtObj
	 * @see #trgtObj
	 */
	public String getTrgtObj() {
		return trgtObj;
	}

	/**
	 * @param trgtObj the trgtObj to set
	 * @see #trgtObj
	 */
	public void setTrgtObj(String trgtObj) {
		this.trgtObj = trgtObj;
	}
	/** 코드ID */
	private String codeId;
	/** 상세코드 */
	private String detailCode;
	/** 코드명 */
	private String codeNm;
	/** 코드내용 */
	private String codeDc;
	/** 사용여부 */
	private String useYn;
	/** 정렬순서 */
	private int sortOrdr;
	/** 상위코드ID */
	private String upperCodeId;
	/** 상위상세코드 */
	private String upperDetailCode;

	/**
	 * @return the codeId
	 * @see #codeId
	 */
	public String getCodeId() {
		return codeId;
	}
	/**
	 * @param codeId the codeId to set
	 * @see #codeId
	 */
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}
	/**
	 * @return the detailCode
	 * @see #detailCode
	 */
	public String getDetailCode() {
		return detailCode;
	}
	/**
	 * @param detailCode the detailCode to set
	 * @see #detailCode
	 */
	public void setDetailCode(String detailCode) {
		this.detailCode = detailCode;
	}
	/**
	 * @return the codeNm
	 * @see #codeNm
	 */
	public String getCodeNm() {
		return codeNm;
	}
	/**
	 * @param codeNm the codeNm to set
	 * @see #codeNm
	 */
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}
	/**
	 * @return the codeDc
	 * @see #codeDc
	 */
	public String getCodeDc() {
		return codeDc;
	}
	/**
	 * @param codeDc the codeDc to set
	 * @see #codeDc
	 */
	public void setCodeDc(String codeDc) {
		this.codeDc = codeDc;
	}
	/**
	 * @return the useYn
	 * @see #useYn
	 */
	public String getUseYn() {
		return useYn;
	}
	/**
	 * @param useYn the useYn to set
	 * @see #useYn
	 */
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	/**
	 * @return the sortOrdr
	 * @see #sortOrdr
	 */
	public int getSortOrdr() {
		return sortOrdr;
	}
	/**
	 * @param sortOrdr the sortOrdr to set
	 * @see #sortOrdr
	 */
	public void setSortOrdr(int sortOrdr) {
		this.sortOrdr = sortOrdr;
	}
	/**
	 * @return the upperCodeId
	 * @see #upperCodeId
	 */
	public String getUpperCodeId() {
		return upperCodeId;
	}
	/**
	 * @param upperCodeId the upperCodeId to set
	 * @see #upperCodeId
	 */
	public void setUpperCodeId(String upperCodeId) {
		this.upperCodeId = upperCodeId;
	}
	/**
	 * @return the upperDetailCode
	 * @see #upperDetailCode
	 */
	public String getUpperDetailCode() {
		return upperDetailCode;
	}
	/**
	 * @param upperDetailCode the upperDetailCode to set
	 * @see #upperDetailCode
	 */
	public void setUpperDetailCode(String upperDetailCode) {
		this.upperDetailCode = upperDetailCode;
	}

}
```
