import { apiService, User, PersonalInfo, Address } from './services/apiServices';

class RegistrationDemo {
  async runDemo() {
    console.log('Starting Registration API Demo...\n');

   
    const sampleUser: User = {
  personalInfo: {
    firstName: 'Selma',
    lastName: 'Nangolo',
    email: 'selma.nangolo@gmail.com',
    phone: '+264812345678',
    dateOfBirth: '2001-05-14',
    nationality: 'Namibian'
  },
  residentialAddress: {
    street: '45 Independence Avenue',
    city: 'Windhoek',
    state: 'Khomas Region',
    postalCode: '9000',
    country: 'Namibia'
  },
  postalAddress: {
    street: 'P.O. Box 2045',
    city: 'Oshakati',
    state: 'Oshana Region',
    postalCode: '9000',
    country: 'Namibia'
  }
};

    try {
      // Test registration
      console.log('1. Testing user registration...');
      const registrationResult = await apiService.registerUser(sampleUser);
      
      if (registrationResult.success && registrationResult.data) {
        console.log('✅ Registration successful!');
        console.log(`User ID: ${registrationResult.data.id}`);
        
        // Test getting user by ID
        console.log('\n2. Testing get user by ID...');
        const userResult = await apiService.getUserById(registrationResult.data.id!);
        
        if (userResult.success && userResult.data) {
          console.log('✅ User retrieved successfully!');
          console.log(`Name: ${userResult.data.personalInfo.firstName} ${userResult.data.personalInfo.lastName}`);
          console.log(`Email: ${userResult.data.personalInfo.email}`);
        } else {
          console.log('❌ Failed to retrieve user:', userResult.error);
        }

        // Test getting all users
        console.log('\n3. Testing get all users...');
        const allUsersResult = await apiService.getAllUsers();
        
        if (allUsersResult.success && allUsersResult.data) {
          console.log(`✅ Retrieved ${allUsersResult.data.length} users`);
          allUsersResult.data.forEach(user => {
            console.log(`- ${user.personalInfo.firstName} ${user.personalInfo.lastName} (ID: ${user.id})`);
          });
        } else {
          console.log('❌ Failed to retrieve users:', allUsersResult.error);
        }
      } else {
        console.log('❌ Registration failed:', registrationResult.error);
      }
    } catch (error) {
      console.error('Demo error:', error);
    }
  }
}

// Run the demo
const demo = new RegistrationDemo();
demo.runDemo();