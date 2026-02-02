type GridProps = {
    /**
     * Tamanhos das colunas no formato:
     * "sm md lg xl"
     *
     * Exemplo:
     * "12 12 6 6"
     * "12 12 2 2"
     *
     * Ordem:
     * small (col-*)
     * medium (col-sm-*)
     * large (col-md-*)
     * extra large (col-lg-*)
     */
    cols: string

    /**
     * Conteúdo interno do grid
     */
    children: any
    style?: Object
    className?: string
}

export function Grid({ cols, children, style = {}, className = "" }: GridProps) {


    const [sm, md, lg, xl] = cols.split(' ')

    const classes = `
    col-${sm}
    col-sm-${md}
    col-md-${lg}
    col-lg-${xl}
  `.replace(/\s+/g, ' ').trim()

    return <div className={classes + ` ${className}`} style={style}>{children}</div>
}


