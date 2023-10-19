# 서버 컴포넌트와 클라이언트 컴포넌트

<br/><br/>

## 서버 컴포넌트(Server Component)
서버 컴포넌트를 사용하면 서버에서 렌더링하고 선택적으로 캐시할 수 있는 UI를 작성할 수 있다.
### 장점
#### 1. 빠른 데이터 엑세스
서버 컴포넌트는 데이터 원본(데이터베이스)과 가까운 위치에서 작동하기 때문에 렌더링에 필요한 데이터를 더 빠르게 가져올 수 있고, 클라이언트가 보내야하는 요청도 줄일 수 있다.
#### 2. 보안
민감한 데이터와 로직(ex. 토큰, API key..)를 클라이언트에 노출시키지 않고 서버에서 안전하게 처리할 수 있다.
#### 3. 캐싱
서버에서 렌더링하면 결과물을 캐싱하고 이를 후속 요청이나 사용자와의 상호작용에 재사용할 수 있다. 이로써 각 요청에서 수행되는 렌더링 데이터 가져오기 양을 줄여 성능을 향상시키고 비용을 절감할 수 있다.
#### 4. 성능 최적화(번들 크기)
서버 컴포넌트를 사용하면 클라이언트로 자바스크립트 코드를 전송하지 않기 때문에 번들 크기가 줄어든다. 이로인해 클라이언트가 서버 컴포넌트를 렌더링하는 데 필요한 자바스크립트의 양과 하이드레이션해야하는 컴포넌트의 수가 감소하므로 부하가 감소하고 성능을 향상시킬 수 있다.

> ***서버 컴포넌트를 사용하면 기능과 번들 크기의 트레이드오프를 고려할 필요 없다***<br/>
라이브러리의 기능을 원하지만 JS 번들 크기를 크게 하고 싶지 않을 때, 서버 컴포넌트를 사용하자. 라이브러리 코드가 번들에 포함되지 않기 때문에 번들 크기가 줄어들고, 필요한 모든 기능을 사용할 수 있다. 

#### 5. 초기 페이지 로드 및 FCP(First Contentful Paint)
서버에서는 사용자가 페이지를 즉시 볼 수 있도록 HTML을 생성할 수 있어 클라이언트가 페이지를 렌더링하기 위해 JavaScript를 다운로드, 구문 분석 및 실행하는 것을 기다릴 필요가 없다.
#### 6. 검색 엔진 최적화(SEO) 및 소셜 네트워크 공유
렌더링된 HTML을 검색 엔진 못이 페이지 색인화에 사용하고, 소셜 네트워크 봇이 페이지의 소셜 카드 미리보기를 생성하는 데 활용할 수 있다.
#### 7. 스트리밍
렌더링 작업을 조각으로 나누어 준비된대로 클라이언트로 스트리밍할 수 있어 사용자가 페이지의 일부를 기다릴 필요 없이 빨리 볼 수 있게 된다.

<br/>

### 서버 렌더링 전략
#### 1. 정적 렌더링(default)
사용자에 맞추지 않은 데이터를 가지고 있으며 빌드 시간에 알 수 있는 경우 유용하다. (정적 블로그 게시물이나 제품 페이지와 같은 데이터)
#### 2. 동적 렌더링
동적 렌더링을 사용하면 요청 시 각 사용자에 대한 경로가 렌더링된다.
동적 렌더링은 경로에 사용자에게 맞춤화된 데이터가 있거나 쿠키, URL의 검색 parameter와 같이 요청시에만 알 수 있는 정보가 있는 경우 유용하다.

#### 3. 스트리밍 렌더링
스트리밍을 사용하면 서버에서 UI를 점진적으로 렌더링할 수 있다. 작업은 여러 단위로 분할되어 준비가 되면 클라이언트로 스트리밍됩니다. 이를 통해 사용자는 전체 콘텐츠의 렌더링이 완료되기 전에 페이지의 일부를 즉시 볼 수 있다.

스트리밍은 기본적으로 Next.js 앱 라우터에 내장되어 있으며, 초기 페이지 로딩 성능 뿐만 아니라
전체 경로 렌더링을 차단하기때문에 느린 데이터 가져오기에 의존하는 UI를 개선하는 데 도움이 된다.(제품 페이지의 리뷰)

<br/>

### 사용해보기
다음은 서버에서 목록 데이터를 가져와서(fetch) 이를 UI에 반영하는 서버 컴포넌트이다.
```jsx
import Link from 'next/link';

export default async function RootLayout({ children }) {

  // 글 목록 가져오기
  // 서버에서 데이터를 가져와서 렌더링하는 경우(fetch) useEffect 대신 await를 사용한다
  const resp = await fetch('http://localhost:9999/topics/'); 
  const topics = await resp.json();

  // 출력 결과가 개발자 도구의 콘솔에서는 나타나지 않고, 터미널에서만 출력 된다
  console.log('page/layout.js/topics', topics);

  return (
    <html>
      <body>
        <h1><Link href="/">Title</Link></h1>
        <ol>
          {topics.map(topic=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
      </body>
    </html>
  )
}
```

<br/>

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

## 적절하게 사용하기
어떤 기준으로 서버/클라이언트 컴포넌트를 구분해야하는지 알아보자
<div style='width:100%'>
  <img src='./public/img/server_client.png' width='54%'/>
  <img src='./public/img/server_component.png' width='41%' />
</div>


|컴포넌트|적절한 상황|API|
|------|---|---|
|서버|- 사용자와 상호작용하지 않는 경우(단순 노출)<br/>- 백엔드에 엑세스하면서 보안적으로 위험한 정보를 주고 받는 경우|- secure data<br/>- cookie<br/>- header|
|클라이언트|- 서버 컴포넌트로 해결되지 않는 경우<br/>- 사용자와 상호작용하는 경우|- 상태변수나 이펙트 API (useEffect, useState, onClick, onChang)<br/>- client component API (useRouter, useParams)|



<br/>

## 혼합 사용
### server component에서 client component 사용하기
#### 1. server component에서 client component의 기능이 필요한 부분만 별도의 컴포넌트로 분리
```jsx
"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Control() {
  const params = useParams(); // only client component
  console.log(params);
  const id = params.id;

  return (
    <ul>
      <li><Link href='/create'>Create</Link></li>
      { id ? (
        <>
          <li><Link href={`/update/${id}`}>Update</Link></li>
          <li><input type='button' value='Delete' /></li>
        </>
      ): null }
    </ul>
  );
}
```

#### 2. server component에서 import 하여 사용
```jsx
// ...
import { Control } from './Control';

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        // ...
        <Control />
      </body>
    </html>
  )
}
```