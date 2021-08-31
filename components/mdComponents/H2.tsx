export default function H2(props: HTMLElement) {
  return (
    <h2 className="text-3xl font-bold mb-6 mt-12" id={String(props.children)} >{props.children}</h2>
  )
}