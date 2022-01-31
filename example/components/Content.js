import React from 'react';
import { Heading, Link, Text } from 'bootstyle';

function Content() {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <>
      <Heading size={2}>Content</Heading>
      <Heading size={4}>Bootstrap Text H4</Heading>
      <Heading size={5}>Bootstrap Text H5</Heading>
      <Heading size={6}>Bootstrap Text H6</Heading>
      <Text>
        This is a very long text lorem ipsum lorem ipsum lorem ipsum This is a
        very long text lorem ipsum lorem ipsum lorem ipsum This is a very long
        text lorem ipsum lorem ipsum lorem ipsum This is a very long text lorem
        ipsum lorem ipsum lorem ipsum{' '}
        <Link
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log('pressed!');
          }}
        >
          This is a very long text lorem ipsum lorem ipsum lorem ipsum
        </Link>{' '}
        This is a very long text lorem ipsum lorem ipsum lorem ipsum This is a
        very long text lorem ipsum lorem ipsum lorem ipsum This is a very long
        text lorem ipsum lorem ipsum lorem ipsum
      </Text>
      <Text small>Small text</Text>
      <Text mark>Marked text</Text>
    </>
  );
  /* eslint-enable */
}

export default Content;
