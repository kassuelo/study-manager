type RowProps = {
  children: any
  style?: Object
  className?: string
}

export function Row(props: RowProps) {
  return (
    <div className={"row " + (props.className || '')} style={props.style || {}}>
      {props.children}
    </div>
  )
}
