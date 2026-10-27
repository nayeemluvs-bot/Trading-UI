import React,{Component} from 'react';
import { shallow } from 'enzyme';import Purchase from '../../Components/Purchase/Purchase';
describe('when the home component is called',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<Purchase />);
    });
    it('should render the render method',()=>{
        expect(wrapper).toHaveLength(1);
    });
    it('should render the 1 button',()=>{
        expect(wrapper.find('button')).toHaveLength(2);
    });
    it('should have called handle click book function', () => {
        const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
        wrapper.instance().forceUpdate();
        wrapper.find('#submitsearch').simulate('click',{
          preventDefault: () => {
          }
         });
        expect(spy).toHaveBeenCalled();
      });
    
   
})

