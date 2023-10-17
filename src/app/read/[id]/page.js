export default async function Read(props) {
    // server component
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`, {cache:'no-cache'}); //off use cache
    const topic = await resp.json();

    return (
        <>
            <h2>{topic.title}</h2>
            {topic.body}
        </>
    );
}