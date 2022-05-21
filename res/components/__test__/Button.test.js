import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

it('Render Button Com :',()=>{
    const tree = renderer.create(
        <Button
        onPress={()=>{}}
        label="NEXT"
        buttonStyle={{
          width: '90%',
          height: 40,
          borderRadius: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}
      />   ).toJSON();
      expect(tree).toMatchSnapshot();
})

