# Graph Report - kec-frontend  (2026-05-25)

## Corpus Check
- 77 files · ~437,196 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 371 nodes · 538 edges · 33 communities (21 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4b489d04`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `contentService` - 15 edges
2. `leadershipService` - 11 edges
3. `departmentService` - 9 edges
4. `examService` - 8 edges
5. `Backend Architecture Plan & Admin Panel: Krishna Engineering College (KEC)` - 8 edges
6. `applicationService` - 7 edges
7. `Admin & Management Feature Proposals (KEC)` - 7 edges
8. `authService` - 6 edges
9. `4. Admin Panel Features & Controls (React Interface mapping to Go API)` - 6 edges
10. `Comprehensive Technical Audit & Performance Report` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (33 total, 12 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (49): About, AdminLayout, AdminLogin, AdminManager, AdmissionKEC, AdmissionManager, AdvancedCodingRegistration, AffiliationAccreditation (+41 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (18): AdminLayout(), getAdminUser(), Dashboard(), StatCard(), GalleryAdminLayout(), getAdminUser(), adminAccountService, api (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (15): alumniService, CampusLife(), CollegeDashboard(), CollegeAchievements(), AlumniSuccessStories(), fadeImgVariants, HeroSection(), slides (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.1
Nodes (12): Footer(), icons, Loader(), affiliations, Navbar(), PageLoader(), ScrollToTop(), Topbar() (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (12): admissionService, placementService, columns, companiesData, CompaniesVisitedTable(), customStyles, CustomTableHeader(), SEO() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (19): 📊 **1. Command Dashboard Overview**, 1. Technology Stack, 📋 **2. Application Management Hub**, 2. Project Directory Structure (Standard Go Layout), 📢 **3. Content & News Management (CMS)**, 3. Core Database Schema (Models), 4. Admin Panel Features & Controls (React Interface mapping to Go API), 🏢 **4. Department / Dynamic Site Configuration** (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (7): contentService, bodyFont, colors, headingFont, NoticeBoard, EventComponent(), Notice()

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (8): leadershipService, LeadershipProfiles(), Governance(), governanceMembers, staticGovernanceMembers, Hod(), LeadershipManager(), PrincipalMessage()

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (13): 1.1 Technology Stack, 1.2 Database Core Schema, 1.3 Key API Endpoints, 2.1 Lead & Admission Management (CRM), 2.2 Dynamic Content Management System (CMS), 2.3 Maker-Checker Automation & Security (RBAC), 3.1 Performance & Payload Optimization, 3.2 Eradicating Critical Rendering Bugs (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (5): departmentService, EngineeringDepartments(), DepartmentDetails(), DepartmentManager(), DepartmentsPage()

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (11): 🔴 1. Critical React State Violation (App Crash Risk), 1. Executive Summary, 🔴 2. Missing Form Fields (Data Collection Failure), 2. Performance Summary & Metrics, 3. Critical Bugs & Structural Failures Detected, 🟠 3. Invalid HTML Wrapping (Accessibility Break), 🟠 4. Hash Jumps Destroying Smooth Scroll, 4. Proposed Fix Timeline (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (5): courseService, CourseManager(), iconOptions, Courses(), iconMap

### Community 12 - "Community 12"
Cohesion: 0.36
Nodes (4): researchService, iconMap, Research(), ResearchManager()

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (6): 💼 1. Built-in CRM (Lead & Admission Management), 🛡️ 2. Maker-Checker System (Approval Workflows), 📂 3. Document Verification Portal, 💸 4. Payment Tracking & Fee Collection, 🎨 5. Homepage & UI Control Engine, Admin & Management Feature Proposals (KEC)

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (3): facultyService, FacultyPage(), FacultyManager()

### Community 15 - "Community 15"
Cohesion: 0.38
Nodes (3): facilityService, EnhancedFacilities(), FacilityManager()

## Knowledge Gaps
- **48 isolated node(s):** `api`, `token`, `uploadService`, `iconMap`, `1.1 Technology Stack` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `contentService` connect `Community 6` to `Community 1`, `Community 9`, `Community 7`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `leadershipService` connect `Community 7` to `Community 1`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `departmentService` connect `Community 9` to `Community 1`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `api`, `token`, `uploadService` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._