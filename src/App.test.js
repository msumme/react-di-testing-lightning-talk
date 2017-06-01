import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('loads some content when I click a button', async () => {

  // given
  const promise = Promise.resolve("Some new content");
  const stubLoader = () => promise;
  const wrapper = shallow(<App contentLoader={stubLoader}/>);
  const contentToLoad = "Some new content";
  expect(wrapper.find('.content').text()).toEqual("Initial Content");

    // when
  wrapper.find('button').simulate('click');
  await promise;
  wrapper.update();

  // then

  expect(wrapper.find('.content').text()).toEqual(contentToLoad);

});