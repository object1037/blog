export default function H2(props: {children: string}) {
  return (
    <h2 className="text-3xl font-semibold mb-6 mt-8 py-2 border-b border-gray-400" id={props.children} >{props.children}</h2>
  )
}