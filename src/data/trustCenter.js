
export const TRUST_CENTER_UPDATED = 'May 22, 2026';

export const NDA_DOCUMENTS = [
  {
    group: 'attestations',
    title: 'Penetration Test Report',
    description: 'DMND Pentest Report Q3 2025 (available under NDA)',
  },
  {
    group: 'other',
    title: 'Engagement Letter',
    description: 'Auditor engagement letter (available under NDA)',
  },
  {
    group: 'other',
    title: 'DMND-2025-Type 2 SOC 2-Final Report',
    description: 'SOC 2 Type 2 final audit report (available under NDA)',
  },
];

export const DATA_COLLECTED = [
  ['Customer personally identifiable information', true],
  ['Employee personally identifiable information', true],
  ['Credit card information', false],
  ['Personal health information', false],
];

export const POLICY_OWNER = 'Alejandro De La Torre';

export const TRUST_CENTER_EMAIL = 'Info@DMND.work';

export const POLICIES = [
  { title: "Access Control Policy", purpose: "To limit access to information and information processing systems, networks, and facilities to authorized parties in accordance with business objectives.", path: "/trust-center/policies/access-control-policy.pdf" },
  { title: "Human Resource Security Policy", purpose: "To ensure that personnel and contractors meet security requirements, understand their responsibilities, and are suitable for their roles.", path: "/trust-center/policies/human-resource-security-policy.pdf" },
  { title: "Code of Conduct Policy", purpose: "Develops and maintains a standard of conduct that is acceptable to the company and its employees, customers, and vendors.", path: "/trust-center/policies/code-of-conduct-policy.pdf" },
  { title: "Third Party Management Policy", purpose: "To ensure protection of the organization's data and assets that are shared with, accessible to, or managed by suppliers, including external parties or third-party organizations such as service providers, vendors, and customers, and to maintain an agreed level of information security and service delivery in line with supplier agreements.", path: "/trust-center/policies/third-party-management-policy.pdf" },
  { title: "Risk Management Policy", purpose: "To define the methodology for assessing and managing the company's information security risks in order to achieve the company's business and information security objectives.", path: "/trust-center/policies/risk-management-policy.pdf" },
  { title: "Asset Management Policy", purpose: "To identify organizational assets and define appropriate protection responsibilities. To ensure that information receives an appropriate level of protection in accordance with its importance to the organization. To prevent unauthorized disclosure, modification, removal, or destruction of information stored on media.", path: "/trust-center/policies/asset-management-policy.pdf" },
  { title: "Data Management Policy", purpose: "To ensure that information is classified, protected, retained and securely disposed of in accordance with its importance to the organization.", path: "/trust-center/policies/data-management-policy.pdf" },
  { title: "Cryptography Policy", purpose: "To ensure proper and effective use of cryptography to protect the confidentiality, authenticity and/or integrity of information. This policy establishes requirements for the use and protection of cryptographic keys throughout their entire lifecycle.", path: "/trust-center/policies/cryptography-policy.pdf" },
  { title: "Secure Development Policy", purpose: "To ensure that information security is designed and implemented within the development lifecycle for applications and information systems.", path: "/trust-center/policies/secure-development-policy.pdf" },
  { title: "Business Continuity and Disaster Recovery Plan", purpose: "The purpose of this business continuity plan is to prepare the company in the event of extended service outages caused by factors beyond our control (e.g., natural disasters, man-made events), and to restore services to the widest extent possible in a minimum time frame.", path: "/trust-center/policies/bcdr-plan.pdf" },
  { title: "Operations Security Policy", purpose: "To ensure the correct and secure operation of information processing systems and facilities.", path: "/trust-center/policies/operations-security-policy.pdf" },
  { title: "Physical Security Policy", purpose: "To prevent unauthorized physical access or damage to the organization's information and information processing facilities.", path: "/trust-center/policies/physical-security-policy.pdf" },
  { title: "Information Security Roles and Responsibilities", purpose: "This policy and associated guidance establish the roles and responsibilities within the company, which is critical for effective communication of information security policies and standards.", path: "/trust-center/policies/infosec-roles-responsibilities.pdf" },
  { title: "Information Security Policy (AUP)", purpose: "The purpose of this policy is to communicate our information security policies and outline the acceptable use and protection of the company's information and assets.", path: "/trust-center/policies/infosec-policy-aup.pdf" },
  { title: "Incident Response Plan", purpose: "This document establishes the plan for managing information security incidents and events, and offers guidance for employees or incident responders who believe they have discovered, or are responding to, a security incident.", path: "/trust-center/policies/incident-response-plan.pdf" },
];

export const CONTROLS = {
  "Infrastructure security": [
    ["Database replication utilized", "The company's databases are replicated to a secondary data center in real-time. Alerts are configured to notify administrators if replication fails."],
    ["Production data backups conducted", "The company performs periodic backups for production data. Data is backed up to a different location than the production system."],
    ["Encryption key access restricted", "The company restricts privileged access to encryption keys to authorized users with a business need."],
    ["Unique account authentication enforced", "The company requires authentication to systems and applications to use unique username and password or authorized Secure Socket Shell (SSH) keys."],
    ["Production data segmented", "The company prohibits confidential or sensitive customer data, by policy, from being used or stored in non-production systems/environments."],
    ["Production application access restricted", "System access restricted to authorized access only."],
    ["Production OS access restricted", "The company restricts privileged access to the operating system to authorized users with a business need."],
    ["Production network access restricted", "The company restricts privileged access to the production network to authorized users with a business need."],
    ["Unique network system authentication enforced", "The company requires authentication to the production network to use unique usernames and passwords or authorized SSH keys."],
    ["Network firewalls reviewed", "The company reviews its firewall rulesets at least annually. Required changes are tracked to completion."],
    ["Network and system hardening standards maintained", "The company's network and system hardening standards are documented, based on industry best practices, and reviewed at least annually."],
    ["Log management utilized", "The company utilizes a log management tool to identify events that may have a potential impact on the company's ability to achieve its security objectives."],
    ["Remote access MFA enforced", "The company's production systems can only be remotely accessed by authorized employees possessing a valid multi-factor authentication (MFA) method."],
    ["Remote access encrypted enforced", "The company's production systems can only be remotely accessed by authorized employees via an approved encrypted connection."],
    ["Network segmentation implemented", "The company's network is segmented to prevent unauthorized access to customer data."],
    ["Network firewalls utilized", "The company uses firewalls and configures them to prevent unauthorized access."],
    ["Access revoked upon termination", "The company completes termination checklists to ensure that access is revoked for terminated employees within SLAs."],
    ["Production database access restricted", "The company restricts privileged access to databases to authorized users with a business need."],
  ],
  "Organizational security": [
    ["Environmental monitoring devices implemented", "The company has environmental monitoring devices in place and configured to automatically generate an alert to management for environmental incidents."],
    ["Performance evaluations conducted", "The company managers are required to complete performance evaluations for direct reports at least annually."],
    ["Password policy enforced", "The company requires passwords for in-scope system components to be configured according to the company's policy."],
    ["Portable media encrypted", "The company encrypts portable and removable media devices when used."],
    ["MDM system utilized", "The company has a mobile device management (MDM) system in place to centrally manage mobile devices supporting the service."],
  ],
  "Product security": [
    ["Control self-assessments conducted", "The company performs control self-assessments at least annually to gain assurance that controls are in place and operating effectively. Corrective actions are taken based on relevant findings. If the company has committed to an SLA for a finding, the corrective action is completed within that SLA."],
    ["Penetration testing performed", "The company's penetration testing is performed at least annually. A remediation plan is developed and changes are implemented to remediate vulnerabilities in accordance with SLAs."],
    ["Data encryption utilized", "The company's datastores housing sensitive customer data are encrypted at rest."],
    ["Data transmission encrypted", "The company uses secure data transmission protocols to encrypt confidential and sensitive data when transmitted over public networks."],
  ],
  "Internal security procedures": [
    ["Cybersecurity insurance maintained", "The company maintains cybersecurity insurance to mitigate the financial impact of business disruptions."],
    ["Production multi-availability zones established", "The company has a multi-location strategy for production environments employed to permit the resumption of operations at other company data centers in the event of loss of a facility."],
    ["Board charter documented", "The company's board of directors has a documented charter that outlines its oversight responsibilities for internal control."],
    ["Board expertise developed", "The company's board members have sufficient expertise to oversee management's ability to design, implement and operate information security controls. The board engages third-party information security experts and consultants as needed."],
    ["Board meetings conducted", "The company's board of directors meets at least annually and maintains formal meeting minutes. The board includes directors that are independent of the company."],
    ["System changes externally communicated", "The company notifies customers of critical system changes that may affect their processing."],
    ["Organization structure documented", "The company maintains an organizational chart that describes the organizational structure and reporting lines."],
    ["Roles and responsibilities specified", "Roles and responsibilities for the design, development, implementation, operation, maintenance, and monitoring of information security controls are formally assigned in job descriptions and/or the Roles and Responsibilities policy."],
    ["Support system available", "The company has an external-facing support system in place that allows users to report system information on failures, incidents, concerns, and other complaints to appropriate personnel."],
    ["System changes communicated", "The company communicates system changes to authorized internal users."],
    ["External support resources available", "The company provides guidelines and technical support resources relating to system operations to customers."],
    ["Service description communicated", "The company provides a description of its products and services to internal and external users."],
    ["Risk assessments performed", "The company's risk assessments are performed at least annually. As part of this process, threats and changes (environmental, regulatory, and technological) to service commitments are identified and the risks are formally assessed. The risk assessment includes a consideration of the potential for fraud and how fraud may impact the achievement of objectives."],
    ["SOC 2 - System Description", "Complete a description of the system for Section III of the audit report."],
    ["Configuration management system established", "The company has a configuration management procedure in place to ensure that system configurations are deployed consistently throughout the environment."],
    ["Board oversight briefings conducted", "The company's board of directors or a relevant subcommittee is briefed by senior management at least annually on the state of the company's cybersecurity and privacy risk. The board provides feedback and direction to management as needed."],
    ["Company commitments externally communicated", "The company's security commitments are communicated to customers in Master Service Agreements (MSA) or Terms of Service (TOS)."],
    ["Risk assessment objectives specified", "The company specifies its objectives to enable the identification and assessment of risk related to the objectives."],
    ["Third-party agreements established", "The company has written agreements in place with vendors and related third-parties. These agreements include confidentiality and privacy commitments applicable to that entity."],
    ["Access requests required", "The company ensures that user access to in-scope system components is based on job role and function or requires a documented access request form and manager approval prior to access being provisioned."],
  ],
  "Data and privacy": [
    ["Customer data deleted upon leaving", "The company purges or removes customer data containing confidential information from the application environment, in accordance with best practices, when customers leave the service."],
  ],
};

export const SUBPROCESSORS = [
  { name: "Cloudflare", category: "Hosting / Security", country: "US", description: "Web hosting, content delivery and network security.", url: "https://www.cloudflare.com" },
  { name: "Amazon Web Services", category: "Cloud provider", country: "US", description: "Leading global provider of cloud infrastructure services.", url: "https://aws.amazon.com" },
  { name: "Docker", category: "Engineering / IT", country: "US", description: "Containerization technology for application development.", url: "https://www.docker.com/" },
  { name: "EasyDNS", category: "IT / Security", country: "CA", description: "Provides DNS management and domain registration.", url: "https://easydns.com/" },
  { name: "Elastic Email", category: "Marketing / IT", country: "EU", description: "Email delivery and marketing automation platform.", url: "https://elasticemail.com" },
  { name: "GitHub", category: "Version control", country: "US", description: "Cloud platform for hosting Git repositories.", url: "https://github.com/" },
  { name: "Google Workspace", category: "Collaboration / Office Operations / Identity Provider", country: "US", description: "Suite of cloud-based productivity tools.", url: "https://admin.google.com" },
  { name: "Pipedrive", category: "Sales / Customer Support", country: "US", description: "Cloud-based sales CRM and pipeline software.", url: "https://www.pipedrive.com" },
  { name: "Quickbooks", category: "Finance and payments", country: "US", description: "Accounting software for small businesses.", url: "https://quickbooks.intuit.com" },
];
