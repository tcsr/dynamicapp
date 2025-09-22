
Step 1 - Uninstall all Karma Jasmine Packages 
     --> npm uninstall @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
Step 2 - Remove test object from Angular.json
Step 3 - Delete karma.conf.js file and test.ts file
Step 4 - Install JEST --> npm i jest @types/jest jest-preset-angular
Step 5 - Create setup.jest.ts file
Step 6 - Update tsconfig.spec.json file
Step 7 - Add jest configuration in package.json

 "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/src/setup.jest.ts"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    "globals": {
      "ts-jest": {
        "tsConfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    }
  }

Step 8 - Add scripts in package.json to run JEST

 "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },

  ==========================================
import { inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withState, patchState, withHooks } from '@ngrx/signals';
import Keycloak from 'keycloak-js';
import type { KeycloakProfile } from 'keycloak-js';

// Define the shape of your application's state
interface AppState {
  title: string;
  profile: {
    title: string;
    lastName: string;
    firstName: string;
    email: string;
  };
  myRoles: string[];
}

// Define the initial state of the store
const initialState: AppState = {
  title: 'my-host-app',
  profile: {
    title: '',
    lastName: '',
    firstName: '',
    email: '',
  },
  myRoles: [],
};

const excludedRoles = new Set(['default-roles-web', 'offline_access', 'uma_authorization']);

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  // Use withMethods to define functions that can modify the state.
  withMethods((store, keycloak = inject(Keycloak)) => ({
    /**
     * Connects to Keycloak, initializes the client, and fetches user data.
     * Patches the store state with the fetched profile and roles.
     * This method is asynchronous as Keycloak's methods return Promises.
     */
    async connectKeycloak(): Promise<void> {
      try {
        console.log('Initializing Keycloak and fetching user data...');

        const authenticated = keycloak.authenticated;

        if (authenticated) {
          // Fetch the user's profile from Keycloak
          const userProfile: KeycloakProfile = await keycloak.loadUserProfile();

          // Patch the store with the updated profile information.
          // We use patchState to merge the new profile data without
          // overwriting other state properties.
          patchState(store, {
            profile: {
              firstName: userProfile.firstName || '',
              lastName: userProfile.lastName || '',
              email: userProfile.email || '',
              title: '', // You can add logic here to determine the title if needed
            },
          });

          // Extract roles from the Keycloak token's realm_access.
          // Get all roles from Keycloak
          const allRoles: string[] = keycloak.realmAccess?.roles || [];

          // Filter out the unwanted roles
          const userRoles = allRoles.filter(role => !excludedRoles.has(role));

          // Patch the store with the user's roles.
          patchState(store, {
            myRoles: userRoles,
          });

          console.log('Successfully fetched and stored user data.');
          console.log('Profile:', store.profile());
          console.log('Roles:', store.myRoles());

        } else {
          console.log('User is not authenticated.');
        }

      } catch (error) {
        console.error('Failed to initialize Keycloak or fetch user data:', error);
      }
    },
  })),

  // Use withComputed to create derived signals from the state.
  // These are read-only and will automatically update when their dependencies change.
  withComputed(({ profile }) => ({
    fullName: () => `${profile().firstName} ${profile().lastName}`,
  })),
  withHooks(({ connectKeycloak }) => ({
    onInit: () => {
      connectKeycloak();
    },
    onDestroy() {
      console.log('AppStore is being destroyed...');
    }
  }))
);

