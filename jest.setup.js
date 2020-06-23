import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockRNPermissions from 'react-native-permissions';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-permissions', () => mockRNPermissions);

require('jest-fetch-mock').enableMocks();

enzyme.configure({ adapter: new Adapter() });