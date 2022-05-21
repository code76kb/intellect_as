import React from 'react';
import renderer from 'react-test-renderer';
import ViewPagerIndicator from '../ViewPagerIndicator' 
it('Render ViewPagerIndicator  Comp :', () => {
    const tree = renderer.create(
        <ViewPagerIndicator pageCount={3} currentPage={1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})