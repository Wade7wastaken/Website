import type { FC, AnchorHTMLAttributes } from "react";

export const RefreshLink: FC<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string }
> = ({ href, children, ...rest }) => {
  // if the passed href was an absolute path, then don't add the base path.
  // maybe even extract the link to its own component?
  if (!href.startsWith("/"))
    return (
      <a {...rest} href={href}>
        {children}
      </a>
    );

  const env = process.env.BASE_PATH;
  const basePath = env ? `/${env}` : "";

  const fullHref = `${basePath}${href}`;
  return (
    <a {...rest} href={fullHref}>
      {children}
    </a>
  );
};
