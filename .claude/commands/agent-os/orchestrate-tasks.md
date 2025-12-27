# Process for Orchestrating a Spec's Implementation

Now that we have a spec and tasks list ready for implementation, we will proceed with orchestrating implementation of each task group by a dedicated agent using the following MULTI-PHASE process.

Follow each of these phases and their individual workflows IN SEQUENCE:

## Multi-Phase Process

### FIRST: Get tasks.md for this spec

IF you already know which spec we're working on and IF that spec folder has a `tasks.md` file, then use that and skip to the NEXT phase.

IF you don't already know which spec we're working on and IF that spec folder doesn't yet have a `tasks.md` THEN output the following request to the user:

```
Please point me to a spec's `tasks.md` that you want to orchestrate implementation for.

If you don't have one yet, then run any of these commands first:
/shape-spec
/write-spec
/create-tasks
```

### NEXT: Create orchestration.yml to serve as a roadmap for orchestration of task groups

In this spec's folder, create this file: `agent-os/specs/[this-spec]/orchestration.yml`.

Populate this file with with the names of each task group found in this spec's `tasks.md` and use this EXACT structure for the content of `orchestration.yml`:

```yaml
task_groups:
  - name: [task-group-name]
  - name: [task-group-name]
  - name: [task-group-name]
  # Repeat for each task group found in tasks.md
```

### NEXT: Auto-assign subagents to each task group

Analyze each task group and automatically determine the most appropriate subagent based on:
- Task group name and description
- Required technical skills (frontend, backend, database, etc.)
- Available subagents and their specializations

Read the available subagents from `.claude/agents/` directory or configuration, then update `orchestration.yml` with your assignments:

```yaml
task_groups:
  - name: [task-group-name]
    claude_code_subagent: [auto-selected-subagent]
    assignment_reason: [brief reason for this assignment]
  - name: [task-group-name]
    claude_code_subagent: [auto-selected-subagent]
    assignment_reason: [brief reason for this assignment]
```

Assignment Rules:
1. Match task keywords to subagent specializations (e.g., "api", "database" → backend-specialist)
2. UI/UX related tasks → frontend-specialist
3. Infrastructure/deployment tasks → devops-specialist
4. If unclear, assign to the most general-purpose subagent available

After updating `orchestration.yml`, briefly inform the user of your assignments before proceeding.


### NEXT: Delegate task groups implementations to assigned subagents

Loop through each task group in `agent-os/specs/[this-spec]/tasks.md` and delegate its implementation to the assigned subagent specified in `orchestration.yml`.

For each delegation, provide the subagent with:
- The task group (including the parent task and all sub-tasks)
- The spec file: `agent-os/specs/[this-spec]/spec.md`
- Instruct subagent to:
  - Perform their implementation
  - Check off the task and sub-task(s) in `agent-os/specs/[this-spec]/tasks.md`
