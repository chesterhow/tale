---

title: 스프링 VO map 형식 변환
author: jaycee
discripttion: 리플렉션을 이용한 스프링 VO map 형식 변환
category: spring
tag: spring,java,reflection

---

``` java
/**
 * vo를 map형식으로 변환해서 반환
 * @param vo VO
 * @return
 * @throws Exception
 */
public static Map<String, Object> introspect(Object vo) throws Exception {
  return introspectWithExcept(vo, null);
}

/**
 * 특정 변수를 제외해서 vo를 map형식으로 변환해서 반환.
 * @param vo VO
 * @param arrExceptList 제외할 property 명 리스트
 * @return
 * @throws Exception
 */
public static Map<String, Object> introspectWithExcept(Object vo, String[] arrExceptList) throws Exception {
  Map<String, Object> result = new HashMap<String, Object>();
  BeanInfo info = Introspector.getBeanInfo(vo.getClass());
    for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
        Method reader = pd.getReadMethod();
        if (reader != null) {
          if(arrExceptList != null && arrExceptList.length > 0 && StringUt.isContain(arrExceptList, pd.getName())) continue;
          result.put(pd.getName(), reader.invoke(vo));
        }
    }
    return result;
}



```
