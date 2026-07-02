const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with essential test data...\n')

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create test students
  console.log('Creating students...')
  const students = await Promise.all([
    prisma.student.create({
      data: {
        studentId: 'STU10004',
        email: 'stu10004@university.edu',
        password: hashedPassword,
        name: 'Sarah Johnson',
        year: 2,
        major: 'Computer Science',
        firstGen: true,
        priorGpa: 3.8,
        gender: 'female',
        aiAwareness: 3.5,
        enrollmentDate: new Date('2023-08-15'),
        semester: 'Fall 2024',
      }
    }),
    prisma.student.create({
      data: {
        studentId: 'STU10005',
        email: 'stu10005@university.edu',
        password: hashedPassword,
        name: 'Michael Chen',
        year: 3,
        major: 'Data Science',
        firstGen: false,
        priorGpa: 3.6,
        gender: 'male',
        aiAwareness: 4.2,
        enrollmentDate: new Date('2022-08-15'),
        semester: 'Fall 2024',
      }
    }),
  ])
  console.log(`✓ Created ${students.length} students`)

  // Create test faculty
  console.log('Creating faculty...')
  const faculty = await Promise.all([
    prisma.faculty.create({
      data: {
        facultyId: 'FAC1000',
        email: 'fac1000@university.edu',
        password: hashedPassword,
        name: 'Dr. Emily Rodriguez',
        major: 'Computer Science',
        expYears: 8.5,
        aiLiteracy: 4.2,
        dashboardAdoption: new Date('2024-01-15'),
        numCourses: 3,
      }
    }),
    prisma.faculty.create({
      data: {
        facultyId: 'FAC1001',
        email: 'fac1001@university.edu',
        password: hashedPassword,
        name: 'Prof. James Wilson',
        major: 'Data Science',
        expYears: 12.0,
        aiLiteracy: 3.8,
        dashboardAdoption: new Date('2024-02-01'),
        numCourses: 2,
      }
    }),
  ])
  console.log(`✓ Created ${faculty.length} faculty members`)

  // Create test assignments
console.log('Creating assignments...')

const assignments = await Promise.all([
  prisma.assignment.create({
    data: {
      assignmentId: 'ASSIGN001',
      facultyId: faculty[0].facultyId,
      title: 'Introduction to Programming Essay',
      description: 'Write an essay about the history of programming languages',
      type: 'Essay',
      major: 'Computer Science',
      year: 1,
      dueDate: new Date('2024-12-31'),
      aiAllowed: true,
      aiLockedUntilDraft: false,
      createdDate: new Date(),
    }
  }),

  prisma.assignment.create({
    data: {
      assignmentId: 'ASSIGN002',
      facultyId: faculty[0].facultyId,
      title: 'Data Structures Project',
      description: 'Implement a binary search tree with documentation',
      type: 'Project',
      major: 'Computer Science',
      year: 2,
      dueDate: new Date('2024-12-25'),
      aiAllowed: true,
      aiLockedUntilDraft: false,
      createdDate: new Date(),
    }
  }),
])

console.log(`✓ Created ${assignments.length} assignments`)


  console.log('\n✅ Database seeded successfully!')
  console.log('\n📝 Test credentials:')
  console.log('   Student: stu10004@university.edu / password123')
  console.log('   Faculty: fac1000@university.edu / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
