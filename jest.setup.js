import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockRNPermissions from 'react-native-permissions';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-permissions', () => mockRNPermissions);