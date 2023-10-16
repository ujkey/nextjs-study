"use client" 
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        /* 
            사용자와 상호작용하는 코드는 서버 쪽에서 실행할 수 없기 때문에,
            클라이언트 쪽으로 전송되어서 실행되야 함
        */
        <form onSubmit={(e) => {
            e.preventDefault(); //페이지 리로드 방지
            const title = e.target.title.value; //target == from
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            }

            fetch('http://localhost:9999/topics', options)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    const lastId = result.id;
                    router.refresh();
                    router.push(`/read/${lastId}`); //redirection
                });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    );
}