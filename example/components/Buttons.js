import React from 'react';
import { Button, Heading, Text } from 'bootstyle';

function Buttons() {
  return (
    <>
      <Heading size={2}>Buttons</Heading>
      <Button>
        <Text>Ron</Text>
      </Button>
      <Button color="secondary" outline>
        <Text>Markus</Text>
      </Button>
    </>
  );
}

export default Buttons;
