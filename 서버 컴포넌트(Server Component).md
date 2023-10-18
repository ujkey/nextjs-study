# 서버 컴포넌트와 클라이언트 컴포넌트

<br/><br/>

<!-- ## 서버 vs 클라이언트 컴포넌트
### 렌더링 방식 비교
#### SSR(Server Side Rendering)
#### CSR(Client Side Rendering)

### 적절한 상황에서 사용하기

<br/>

## 서버 컴포넌트(Server Component) 활용
https://nextjs.org/docs/app/building-your-application/rendering/server-components
서버 컴포넌트를 사용하면 서버에서 렌더링하고 선택적으로 캐시할 수 있는 UI를 작성할 수 있다.
### 장점 -->

<!-- 
<br/> -->

## 클라이언트 컴포넌트(Client Component)
클라이언트 컴포넌트를 사용하면, 요청 시 클라이언트에 렌더링할 수 있는 대화형 UI를 작성할 수 있다. <br/>
Nextjs에서 클라이언트 렌더링은 옵션이기 때문에, 클라이언트에서 렌더링해야 하는 컴포넌트를 명시적으로 결정해야 한다.

### 장점
#### 1. 상호 작용성
클라이언트 컴포넌트를 사용하면 상태를 변경하고 이벤트를 처리할 수 있다. 즉, 사용자에게 즉각적인 피드백을 제공하고, UI를 동적으로 업데이트할 수 있다
#### 2. 브라우저 API에 엑세스 가능
클라이언트 컴포넌트는 브라우저 API에 엑세스할 수 있다. 예를 들어, `window` 객체에 엑세스하여 브라우저 창의 크기를 가져오거나, `navigator` 객체에 엑세스하여 사용자의 위치를 가져올 수 있다. 

<br/>

### 사용법
클라이언트 컴포넌트를 사용하려면 파일 상단에 `'use client'` 지시어를 추가한다.<br/>
`'use client'` 지시문을 정의하면, React에게 컴포넌트와 자식 컴포넌트를 클라이언트에서 렌더링하도록 하고, API를 사용 가능하도록 한다.
```tsx
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

<br/>

### 클라이언트 경계(Client Boundary)
`'use client'` 지시어은 서버와 클라이언트 컴포넌트 모듈 사이의 경계를 선언하는 데 사용된다. 
즉, 애플리케이션을 여러 클라이언트 컴포넌트 번들로 분할할 수 있다. <br/>
그러나 클라이언트에서 렌더링해야 하는 모든 컴포넌트에 정의할 필요는 없다. 경계안의 모든 컴포넌트와 임포트한 모듈이 암시적으로 클라이언트 컴포넌트로 변환되기 때문이다.

#### 문제점
다음 `Home` 컴포넌트에서 리액트 상태를 사용하려면 클라이언트 컴포넌트로 만들어야 한다. `Home`은 최상위 컴포넌트이므로 자식 컴포넌트도 암시적으로 전부 클라이언트 컴포넌트로 변경된다는 문제가 발생한다.

```tsx
// Home.tsx
'use client';

import { DARK_COLORS, LIGHT_COLORS } from '@/constants.js';
import Header from './Header';
import MainContent from './MainContent';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorVariables = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <body style={colorVariables}>
      <Header />
      <MainContent />
    </div>
  );
}
```

#### 해결
다음과 같이 분리하면 `Home`은 더 이상 클라이언트 컴포넌트일 필요가 없기 때문에 `use client` 지시어를 제거할 수 있다. `Header`와 `MainContent`가 암묵적으로 클라이언트 컴포넌트로 변환되는 문제가 해결된다.

클라이언트 컴포넌트인 `ColorProvider`는 관계상 `Header`와 `MainContent`의 부모이지만, 클라이언트 경계에서는 부모/자식 관계는 중요하지 않다. `Home`이 `Header`와 `MainContent`를 소유하고 있기 때문에 클라이언트 컴포넌트로 변환되지 않는다.

> `Home`이 `Header`와 `MainContent`를 불러와 렌더링 하기때문에 `Home`이 두 컴포넌트의 프로퍼티를 결정하게된다. 이를 `Home`이 `Header`와 `MainContent`를 소유하고 있다고 한다. 

이처럼 독립적인 컴포넌트로 재구성(분리)하고 소유자를 변경하여 문제를 해결할 수 있다. `'use client'` 지시어는 파일이나 모듈 레벨에서 작동하기 때문이다.

```tsx
// ColorProvider.tsx
'use client';

import { DARK_COLORS, LIGHT_COLORS } from '@/constants.js';
import Header from './Header';
import MainContent from './MainContent';

function ColorProvider({children}}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorVariables = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <body style={colorVariables}>
      {children}
    </div>
  );
}
```
```tsx
// Home.tsx
import Header from './Header';
import MainContent from './MainContent';
import ColorProvider from './ColorProvider';

function Home() {
  return (
    <ColorProvider>
      <Header />
      <MainContent />
    </ColorProvider>
  );
}
```
<br/>

<!-- ## 혼합사용 -->