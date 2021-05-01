import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import * as styles from '../../styles/projects.module.css'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function Projects({ data }) {
  console.log(data)
  const projects = data.projects.nodes
  const contact = data.contact.siteMetadata.contact
  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & website I've created</h3>
        <div className={styles.projects}>
          {projects.map(project => (
            <Link to={'/projects/' + project.frontmatter.slug} key={project.id}>
              <div>
                <GatsbyImage
                  image={
                    project.frontmatter.thumb.childImageSharp.gatsbyImageData
                  }
                  alt="thumb image"
                ></GatsbyImage>
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Likewhat you see? email me at {contact} for a quote!</p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          stack
          slug
          title
          thumb {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`
