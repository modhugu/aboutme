# Ansible Auto-Healing

Self-healing infrastructure scripts utilizing Ansible for automated remediation of common service failures.

## Features
- Monitoring service states (Nginx, MySQL).
- Automatic restart of failed services.
- Basic remediation tasks (e.g., fixing permissions).
- Logging of all recovery actions.

## Usage
1. Update the `inventory` file with your target servers.
2. Run the playbook:
   ```bash
   ansible-playbook -i inventory site.yml
   ```
