# 90toZero - Notice Period Buyout Platform
## Project Specification Document

---

## 1. Executive Summary

**90toZero** is a tri-party platform that connects:
- **Companies** seeking immediate talent acquisition
- **Candidates** with 60-90 day notice periods who need buyout financing
- **NBFC Partners** providing low-cost loans for notice period buyouts

### Value Proposition
- **For Companies**: Hire skilled candidates immediately without waiting for notice periods
- **For Candidates**: Access affordable loans to buy out notice periods and join new opportunities faster
- **For NBFCs**: New revenue stream through targeted, low-risk employment loans

---

## 2. Core Features

### 2.1 Company Features
1. **Job Posting & Candidate Search**
   - Post job openings with role details, salary range, and urgency level
   - Search candidates by skills, experience, location, notice period
   - View candidate profiles with buyout eligibility status
   - Filter candidates willing to accept buyout assistance

2. **Buyout Sponsorship**
   - Offer buyout assistance to selected candidates
   - Choose sponsorship models:
     - Full sponsorship (company pays entire buyout amount)
     - Partial sponsorship (company + loan split)
     - Loan facilitation only (company facilitates, candidate pays)
   - Set buyout amount caps and conditions
   - Track sponsorship commitments and costs

3. **Hiring Dashboard**
   - View application pipeline with buyout status
   - Monitor loan approval stages
   - Track candidate onboarding timelines
   - Analytics on hiring speed improvement and cost savings

4. **Contract Management**
   - Generate and sign buyout agreements
   - Set bond/service agreement terms (e.g., 1-year minimum tenure)
   - Automated contract workflows with e-signatures

### 2.2 Candidate Features
1. **Profile Creation & Management**
   - Create comprehensive profile (skills, experience, current CTC, notice period)
   - Upload documents (offer letter, salary slips, ID proof, bank statements)
   - Set job preferences and expected salary
   - Mark availability for immediate joining with buyout

2. **Buyout Calculator**
   - Calculate exact buyout amount based on:
     - Current salary
     - Notice period remaining
     - Company buyout policy
   - View loan EMI estimates with different tenures
   - Compare sponsorship options

3. **Job Discovery & Application**
   - Browse jobs offering buyout assistance
   - Apply with one-click for buyout-supported positions
   - Track application status in real-time
   - Receive notifications for interview schedules

4. **Loan Application & Management**
   - Apply for notice period buyout loans
   - Upload required documents for loan processing
   - Track loan approval status
   - View loan terms, EMI schedule, and repayment options
   - Make EMI payments through integrated payment gateway

5. **Buyout Process Tracking**
   - Timeline view of entire process
   - Notifications for each milestone
   - Document submission checklist
   - Current employer exit formalities tracker

### 2.3 NBFC Partner Features
1. **Loan Portfolio Management**
   - View loan applications from verified candidates
   - Access candidate employment verification data
   - Risk assessment dashboard with credit scores and employment details
   - Batch approve/reject applications

2. **Underwriting & Risk Assessment**
   - Automated credit scoring based on:
     - Salary and job stability
     - New company credibility
     - Repayment capacity (EMI/salary ratio)
     - Credit history (CIBIL integration)
   - Set lending criteria and loan amount limits
   - Configure interest rates and tenure options

3. **Loan Disbursement**
   - Disburse directly to candidate's current employer
   - Automated disbursement triggers on conditions:
     - Offer letter verification
     - Candidate document completion
     - Company sponsorship confirmation
   - Track disbursement status

4. **Collection & Recovery**
   - EMI collection dashboard
   - Automated payment reminders
   - Salary deduction integration (with new employer)
   - Delinquency management and recovery workflows

5. **Analytics & Reporting**
   - Loan performance metrics (default rate, recovery rate)
   - Portfolio health monitoring
   - Revenue and interest income tracking
   - Compliance and regulatory reporting

### 2.4 Platform Admin Features
1. **User Management**
   - Onboard and verify companies
   - Approve NBFC partnerships
   - Monitor user activities and fraud detection
   - Manage roles and permissions

2. **Verification & KYC**
   - Company verification (GST, CIN, website, LinkedIn)
   - Candidate KYC (Aadhaar, PAN, address proof)
   - NBFC licensing and compliance verification
   - Offer letter and employment verification

3. **Transaction Monitoring**
   - Track all buyout transactions
   - Monitor loan disbursements and repayments
   - Flag suspicious activities
   - Generate audit trails

4. **Platform Configuration**
   - Set platform fees and commission structure
   - Configure workflow rules and approval chains
   - Manage integrations and API keys
   - System health monitoring

5. **Reports & Analytics**
   - Platform usage statistics
   - Revenue and commission tracking
   - User growth and retention metrics
   - Success rate of buyout completions

---

## 3. User Flows

### 3.1 Company Hiring Flow
```
1. Company Registration → Profile Verification → KYC Approval
2. Post Job Opening → Set Buyout Sponsorship Options
3. Receive Applications from Candidates
4. Shortlist Candidate → Conduct Interviews
5. Select Candidate → Send Offer Letter
6. Configure Buyout Terms (full/partial/facilitation)
7. Candidate Accepts → Loan Application Triggered
8. NBFC Approves Loan → Loan Disbursed to Current Employer
9. Candidate Exits Current Company → Joins New Company
10. Monitor Onboarding & Service Agreement
```

### 3.2 Candidate Journey Flow
```
1. Registration → Complete Profile → Upload Documents → KYC
2. Browse Jobs with Buyout Support
3. Calculate Buyout Amount → View Loan Options
4. Apply for Job
5. Interview Process → Receive Offer
6. Accept Offer → Choose Buyout Option
7. Apply for Loan → Submit Documents
8. Loan Underwriting → Approval/Rejection
9. Loan Approved → Disbursement to Current Employer
10. Serve Notice Period (if reduced) → Exit Formalities
11. Join New Company → Start EMI Repayment
```

### 3.3 NBFC Partner Flow
```
1. NBFC Registration → Compliance Verification → Partnership Approval
2. Configure Loan Products (interest rates, tenure, limits)
3. Receive Loan Applications
4. Review Candidate Profile & Risk Assessment
5. Run Credit Checks (CIBIL, employment verification)
6. Approve/Reject Loan
7. Set Loan Terms & EMI Schedule
8. Disburse Loan to Candidate's Current Employer
9. Monitor EMI Collections
10. Handle Defaults & Recovery
```

---

## 4. Technical Architecture

### 4.1 Technology Stack

#### Frontend
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit / Zustand
- **UI Library**: Material-UI (MUI) / Tailwind CSS + Shadcn/ui
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **API Client**: Axios / TanStack Query (React Query)
- **Charts**: Recharts / Chart.js
- **Authentication**: JWT with secure cookie storage

#### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy 2.0 with async support
- **Database**: PostgreSQL 15+
- **Authentication**: JWT + OAuth2 Password Bearer
- **Validation**: Pydantic V2
- **Task Queue**: Celery + Redis
- **Caching**: Redis
- **File Storage**: AWS S3 / MinIO
- **Email**: SendGrid / AWS SES
- **SMS**: Twilio / AWS SNS

#### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Deployment**: AWS (EC2/ECS) / Google Cloud Run
- **CDN**: CloudFlare
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **CI/CD**: GitHub Actions

### 4.2 Database Schema

#### Core Tables

**users**
- id (UUID, PK)
- email (unique)
- password_hash
- user_type (enum: company, candidate, nbfc, admin)
- is_verified (boolean)
- created_at, updated_at

**companies**
- id (UUID, PK)
- user_id (FK)
- company_name
- industry
- size (enum: startup, small, medium, large, enterprise)
- gstin
- cin
- website
- verified_at
- verification_documents (JSON)

**candidates**
- id (UUID, PK)
- user_id (FK)
- full_name
- phone
- date_of_birth
- current_company
- current_designation
- current_ctc
- notice_period_days
- skills (JSON array)
- experience_years
- resume_url
- kyc_documents (JSON)
- kyc_verified_at

**nbfc_partners**
- id (UUID, PK)
- user_id (FK)
- nbfc_name
- license_number
- website
- interest_rate_min
- interest_rate_max
- max_loan_amount
- min_loan_amount
- verified_at

**jobs**
- id (UUID, PK)
- company_id (FK)
- title
- description
- required_skills (JSON)
- experience_required
- salary_min, salary_max
- location
- job_type (enum: full_time, contract)
- buyout_support_type (enum: full, partial, facilitation, none)
- max_buyout_amount
- is_active
- created_at

**applications**
- id (UUID, PK)
- job_id (FK)
- candidate_id (FK)
- status (enum: applied, screening, interview, offered, accepted, rejected)
- applied_at
- updated_at

**buyout_requests**
- id (UUID, PK)
- application_id (FK)
- candidate_id (FK)
- company_id (FK)
- buyout_amount
- company_contribution
- loan_amount
- status (enum: initiated, pending_loan, loan_approved, disbursed, completed, cancelled)
- created_at
- updated_at

**loans**
- id (UUID, PK)
- buyout_request_id (FK)
- nbfc_id (FK)
- candidate_id (FK)
- principal_amount
- interest_rate
- tenure_months
- emi_amount
- status (enum: applied, under_review, approved, disbursed, active, closed, defaulted)
- disbursement_date
- first_emi_date
- credit_score
- risk_category (enum: low, medium, high)
- created_at

**loan_repayments**
- id (UUID, PK)
- loan_id (FK)
- emi_number
- due_date
- paid_date
- amount_due
- amount_paid
- status (enum: pending, paid, overdue, waived)
- payment_method

**documents**
- id (UUID, PK)
- user_id (FK)
- entity_type (enum: candidate, company, nbfc, loan, buyout)
- entity_id (UUID)
- document_type (enum: aadhar, pan, salary_slip, offer_letter, etc.)
- file_url
- verified (boolean)
- uploaded_at

**notifications**
- id (UUID, PK)
- user_id (FK)
- type (enum: email, sms, push, in_app)
- title
- message
- is_read
- created_at

**transactions**
- id (UUID, PK)
- transaction_type (enum: loan_disbursement, emi_payment, platform_fee)
- from_entity_type, from_entity_id
- to_entity_type, to_entity_id
- amount
- status (enum: initiated, processing, completed, failed)
- payment_gateway_reference
- created_at

### 4.3 API Architecture

#### REST API Structure
```
/api/v1
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh-token
│   └── POST /forgot-password
├── /companies
│   ├── GET /profile
│   ├── PUT /profile
│   ├── POST /verify
│   ├── GET /jobs
│   ├── POST /jobs
│   ├── PUT /jobs/{job_id}
│   └── GET /applications
├── /candidates
│   ├── GET /profile
│   ├── PUT /profile
│   ├── POST /documents
│   ├── GET /jobs
│   ├── POST /applications
│   ├── GET /applications
│   └── POST /calculate-buyout
├── /nbfc
│   ├── GET /profile
│   ├── PUT /profile
│   ├── GET /loan-applications
│   ├── POST /loan-applications/{id}/review
│   ├── POST /loans/{id}/disburse
│   └── GET /portfolio-analytics
├── /loans
│   ├── POST /apply
│   ├── GET /{loan_id}
│   ├── GET /my-loans
│   ├── POST /{loan_id}/repay
│   └── GET /{loan_id}/schedule
├── /buyouts
│   ├── POST /initiate
│   ├── GET /{buyout_id}
│   ├── PUT /{buyout_id}/status
│   └── GET /my-buyouts
├── /admin
│   ├── GET /users
│   ├── POST /users/{id}/verify
│   ├── GET /analytics
│   └── GET /transactions
└── /integrations
    ├── POST /cibil/check
    ├── POST /payment/initiate
    └── POST /esign/send
```

### 4.4 Third-Party Integrations

1. **KYC & Verification**
   - Aadhaar Verification: DigiLocker API
   - PAN Verification: NSDL API
   - GST Verification: GST API
   - Email/Phone OTP: Twilio / MSG91

2. **Credit Bureau**
   - CIBIL TransUnion API
   - Experian API
   - Equifax API

3. **Payment Gateway**
   - Razorpay / PayU / Cashfree
   - Bank account verification (Penny drop)
   - Mandate registration for EMI autopay

4. **E-Sign & Contracts**
   - DigiSign / Leegality
   - Aadhaar-based e-sign

5. **Background Verification**
   - SpringVerify / AuthBridge
   - Employment verification
   - Salary slip verification

6. **Communication**
   - SendGrid (Email)
   - Twilio (SMS)
   - Firebase Cloud Messaging (Push notifications)

---

## 5. Security & Compliance

### 5.1 Security Measures
- **Authentication**: JWT with refresh tokens, secure HTTP-only cookies
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: 
  - TLS 1.3 for data in transit
  - AES-256 for sensitive data at rest
  - PII encryption in database
- **API Security**: Rate limiting, CORS, input validation, SQL injection prevention
- **Document Security**: Signed URLs for document access, watermarking
- **Audit Logging**: Complete audit trail for all sensitive operations
- **Penetration Testing**: Quarterly security audits

### 5.2 Compliance
- **RBI Guidelines**: NBFC lending norms compliance
- **Data Privacy**: GDPR-like principles, right to erasure
- **KYC/AML**: Complete KYC for all users, transaction monitoring
- **Financial Reporting**: Compliance with financial regulations
- **Data Residency**: India-based data storage for sensitive information

---

## 6. Revenue Model

### 6.1 Revenue Streams
1. **Platform Fee from Companies**
   - Subscription tiers: Basic, Premium, Enterprise
   - Per-hire fee for successful buyout completions
   - Job posting credits

2. **Commission from NBFCs**
   - Commission on loan disbursement (1-2% of loan amount)
   - Lead generation fee for loan applications
   - Technology platform fee

3. **Premium Candidate Services**
   - Profile boosting
   - Resume review services
   - Interview preparation

4. **Value-Added Services**
   - Background verification services
   - Legal contract templates
   - HR consulting for notice period policies

### 6.2 Pricing Example
- **Company Subscription**: ₹9,999/month (5 job postings)
- **Per Successful Hire**: ₹5,000 - ₹15,000 based on role level
- **NBFC Commission**: 1.5% of loan disbursement
- **Candidate Services**: ₹999 - ₹4,999 per service

---

## 7. Key Features Breakdown

### 7.1 Phase 1: MVP (Months 1-3)
**Goal**: Launch core marketplace functionality

- [ ] User registration and authentication (all 3 user types)
- [ ] Basic profile creation (Company, Candidate, NBFC)
- [ ] KYC document upload (manual verification)
- [ ] Job posting by companies
- [ ] Candidate job search and application
- [ ] Buyout calculator
- [ ] Basic loan application form
- [ ] Manual loan approval workflow for NBFC
- [ ] Simple admin dashboard for user verification
- [ ] Email notifications for key events

### 7.2 Phase 2: Automation (Months 4-6)
**Goal**: Automate workflows and add integrations

- [ ] Automated KYC verification (Aadhaar, PAN, GST)
- [ ] CIBIL integration for credit scoring
- [ ] Payment gateway integration
- [ ] Automated loan underwriting with risk scoring
- [ ] E-sign integration for contracts
- [ ] EMI autopay setup via mandate
- [ ] Advanced job matching algorithm
- [ ] Candidate recommendation engine
- [ ] SMS notifications
- [ ] Improved dashboards with analytics

### 7.3 Phase 3: Scale (Months 7-12)
**Goal**: Enterprise features and scalability

- [ ] Multi-NBFC bidding for loans
- [ ] Employer direct payment integration (salary deduction)
- [ ] Mobile app (React Native)
- [ ] Advanced fraud detection
- [ ] AI-powered risk assessment
- [ ] Video KYC
- [ ] Bulk hiring features for companies
- [ ] Referral programs
- [ ] API for enterprise clients
- [ ] White-label solutions for NBFCs

---

## 8. Success Metrics

### 8.1 Platform KPIs
- **User Growth**: 1000+ candidates, 100+ companies, 5+ NBFCs (Year 1)
- **Loan Approval Rate**: >60%
- **Buyout Success Rate**: >80% of approved loans result in successful hiring
- **Loan Default Rate**: <5%
- **Time to Hire**: Reduce from 60-90 days to 15-30 days
- **GMV**: ₹10 Cr+ in loan disbursements (Year 1)

### 8.2 User Satisfaction
- **NPS Score**: >50
- **Company Retention**: >70% year-over-year
- **Candidate Experience**: 4+ star rating
- **NBFC Portfolio Quality**: <3% NPAs

---

## 9. Risk Mitigation

### 9.1 Key Risks
1. **Candidate Default Risk**
   - Mitigation: Salary deduction agreements, insurance products
   
2. **Company Credibility**
   - Mitigation: Thorough verification, deposit requirements, performance bonds

3. **Regulatory Changes**
   - Mitigation: Legal counsel, compliance monitoring, flexible architecture

4. **Market Adoption**
   - Mitigation: Pilot with select companies, strong value proposition, education

5. **NBFC Partnership**
   - Mitigation: Multiple NBFC partnerships, compelling ROI data

### 9.2 Business Continuity
- Automated backups (daily)
- Disaster recovery plan
- High availability infrastructure (99.9% uptime)
- Customer support SLA

---

## 10. Implementation Roadmap

### Month 1-2: Foundation
- Finalize tech stack and architecture
- Set up development environment
- Database schema design and implementation
- Basic authentication and user management
- Core UI components library

### Month 3-4: MVP Development
- Company, Candidate, NBFC modules
- Job posting and application workflow
- Buyout calculation logic
- Loan application and basic approval
- Admin verification panel

### Month 5-6: Integration & Testing
- Payment gateway integration
- KYC automation
- Credit bureau integration
- End-to-end testing
- Security audit
- Beta launch with select users

### Month 7-9: Production Launch
- Production deployment
- Marketing and user acquisition
- Onboard first NBFC partner
- Process first 10 buyout transactions
- Iterate based on feedback

### Month 10-12: Scale & Optimize
- Performance optimization
- Additional features from Phase 2
- Expand NBFC partnerships
- Geographic expansion
- Revenue optimization

---

## 11. Team Requirements

### Development Team
- **Frontend Developers**: 2 (React + TypeScript)
- **Backend Developers**: 2 (Python + FastAPI)
- **Full-Stack Developer**: 1
- **DevOps Engineer**: 1
- **QA Engineer**: 1
- **UI/UX Designer**: 1

### Business Team
- **Product Manager**: 1
- **Business Development**: 2 (Company & NBFC partnerships)
- **Operations Manager**: 1
- **Customer Support**: 2
- **Compliance Officer**: 1
- **Marketing Manager**: 1

---

## 12. Technical Best Practices

### 12.1 Code Quality
- Type safety: TypeScript (frontend), Pydantic (backend)
- Code reviews: Pull request mandatory reviews
- Testing: >80% code coverage
- Linting: ESLint, Prettier (frontend), Black, Ruff (backend)
- Documentation: Swagger/OpenAPI for APIs

### 12.2 Performance
- Database indexing strategy
- API response caching (Redis)
- CDN for static assets
- Lazy loading and code splitting (frontend)
- Background jobs for heavy operations (Celery)
- Database query optimization

### 12.3 Monitoring
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Logging aggregation
- Uptime monitoring
- User analytics (Mixpanel/Amplitude)

---

## 13. Next Steps

1. **Review & Finalize Spec**: Get stakeholder feedback on this specification
2. **Set Up Project**: Initialize Git repository, set up development environment
3. **Design System**: Create wireframes and UI mockups
4. **Database Setup**: Implement database schema and migrations
5. **Authentication Module**: Build user registration and login
6. **Start MVP Development**: Begin with candidate and company modules

---

## Appendix: Sample Calculations

### Buyout Amount Calculation
```
Notice Period: 90 days
Current Monthly Salary: ₹1,00,000
Buyout Amount = (Salary / 30) × Notice Days
Buyout Amount = (1,00,000 / 30) × 90 = ₹3,00,000
```

### Loan EMI Calculation
```
Principal: ₹3,00,000
Interest Rate: 12% per annum
Tenure: 12 months
EMI = [P × r × (1+r)^n] / [(1+r)^n-1]
where r = 12/(12×100) = 0.01
EMI ≈ ₹26,625

Total Interest: ₹19,500
Total Repayment: ₹3,19,500
```

---

## Document Control

- **Version**: 1.0
- **Date**: December 8, 2025
- **Status**: Draft for Review
- **Owner**: Product Team
- **Next Review**: After stakeholder feedback

---

**End of Specification Document**
