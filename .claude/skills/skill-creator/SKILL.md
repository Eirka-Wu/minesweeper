---
name: skill-creator
description: Helps users create new agent skills. Provides guidance on skill structure, frontmatter format, and best practices. Use this skill when the user asks about creating, defining, or structuring a skill.
---

# Skill Creator

This skill helps you create and define new agent skills following the skills ecosystem standards.

## When to Use This Skill

Use this skill when the user:

- Wants to create a new skill for Claude Code or other agents
- Asks "how do I create a skill", "how do I define a skill", or similar questions
- Needs help structuring a `SKILL.md` file
- Wants to understand skill frontmatter format
- Is building a collection of skills for their team

## Skill File Structure

Every skill is defined in a `SKILL.md` file with the following structure:

```markdown
---
name: skill-name
description: A brief description (one line, ~50-80 chars)
---

# Skill Name

A more detailed description of what this skill does.

## When to Use This Skill

Describe the specific scenarios or triggers where this skill should be activated.

## Instructions

Step-by-step instructions for the agent to follow.
```

## Frontmatter Format

The YAML frontmatter is **required** and must contain:

- `name`: The skill identifier (kebab-case, no spaces)
- `description`: What the skill does (one line, shown in menus)

Example:

```yaml
---
name: react-component
description: Creates React components with TypeScript and Tailwind
---
```

## Skill Placement

Skills can be installed in two locations:

| Scope | Location | Use Case |
|-------|----------|----------|
| **Project** | `./.claude/skills/<name>/` | Committed to git, shared with team |
| **Global** | `~/.claude/skills/<name>/` | Available across all projects |

## Best Practices

### Naming

- Use **kebab-case**: `my-skill` not `MySkill` or `my_skill`
- Keep names short: 2-4 words max
- Make it descriptive: `react-testing` not `test`

### Description

- One line only
- ~50-80 characters
- Explain **what** it does, not why
- Start with action verb: "Creates...", "Reviews...", "Configures..."

Examples:

```
✅ Good: "Creates React components with TypeScript"
❌ Bad: "This skill helps users create React components because..."
❌ Bad: "React components"
```

### Instructions

- Write to an AI agent, not a human
- Be specific and actionable
- Use numbered lists for steps
- Include examples where helpful
- Don't duplicate general capabilities

### When to Use Section

Helps agents decide when to trigger the skill. Include:

- Specific phrases users might say
- Code patterns or file types
- Domains or technologies
- Triggers or events

Example:

```
Use this skill when the user:
- Asks "create a React component"
- Says "add a new page to my app"
- Files with `.tsx` extension are being edited
```

## Creating a New Skill

Use the skills CLI to generate a template:

```bash
# Create in current directory
npx skills init my-skill

# Create in a subdirectory
npx skills init skills/my-skill
```

This generates:

```
my-skill/
  SKILL.md
```

Edit `SKILL.md` to define your skill instructions.

## Publishing Your Skill

### Option 1: GitHub Repository

1. Create a GitHub repository with your skill
2. Put `SKILL.md` in the repo root or a subdirectory
3. Users install with:

```bash
# From repo root
npx skills add owner/repo

# From specific path
npx skills add https://github.com/owner/repo/tree/main/skills/my-skill
```

### Option 2: Direct URL

Host `SKILL.md` anywhere accessible:

```bash
npx skills add https://example.com/my-skill/SKILL.md
```

## Installing Skills

```bash
# Install from GitHub
npx skills add owner/repo

# Install specific skill from repo
npx skills add owner/repo --skill my-skill

# Install globally (available in all projects)
npx skills add owner/repo -g

# Install to specific agents
npx skills add owner/repo -a claude-code
```

## Common Patterns

### Tool-Focused Skills

Skills that teach agents to use specific tools:

```yaml
---
name: docker-compose
description: Creates and manages docker-compose.yml files
---

Use this when working with Docker Compose configurations.
```

### Workflow Skills

Multi-step processes:

```yaml
---
name: pr-workflow
description: Handles the pull request workflow from branch to merge
---

Follow this workflow for creating and merging PRs.
```

### Domain-Specific Skills

Specialized knowledge areas:

```yaml
---
name: sql-optimization
description: Optimizes SQL queries for performance
---

Apply to SELECT statements and query planning.
```

## Resources

- [Skills CLI](https://github.com/vercel-labs/skills)
- [Browse Skills](https://skills.sh/)
- [Agent Skills Ecosystem](https://github.com/vercel-labs/agent-skills)