import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import classNames from "classnames"
import Link from "next/link"
import "@/app/common/styles/components/button-base.css"

const sizeClasses = {
  small: "btn--small",
  medium: "btn--medium",
  large: "btn--large",
  icon: "btn--icon",
} as const

function ButtonContent({
  children,
  icon,
  iconClassName,
  size,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
  iconClassName?: string
  size: "small" | "medium" | "large" | "icon"
}) {
  return (
    <div className="btn__wrapper">
      <div className="btn__content btn__content--normalize">{children}</div>
      {icon && (
        <div
          className={classNames(
            "btn__content--normalize shrink-0",
            {
              "w-6 h-6": size === "large",
              "w-5 h-5": size === "medium",
              "w-4 h-4": size === "small",
            },
            iconClassName
          )}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export const ButtonBase = ({
  children,
  className,
  icon,
  iconClassName,
  size = "large",
  href,
  external,
  ...props
}: ButtonBaseProps) => {
  const btnClassName = classNames("btn select-none", sizeClasses[size], className)

  const content = (
    <ButtonContent
      icon={icon}
      iconClassName={iconClassName}
      size={size}
    >
      {children}
    </ButtonContent>
  )

  if (href) {
    return (
      <div className="flex pl-6 pr-4 pt-0 pb-2 w-fit">
        <Link
          href={href}
          className={btnClassName}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex pl-6 pr-4 pt-0 pb-2 w-fit">
      <button
        className={btnClassName}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    </div>
  )
}

type ButtonBaseCommon = {
  children: React.ReactNode
  size?: "small" | "medium" | "large" | "icon"
  icon?: React.ReactNode
  iconClassName?: string
  className?: string
  href?: string
  external?: boolean
}

type ButtonBaseAsButton = ButtonBaseCommon &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseCommon>

type ButtonBaseAsLink = Omit<ButtonBaseCommon, "href" | "external"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | keyof ButtonBaseCommon> & {
    href: string
    external?: boolean
  }

type ButtonBaseProps = ButtonBaseAsButton | ButtonBaseAsLink
