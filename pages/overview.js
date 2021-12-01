import React from 'react';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../src/Title';
import Cards from '../src/Cards';
import Navigator from '../src/Navigator';
import Rules from '../src/Rules';

const useStyles = makeStyles({
  root: {
    background: 'rgba(85, 108, 214, 0.08)'
  }
});

const ButtonGroups = ({ active, setActive, setComponent }) => {
  const classes = useStyles();

  const handleOverviewClick = () => {
    setActive([true, false, false]);
    setComponent(0);
  };

  const handleNavigateClick = () => {
    setActive([false, true, false]);
    setComponent(1);
  };

  const handleRuleClick = () => {
    setActive([false, false, true]);
    setComponent(2);
  };

  return (
    <Grid item xs={12}>
      <ButtonGroup
        fullWidth
        color="primary"
        aria-label="overview button groups"
      >
        <Button
          classes={{ root: active[0] ? classes.root : '' }}
          onClick={handleOverviewClick}
        >
          Overview
        </Button>
        <Button
          classes={{ root: active[1] ? classes.root : '' }}
          onClick={handleNavigateClick}
        >
          导航模块
        </Button>
        <Button
          classes={{ root: active[2] ? classes.root : '' }}
          onClick={handleRuleClick}
        >
          规划模块
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

const renderContent = (component, setActive, setComponent) => {
  switch (component) {
    case 0:
      return <Cards setActive={setActive} setComponent={setComponent} />;
    case 1:
      return <Navigator />;
    case 2:
      return <Rules />;
    default:
      return <Cards />;
  }
};

const Overview = () => {
  const [component, setComponent] = React.useState(0);
  const [active, setActive] = React.useState([true, false, false]);

  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <Title />
        <Box mt={5}>
          <ButtonGroups
            active={active}
            setActive={setActive}
            setComponent={setComponent}
          />
        </Box>
        <Box mt={5}>{renderContent(component, setActive, setComponent)}</Box>
      </Box>
    </Container>
  );
};

export default Overview;
