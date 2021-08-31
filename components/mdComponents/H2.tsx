export default function H2(props: HTMLElement) {
  return (
    <h2 className="text-3xl font-bold my-6 pt-6" id={String(props.children)} >{props.children}</h2>
  )
}