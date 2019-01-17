---

title: 프로시져 없이 SQL만으로 기간을 입력받아 일자별로 렌트비용 출력시키기. (응용) 중간에 행사렌트비용 섞어서 출력하기.
author: jaycee
description: 기간을 입력받고 일별로 자료를 출력하고자 할 때, 프로시져를 사용해야한다. 커서 또한 써야 여러 레코드를 출력받을 수 있다. 이것을 프로시져를 쓰지않고 connect by를 이용하여 sql문만으로 처리할 수 있다. 그 방법을 알아보자.
category: sql
published : true
tag: oracle,connect by,procedure

---

기간을 입력받고 일별로 자료를 출력하고자 할때, 아래와 같이 약간의 조건이 있는 렌트카의 렌트비를 일자별로 계산하는 경우를 가정해보자.

1. 1월 1일부터 20일간 렌트.
2. 기준 렌트가격은 100,000원 가격 적용
3. 중간에 이벤트 가격으로 1월 15일에 50,000원 1월 17일에 30,000원 행사 가격 적용.
4. 행사가격이 있다면 행사가격을 우선 적용

위 조건으로 일자별 가격을 출력한다고 할 때, 구현할 수 있는 방법은 아래와 같이 세가지가 있다.

- 자바에서 날짜별로 반복문을 돌려 실행하는 방법 >> 비효율적임. WAS-DB간 통신이 잦아 자원이 낭비됨.
- 프로시져 이용 >> 수정이력이 남지 않고, 커서를 이용해야 함. 프로시져보다 sql이 편함.
- sql 이용 >> 쿼리 짜기 번거로움

나는 프로시져를 쓰는 것을 선호하지 않기 때문에 sql로 해결하곤 한다. 또한, 프로젝트에 따라 프로시져를 허용하지 않는 곳도 있다.

sql을 이용한다면 먼저 connect by level 을 조인 걸어 일자별로 출력시킬 수 있다.

## 1,2번 조건 적용 쿼리 (1.1월 1일부터 20일간 렌트. 일자별로 가격 조회.)
connect by를 이용하여 하루씩 증가시킬 수 있다. to_date를 이용하는 대신에 1일차, 2일차와 같이 일차를 받아서 계산할 수도 있다.
``` sql
select * from 
	(
        select 
               '소나타' AS res_name
              , sysdate + level - 1 AS res_date
    	      , level as day_Ord
    	      , 100000 as rent_Prc --렌트 금액 
          from dual
    connect by level < TO_DATE('20190120','YYYYMMDD') - TO_DATE('20190101','YYYYMMDD') + 2
	)
```

## 3번 조건 (중간에 이벤트 가격으로 1월 15일에 50,000원 1월 17일에 30,000원 행사 가격 적용.)
여기에 이벤트 금액을 아우터 조인시키고,
``` sql
	select RES_NAME
	     , STD.res_Date AS STD_RES_DATE
	     , STD.day_Ord AS STD_DAY_ORD
	     , STD.rent_Prc AS STD_RENT_PRC
	     , EVT.rent_Prc AS EVT_RENT_PRC
	 from 
		(
		select '소나타' AS res_name
		      , to_char(TO_DATE('20190101','YYYYMMDD') + level-1,'YYYYMMDD') AS res_Date
		      , level as day_Ord
		      , 100000 as rent_Prc
		  from dual
		connect by level < TO_DATE('20190120','YYYYMMDD') - TO_DATE('20190101','YYYYMMDD') + 2
		) STD --기준가격 테이블
		,(
		select 50000 as rent_Prc
		     , '20190115' as res_Date
		  from dual
        UNION
		select 30000 as rent_Prc
		     , '20190117' as res_Date
		  from dual
		) EVT --행사가격 테이블
	 where STD.res_Date = EVT.res_Date(+)
	order by STD.res_Date
```


## 4번 적용(행사가격이 있다면 행사가격을 우선 적용함)
이벤트 가격이 null인 경우에는 기준가격을 조회하고 아닌 경우(else)에는 이벤트 가격을 조회하는 CASE WHEN 구문을 사용한다.
완성된 쿼리는 아래와 같다.
``` sql

SELECT RES_NAME AS RES_NAME
     , STD_DAY_ORD AS DAY_ORD
     , STD_RES_DATE AS RES_DATE
     , CASE WHEN EVT_RENT_PRC is null THEN STD_RENT_PRC
                                      ELSE EVT_RENT_PRC
       END AS CAL_PRC
 FROM (	
	select RES_NAME
	     , STD.res_Date AS STD_RES_DATE
	     , STD.day_Ord AS STD_DAY_ORD
	     , STD.rent_Prc AS STD_RENT_PRC
	     , EVT.rent_Prc AS EVT_RENT_PRC
	 from 
		(
		select '소나타' AS res_name
		      , to_char(TO_DATE('20190101','YYYYMMDD') + level-1,'YYYYMMDD') AS res_Date
		      , level as day_Ord
		      , 100000 as rent_Prc
		  from dual
		connect by level < TO_DATE('20190120','YYYYMMDD') - TO_DATE('20190101','YYYYMMDD') + 2
		) STD --기준가격 
		,(
		select 50000 as rent_Prc
		     , '20190115' as res_Date
		  from dual
		UNION
		select 30000 as rent_Prc
		     , '20190117' as res_Date
		  from dual
		) EVT --행사가격 테이블
	 where STD.res_Date = EVT.res_Date(+)
  order by STD.res_Date
  )
  
```
