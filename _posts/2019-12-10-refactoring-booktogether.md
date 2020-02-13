
# 컴포넌트 리팩토링



최근에 진행했던 [書로모임](http://booktogether.org) 프로젝트를 진행하며 코드에 대한 부족함을 많이 느껴 리팩토링을 하고 있습니다. 이번 블로그에서는 컴포넌트 리팩토링을 중점으로 이야기 하고 싶습니다.

**작고, 독립적인 컴포넌트를 만들자. **컴포넌트 캡슐화 입니다. 자세한 사항은 제 [블로그](https://medium.com/@oowgnoj/%EC%84%9C%EB%A1%9C%EB%AA%A8%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1-%EA%B0%9C%EB%B0%9C%ED%95%98%EB%A9%B0-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%8B%A4%EC%88%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%BA%A1%EC%8A%90%ED%99%94-59ab99a05d55)를 참고해 주세요.

리팩토링 과정은 다음과 같습니다.

1. 전체적인 어플리케이션의 구조를 파악하고

1. 각 페이지에서 컴포넌트가 될 수 있는 후보를 모두 정리했습니다. 이 때 컴포넌트의 단위는 **화면에 렌더되는 단위**로 약속했습니다.

1. 그 후 shared component, 즉 다른 컴포넌트 / 페이지에서 반복해서 사용되는 비슷한 컴포넌트를 묶고, ‘shared component’ 라고 이름 지었습니다. 
이 때, 중요한 점은 모든 부분이 정확히 일치하지 않아도, **핵심적인 부분이 비슷하다면 shared component로 묶어 재사용**하는 것 이었습니다.

1. 다른 곳에서 사용 될 가능성이 없다면 컴포넌트로 생성하지 않았습니다. 컴포넌트를 만들기위해 컴포넌트를 만드는 것은 불필요 하다고 생각했기 때문입니다.

1. render() 부분에서 발생되는 conditional rendering 최소화했습니다.

한 예로 OpenButton 컴포넌트를 설계했습니다. openbutton은 모달창을 활성화시키는 버튼을 컴포넌트화 한 것 입니다. 아래 표에 3번째 항목은 리팩토링 전 코드에서 다른 위치에서 동일하게 openButton 버튼 역할을 하던 버튼들이고, 리팩토링 후에는 OpenButton 컴포넌트를 재사용하게 될 예정입니다.

![](https://cdn-images-1.medium.com/max/3128/1*IqMXMxHxkOwQ63l2OD7w3w.png)

프로젝트 마무리 전에 우리가 작성한 모든 코드를 리팩토링하면 좋겠지만, 현실적으로 불가능한 목표라고 생각했습니다. 따라서 최소 하나의 페이지라도 리팩토링을 해보자고 얘기했습니다. 이 경험이 프로젝트 기간이 끝난 후에도 자발적으로 리팩토링을 하게 될거라고 생각했기 때문입니다.

![모든 component (그림 1)](https://cdn-images-1.medium.com/max/2392/1*9_DwCzlScg80maM-qaiv1Q.gif)*모든 component (그림 1)*

![shared component list 정리](https://cdn-images-1.medium.com/max/4476/1*IZ23lZ9pxCCFCPJVT7T0aA.png)*shared component list 정리*

설계 과정을 거치고 실제 코드로 옮겼습니다. 리팩토링 전(왼쪽) 후(오른쪽) 코드를 가져왔습니다. 이렇게 보기에 큰 차이가 안날 수도 있지만, 리팩토링 후 팀원들의 만족도가 대단했습니다.

![](https://cdn-images-1.medium.com/max/2768/1*XVFFaTJcPMlwrlhzDgpzYA.png)

![리팩토링 전 , 후](https://cdn-images-1.medium.com/max/2756/1*kRhKqJJsJ7OBK5k6Yw8BLA.png)*리팩토링 전 , 후*

크게 보이는 차이 몇가지를 나열한다면,

1. 어떤 view인지 예측이 조금 수월 해졌습니다 : 기존에는 이름 없는 <Button> 등을 사용 사용했다면, 리팩토링 후에는 EditButton, LikesButton 등 우리가 익숙한 컴포넌트가 한 눈에 들어오기 때문입니다.

2. render()부분에 선택적 렌더링이 사라져, 가독성이 좋아졌습니다. 리팩토링 후에는 해당 컴포넌트 내부에서 조건부 렌더를 하고 있습니다.

3. 모든 컴포넌트에서 inline-css를 제거하고 CSS 파일을 따로 관리하여 component 내부에서는 자식 component와 그에 다른 props만 명확하게 볼 수 있게 되었습니다.

*CSS className을 정의하고 공용으로 관리하는 부분을 추후에 함께 진행하는 편이 효율적일거라 생각했습니다. 따라서 CSS부분은 제외하고 리팩토링을 진행했습니다.

![](https://cdn-images-1.medium.com/max/5076/1*1jqSnXfQyOqpll4jNj9AGQ.png)

![](https://cdn-images-1.medium.com/max/4604/1*LuunL9iq_5dLJTHSQZFt-Q.png)

리팩토링 결과 (좌) 페이지가 이렇게(우)로 바뀌었습니다. 그럼에도 나를 비롯한 팀원들이 리팩토링 결과가 화면에 렌더되는 순간 감격했습니다. 아마 우리도 더 나은 코드를 작성할 수 있다는 희망과 믿음에서 나온게 아닐까 하는 생각이 들었습니다.
