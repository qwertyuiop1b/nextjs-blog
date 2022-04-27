export default function HelloWorld() {
  return <h2>hello world</h2>
}

export async function getServerSideProps(context) {
  return {
    props: {
      todos: ["learn js", "learn typescript", "learn react", "learn vue", "learn angular"]
    }
  }
}