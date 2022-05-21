import React from 'react';
import renderer from 'react-test-renderer';
import Trapezoid from '../Trapezoid' 
it('Render Trapezoid  Comp :', () => {
    const tree = renderer.create(
        <Trapezoid
        height={300}
        width={240}
        stackSize={5}
        value={2}
        onChange={()=>{}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})