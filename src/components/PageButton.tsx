import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { MouseEventHandler, ReactElement } from 'react'


type ButtonProps = {
    /**
     * Texto exibido no botão
     * Exemplo: "Incluir", "Novo", "Adicionar"
     */
    text?: string
    element?: ReactElement
    /**
     * Tipo do botão do Ant Design
     * Valores aceitos:
     * - "primary"
     * - "default"
     * - "dashed"
     * - "link"
     * - "text"
     */
    type?: "link" | "text" | "default" | "primary" | "dashed"

    /**
     * Ícone do Font Awesome
     * Valores comuns:
     * - "plus"
     * - "plus-circle"
     * - "user-plus"
     * - "file-circle-plus"
     */
    icon: IconProp
    className?: string
    style?: Object
    onClick: MouseEventHandler<HTMLButtonElement>
    danger?: boolean
    block?: boolean

}

export function PageButton(props: ButtonProps) {
    return (
        <Button
            danger={!!props.danger}
            block={!!props.block}
            onClick={props.onClick}
            style={props.style || {}}
            className={props.className}
            type={props.type || "default"}
            icon={<FontAwesomeIcon icon={props.icon} />}
            iconPlacement="end"
        >
            {props.element}
            {props.text}
        </Button>
    )
}
