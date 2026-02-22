import type { ButtonHTMLAttributes } from "react"
import classNames from "classnames"
import "@/app/common/styles/components/button-base.css"

export const ButtonBase = ({
  children,
  className,
  icon,
  iconClassName,
  size = "large",
  ...props
}: ButtonBaseProps) => {
  const sizeClasses = {
    small: "btn--small",
    medium: "btn--medium",
    large: "btn--large",
    icon: "btn--icon",
  }

  return (
    <div className="flex pl-6 pr-4 pt-0 pb-2 w-fit">
      <button
        className={classNames("btn select-none", sizeClasses[size], className)}
        {...props}
      >
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
      </button>
    </div>
  )
}

type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  size?: "small" | "medium" | "large" | "icon"
  icon?: React.ReactNode
  iconClassName?: string
}
