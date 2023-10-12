## layout.js와 page.js의 관계
`layout.js`의 `children` prop은 `page.js`의 리턴값이다.

![layout_page](./public/img/layout_page.png)

```jsx
//layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

<br/>

## 빌드와 배포
빌드는 애플리케이션을 최적화하고 실제 서버에서 호스팅하기 위한 효율적인 배포 버전을 생성하는 필수 단계이다.<br/>
(용량 최소화, 불필요한 메세지를 콘솔에 출력하지 않는 등)

### build
`.next` 폴더 하위에 배포 가능한 버전의 애플리케이션을 생성한다
```bash
npm run build
```

### start
생성된 배포 버전을 바탕으로 서비스를 시작한다
```bash
npm run start
```

<br/>

## metadata
`layout.js` 혹은 `page.js`에서 `metadata`를 `export`하면 html의 head안에 내용을 생성할 수 있다

```jsx
// app/layout.js
export const metadata = {
  title: 'WEB tutorial',
  description: 'Generated by egoing',
}
```
![metadata](./public//img/metadata.png)

<br/>

## Routing
사용자가 접속한 URL의 path에 따라서 콘텐츠를 응답해주는 작업을 `라우팅`이라고 한다.<br/>
Next.js는 간단하고 직관적인 라우팅을 제공하며, 프로젝트의 복잡성을 효과적으로 관리할 수 있도록 도와준다.

### 0. URL 용어 정리
`/dashboard/analytics/` 부분을 `path`, `dashboard`와 `analytics` 각각을 `segment`라고 한다

![url](./public/img/url.png)

<br/>

### 1. 페이지 만드는 방법
`create/pages.js` 파일을 생성하면 `/create` 페이지가 정상 출력된다
```jsx
// app/create/page.js
export default function Create(){
  return <>
    Create!!
  </>
}
```
#### 알 수 있는 것
- `app` 하위의 폴더는 세그먼트를 의미한다
- `app/create/page.js` 파일의 반환 값이 상위 컴포넌트의 `layout.js`의 `children` prop으로 전달된다.

<br/>

### 2. Next.js의 라우팅 로직
Next.js는 레이아웃의 중첩을 허용한다. 때문에 URL 경로의 세그먼트에 따라 콘텐츠를 찾고, 해당 콘텐츠가 위치한 폴더의 `layout.js`를 시작으로 상위 폴더를 탐색하면서 `layout.js`로 감싸준다.

#### 중첩된 하위 레이아웃 만들기
`app/create/page.js`를 감싸는 `app/create/layout.js` 하위 레이아웃 파일을 생성한다.<br/>
이처럼 하위 레이아웃이 있다면, `app/create/layout.js`로 `app/create/page.js`를 포장한 후에 `app/layout.js`로 포장한다.

```jsx
// props : app/create/page.js 리턴값
export default function Layout(props){
  return (
    <form>
      <h2>Create</h2>
      {props.children}
    </form>
  )
}
```

<br/>

### 3. 동적 라우팅(dynamic routing)
`read/1`, `read/2` 의 1,2와 같이 가변적으로 변경되는 경로를 처리해보자.

### 페이지 생성
`/app/read/[id]/page.js` 다음과 같이 파일을 생성하면 `/read/1` 페이지가 정상 출력된다

### 라우팅 로직
`/read/1`로 접속하면 1의 자리에 해당하는 폴더인 [id]의 이름을 기준으로 `props`를 만들어서 주입해준다. 이 값을 사용해서 여러 작업을 처리할 수 있다.
```jsx
export default function Read(props){
  return <>
    <h2>Read</h2>
    parameter : {props.params.id}
  </>
}
```
![routing](./public/img/routing.png)

<br/>

## SPA(Single Page Application)
하나의 페이지에서 모든 작업을 처리하는 앱을 의미한다<br/> 
서버로부터 가져올 데이터가 있다면 ajax와 같은 방법을 통해서 동적으로 로딩한다

### Link
```jsx
<Link href='/'>Home</Link>
```
`Link`는 Next.js에서 SPA를 매우 쉽게 구현하도록 도와주는 도구이다

- 링크를 클릭하면 페이지 전체 리로딩이 일어나지 않고 필요한 콘텐츠만 리로딩
- 이미 방문한 페이지는 캐슁을 해서 다시 다운로드 받지 않음
- 미리 페이지를 다운로드 받고, 실제 요청이 있을 때 클라이언트 측에서 즉시 응답함(클릭 전)