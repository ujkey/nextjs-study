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