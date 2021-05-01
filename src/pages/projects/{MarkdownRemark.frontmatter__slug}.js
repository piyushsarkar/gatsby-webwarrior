import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Layout from '../../components/Layout'
import * as styles from '../../styles/project-details.module.css'

export default function ProjectDetails({ data }) {
  const { html } = data.markdownRemark
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div className={styles.featured}>
          <GatsbyImage
            image={featuredImg.childImageSharp.gatsbyImageData}
            alt="featured image"
          />
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetails($frontmatter__slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $frontmatter__slug } }) {
      html
      frontmatter {
        stack
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`
