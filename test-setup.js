import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() });