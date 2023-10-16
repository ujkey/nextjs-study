// "use client"; for client-side only code
//root layout
import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'WEB tutorials',
  description: 'Generated by rjk',
}

// children : page.js 파일의 리턴값
export default async function RootLayout({ children }) {
  // const [topics, setTopics] = useState([]);

  // server -> client
  // useEffect(() => {
  //   fetch('http://localhost:9999/topics')
  //     .then(res => res.json())
  //     .then(result => {
  //       setTopics(result);
  //     })
  // }, []);

  const resp = await fetch('http://localhost:9999/topics/', {cache:'no-cache'}); //{cache:'no-cache'}를 추가하면 캐시를 사용하지 않음
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1>
          {/* <a href='/'>WEB</a> */}
          <Link href='/'>WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        <ul>
          <li><Link href='/create'>Create</Link></li>
          <li><Link href='/update'>Update</Link></li>
          <li><input type='button' value='Delete' /></li>
        </ul>
      </body>
    </html>
  )
}