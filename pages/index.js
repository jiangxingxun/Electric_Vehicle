import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../src/Login';
import Title from '../src/Title';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built by riverspace@yeah.net'}
    </Typography>
  );
}

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <Title />
        <Login />
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Box>
    </Container>
  );
}
