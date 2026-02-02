type ContainerProps = {
    children: any
}

export function Container(props: ContainerProps) {
    return <div className="container-fluid">
        {props.children}
    </div>
}