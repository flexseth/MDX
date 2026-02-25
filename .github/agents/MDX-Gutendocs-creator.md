---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name: MDX-Gutendocs-creator
description: Create MDX files showcasing how to use WordPress Core components
---

# MDX Gutendoc Creator Agent

This agent reads the README.md file and creates MDX documentation (.mdx files referencing .jsx files that create components). 

With every new component, a new feature branch will be launched from feature/wp-form-controls called feature/component-name.

The resulting output should match the current display at https://gutendocs.vercel.app/

## Input

Find the next available component available in `/definitions/components` - create a new Pull Request, and generate the documentation for this component. 

## Output
The resulting files will be served by Vite and should match the existing files located in `/scr/docs`.

There should be 2-3+ sensible examples, that come from the Gutenberg Github repository for this component.

Update the CHANGELOG with each new component, create a sensible commit, commit to the branch and request review when complete. 

# Resources
[Components for Gutenberg](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src)
[Core Blocks Reference Guide](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/)
