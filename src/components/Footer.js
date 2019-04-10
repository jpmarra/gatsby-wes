import React from 'react'
import { graphql, useStaticQuery } from 'gatsby';

export default function Footer() {
    const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);
  return (
    <div>
      <p>&copy; {data.site.siteMetadata.author} {new Date().getFullYear()}</p>
    </div>
  )
}
