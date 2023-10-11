## layout.js와 page.js의 관계
`layout.js`의 `children` prop은 `page.js`의 리턴값이다.

![Alt text](./public/img/layout_page.png)

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