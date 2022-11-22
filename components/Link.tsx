import { useRouter } from "next/router";
import React, { Children, ReactElement, useEffect, useState } from "react";
import Link, { LinkProps } from 'next/link'
import './Button.module.scss'

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName?: string;
}

const NextLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {

  const { asPath, isReady } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";
  const [className, setClassName] = useState(childClassName)
  /*
    https://nextjs.org/docs/api-reference/next/link
    Static route such as pages/index.js, pages/about.js will be matched via props.href
    Dynamic route such as pages/[slug].js will be matched via props.as
    !important: If the route has dynamic segments 
    -> It can become quite common and handy to use interpolation or an URL Object to generate the link.
  */

  /* Short way, but the document is recommending to use URL Object check
  const { asPath } = useRouter();
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;
*/

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      const linkPathName = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname

      // Using URL().pathname to get rid of query and hash
      const active = new URL(asPath, location.href).pathname

      const newClassName =
        linkPathName === active
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName;
      if (newClassName !== className) {
        setClassName(newClassName)
      }
    }

  }, [
    isReady,
    asPath,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className
  ])

  return (
    <Link {...props} legacyBehavior>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )

}

export default NextLink;